// Artisan's Corner Backend
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (_, res) => res.json({ success: true, status: 'OK' }));

app.get('/api/products', (req, res) => {
  res.json({ success: true, data: [
    { _id: '1', name: 'Handcrafted Ceramic Vase', price: 89, category: 'Pottery', images: ['https://images.unsplash.com/photo-1578749556568'], stock: 10, avgRating: 4.5 },
    { _id: '2', name: 'Silver Kundan Necklace', price: 450, category: 'Jewelry', images: ['https://images.unsplash.com/photo-1599643478518'], stock: 5, avgRating: 4.8 },
    { _id: '3', name: 'Handwoven Silk Saree', price: 1200, category: 'Textiles', images: ['https://images.unsplash.com/photo-1610030469983'], stock: 3, avgRating: 4.7 },
  ]});
});

app.get('/api/products/categories', (_, res) => res.json({ success: true, data: [
  { _id: '1', name: 'Pottery', slug: 'pottery', productCount: 120 },
  { _id: '2', name: 'Jewelry', slug: 'jewelry', productCount: 85 },
  { _id: '3', name: 'Textiles', slug: 'textiles', productCount: 95 },
]}));

app.get('/api/stores', (_, res) => res.json({ success: true, data: [
  { _id: '1', name: 'Earth & Clay', slug: 'earth-clay', vendor: { name: 'Ravi Kumar' }, productCount: 45, rating: 4.8 },
]}));

app.get('/api/cart', (_, res) => res.json({ success: true, data: { items: [], subtotal: 0 } }));
app.get('/api/orders/my', (_, res) => res.json({ success: true, data: [] }));

app.post('/api/auth/login', (req, res) => {
  res.json({ success: true, data: { 
    user: { _id: '1', name: 'Demo User', email: req.body.email, role: 'buyer' },
    accessToken: 'demo-token'
  }});
});

app.post('/api/auth/register', (req, res) => {
  res.json({ success: true, data: { 
    user: { _id: '1', name: req.body.name, email: req.body.email, role: 'buyer' },
    accessToken: 'demo-token'
  }});
});

// Serve React App
app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'client/dist/index.html')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));

module.exports = app;