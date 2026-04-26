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
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://mohammadmayish_db_user:80WEDNfp5YBFEU13@artisanscorner.pq1hxna.mongodb.net/artisanscorner', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(e => console.log('MongoDB error:', e.message));

const Product = require('./models/Product');
const User = require('./models/User');

// API Routes
app.get('/api/health', (_, res) => res.json({ success: true, status: 'OK' }));

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).limit(20);
    res.json({ success: true, data: products });
  } catch (e) {
    // Fallback demo data
    res.json({ success: true, data: [
      { _id: '1', title: 'Ceramic Vase', price: 89, category: 'Pottery', images: ['https://images.unsplash.com/photo-1578749556568'], stock: 10, avgRating: 4.5 },
      { _id: '2', title: 'Silver Ring', price: 125, category: 'Jewelry', images: ['https://images.unsplash.com/photo-1605100809563'], stock: 5, avgRating: 4.8 }
    ]});
  }
});

app.get('/api/products/categories', (_, res) => res.json({ success: true, data: [
  { name: 'Pottery', count: 2 }, { name: 'Jewelry', count: 2 }, { name: 'Textiles', count: 1 }
]}));

app.get('/api/stores', (_, res) => res.json({ success: true, data: [
  { _id: '1', name: 'Luna Pottery', category: 'Pottery', rating: 4.8 }
]}));

app.get('/api/cart', (_, res) => res.json({ success: true, data: [] }));
app.get('/api/orders/my', (_, res) => res.json({ success: true, data: [] }));

app.post('/api/auth/login', (req, res) => {
  res.json({ success: true, data: { 
    user: { id: '1', name: 'Demo User', email: req.body.email, role: 'buyer' },
    accessToken: 'demo-token'
  }});
});

app.post('/api/auth/register', (req, res) => {
  res.json({ success: true, data: { 
    user: { id: '1', name: req.body.name, email: req.body.email, role: 'buyer' },
    accessToken: 'demo-token'
  }});
});

// Serve React App
app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'client/dist/index.html')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));

module.exports = app;