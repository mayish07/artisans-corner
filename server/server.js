// Artisan's Corner Backend
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://mohammadmayish_db_user:80WEDNfp5YBFEU13@artisanscorner.pq1hxna.mongodb.net/artisanscorner';
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(e => console.log('MongoDB error:', e.message));

const Product = require('./models/Product');
const User = require('./models/User');

// API Routes
app.get('/api/health', (_, res) => res.json({ success: true, status: 'OK' }));

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).limit(20);
    res.json({ success: true, data: products });
  } catch (e) {
    res.json({ success: true, data: [] });
  }
});

app.get('/api/products/categories', async (req, res) => {
  try {
    const categories = await mongoose.connection.db.collection('categories').find({}).toArray();
    res.json({ success: true, data: categories });
  } catch (e) {
    res.json({ success: true, data: [
      { _id: '1', name: 'Pottery', slug: 'pottery', productCount: 120 },
      { _id: '2', name: 'Jewelry', slug: 'jewelry', productCount: 85 },
      { _id: '3', name: 'Textiles', slug: 'textiles', productCount: 95 },
    ]});
  }
});

app.get('/api/stores', async (req, res) => {
  try {
    const stores = await mongoose.connection.db.collection('stores').find({}).toArray();
    res.json({ success: true, data: stores });
  } catch (e) {
    res.json({ success: true, data: [] });
  }
});

app.get('/api/cart', async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ success: true, data: { items: [], subtotal: 0 } });
  }
  try {
    const user = await User.findOne({ accessToken: token.replace('Bearer ', '') });
    if (user && user.cart) {
      res.json({ success: true, data: user.cart });
    } else {
      res.json({ success: true, data: { items: [], subtotal: 0 } });
    }
  } catch (e) {
    res.json({ success: true, data: { items: [], subtotal: 0 } });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && user.password === req.body.password) {
      res.json({ success: true, data: { 
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        accessToken: user.accessToken
      }});
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (e) {
    res.json({ success: false, message: 'Login failed' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) {
      return res.json({ success: false, message: 'Email already exists' });
    }
    const user = await User.create(req.body);
    res.json({ success: true, data: { 
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
      accessToken: user.accessToken
    }});
  } catch (e) {
    res.json({ success: false, message: 'Registration failed' });
  }
});

// Serve React App
app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'client/dist/index.html')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));

module.exports = app;