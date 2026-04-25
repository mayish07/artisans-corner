// server/server.js
// Main entry point for Artisan's Corner Backend API

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const { Server } = require('socket.io');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/database');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const storeRoutes = require('./routes/store');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');
const reviewRoutes = require('./routes/review');
const couponRoutes = require('./routes/coupon');
const uploadRoutes = require('./routes/upload');
const adminRoutes = require('./routes/admin');
const webhookRoutes = require('./routes/webhook');
const paymentRoutes = require('./routes/payment');

const { globalErrorHandler } = require('./middleware/errorHandler');

const app = express();
let server;
let io;

// Socket.io
if (process.env.VERCEL === undefined) {
  server = http.createServer(app);
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });
  app.set('io', io);
}

app.set('trust proxy', 1);

// Security
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "https://images.unsplash.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "https:"],
    }
  }
}));

// CORS
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use('/api/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Prevent NoSQL injection
app.use(mongoSanitize());

// Static files path
const distPath = path.join(__dirname, '../client/dist');
console.log('Static path:', distPath);

// Serve static frontend
app.use(express.static(distPath, {
  maxAge: '1h',
  etag: false,
  lastModified: true
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/webhook', webhookRoutes);
app.use('/api/payment', paymentRoutes);

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const dbState = ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown';
    res.json({ status: 'OK', database: dbState });
  } catch (error) {
    res.json({ status: 'OK' });
  }
});

// SPA fallback - serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Error handler
app.use(globalErrorHandler);

// Auto-seed
const autoSeed = async () => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) return;
    
    const User = require('./models/User');
    const Product = require('./models/Product');
    const Store = require('./models/Store');
    
    const demoUser = await User.findOne({ email: 'demo@demo.com' });
    if (!demoUser) {
      console.log('Creating demo user...');
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('demo123', salt);
      
      await User.create({
        name: 'Demo User',
        email: 'demo@demo.com',
        password: hashedPassword,
        role: 'buyer',
        isActive: true,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
      });
      
      const user = await User.findOne({ email: 'demo@demo.com' });
      
      const stores = await Store.insertMany([
        { owner: user._id, name: 'Luna Clay Studio', description: 'Handcrafted pottery inspired by nature', category: 'Pottery', logo: 'https://ui-avatars.com/api/?name=Luna+Clay&background=amber&color=fff', isVerified: true, rating: 4.8, totalOrders: 45 },
        { owner: user._id, name: 'Silver Moon Designs', description: 'Modern jewelry with artisan soul', category: 'Jewelry', logo: 'https://ui-avatars.com/api/?name=Silver+Moon&background=teal&color=fff', isVerified: true, rating: 4.9, totalOrders: 89 }
      ]);
      
      await Product.insertMany([
        { vendorId: user._id, storeId: stores[0]._id, title: 'Handcrafted Ceramic Vase', description: 'Beautiful hand-thrown ceramic vase', price: 89.99, category: 'Pottery', images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e2b479?w=600'], stock: 15, isActive: true, isFeatured: true },
        { vendorId: user._id, storeId: stores[0]._id, title: 'Artisan Coffee Mug', description: 'Perfect for your morning coffee', price: 34.99, category: 'Pottery', images: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca6d?w=600'], stock: 25, isActive: true },
        { vendorId: user._id, storeId: stores[1]._id, title: 'Silver Moon Ring', description: 'Elegant sterling silver ring', price: 125.00, category: 'Jewelry', images: ['https://images.unsplash.com/photo-1605100809563-1628d549d7fc?w=600'], stock: 8, isActive: true, isFeatured: true },
        { vendorId: user._id, storeId: stores[1]._id, title: 'Gold Hoop Earrings', description: 'Classic gold-plated hoops', price: 45.99, category: 'Jewelry', images: ['https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600'], stock: 20, isActive: true }
      ]);
      
      console.log('✓ Demo data created');
    }
  } catch (err) {
    console.log('Auto-seed:', err.message);
  }
};

// Connect to MongoDB
if (process.env.MONGODB_URI) {
  connectDB().then(() => autoSeed()).catch(err => console.log('DB:', err.message));
} else {
  console.log('MONGODB_URI not set');
}

const PORT = process.env.PORT || 5000;

if (process.env.VERCEL === undefined) {
  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
} else {
  console.log('Serverless mode');
}

module.exports = app;