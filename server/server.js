// server/server.js
// Artisan's Corner - Demo Server

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));

const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'OK' });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  res.json({
    success: true,
    data: {
      user: {
        id: 'demo123',
        name: 'Demo User',
        email: email,
        role: 'buyer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
      },
      accessToken: 'demo-token',
      refreshToken: 'demo-refresh'
    }
  });
});

// Products
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: {
      products: [
        { _id: '1', title: 'Handcrafted Ceramic Vase', description: 'Beautiful vase', price: 89.99, category: 'Pottery', images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e2b479?w=600'], stock: 15, isActive: true },
        { _id: '2', title: 'Silver Moon Ring', description: 'Elegant ring', price: 125.00, category: 'Jewelry', images: ['https://images.unsplash.com/photo-1605100809563-1628d549d7fc?w=600'], stock: 8, isActive: true },
        { _id: '3', title: 'Artisan Coffee Mug', description: 'Perfect coffee', price: 34.99, category: 'Pottery', images: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca6d?w=600'], stock: 25, isActive: true },
        { _id: '4', title: 'Gold Hoop Earrings', description: 'Classic hoops', price: 45.99, category: 'Jewelry', images: ['https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600'], stock: 20, isActive: true }
      ],
      page: 1,
      pages: 1,
      total: 4
    }
  });
});

// Categories
app.get('/api/products/categories', (req, res) => {
  res.json({
    success: true,
    data: [
      { name: 'Jewelry', slug: 'jewelry', count: 2 },
      { name: 'Pottery', slug: 'pottery', count: 2 },
      { name: 'Textiles', slug: 'textiles', count: 0 },
      { name: 'Woodwork', slug: 'woodwork', count: 0 },
      { name: 'Art', slug: 'art', count: 0 }
    ]
  });
});

// Stores
app.get('/api/stores', (req, res) => {
  res.json({
    success: true,
    data: {
      stores: [
        { _id: 's1', name: 'Luna Clay Studio', description: 'Handcrafted pottery', category: 'Pottery', logo: 'https://ui-avatars.com/api/?name=Luna+Clay&background=amber&color=fff', isVerified: true },
        { _id: 's2', name: 'Silver Moon Designs', description: 'Modern jewelry', category: 'Jewelry', logo: 'https://ui-avatars.com/api/?name=Silver+Moon&background=teal&color=fff', isVerified: true }
      ]
    }
  });
});

// Cart
app.get('/api/cart', (req, res) => {
  res.json({ success: true, data: { items: [], total: 0 } });
});

// Orders
app.get('/api/orders/my', (req, res) => {
  res.json({ success: true, data: { orders: [], total: 0 } });
});

// SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));

module.exports = app;