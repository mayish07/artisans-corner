// server/server.js
// Artisan's Corner - Server for Vercel

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));

const demoProducts = [
  { _id: '1', title: 'Handcrafted Ceramic Vase', description: 'Beautiful handmade vase', price: 89.99, category: 'Pottery', images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e2b479?w=600'], stock: 15, avgRating: 4.5, totalReviews: 20, isActive: true },
  { _id: '2', title: 'Silver Moon Ring', description: 'Elegant handcrafted ring', price: 125.00, category: 'Jewelry', images: ['https://images.unsplash.com/photo-1605100809563-1628d549d7fc?w=600'], stock: 8, avgRating: 4.8, totalReviews: 35, isActive: true },
  { _id: '3', title: 'Artisan Coffee Mug', description: 'Perfect for your morning coffee', price: 34.99, category: 'Pottery', images: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca6d?w=600'], stock: 25, avgRating: 4.3, totalReviews: 15, isActive: true },
  { _id: '4', title: 'Gold Hoop Earrings', description: 'Classic gold hoops', price: 45.99, category: 'Jewelry', images: ['https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600'], stock: 20, avgRating: 4.6, totalReviews: 28, isActive: true },
  { _id: '5', title: 'Woven Wall Tapestry', description: 'Handwoven art piece', price: 150.00, category: 'Textiles', images: ['https://images.unsplash.com/photo-1594040226829-d8c5db14505b?w=600'], stock: 5, avgRating: 4.9, totalReviews: 12, isActive: true },
  { _id: '6', title: 'Wooden Cutting Board', description: 'Artisan crafted', price: 65.00, category: 'Woodwork', images: ['https://images.unsplash.com/photo-1588854337228-4be4d1e30b5e?w=600'], stock: 12, avgRating: 4.4, totalReviews: 18, isActive: true }
];

const demoCategories = [
  { name: 'Pottery', count: 2 },
  { name: 'Jewelry', count: 2 },
  { name: 'Textiles', count: 1 },
  { name: 'Woodwork', count: 1 },
  { name: 'Art', count: 0 }
];

const demoStores = [
  { _id: 's1', name: 'Luna Clay Studio', description: 'Handcrafted pottery', category: 'Pottery', logo: 'https://ui-avatars.com/api/?name=Luna+Clay&background=amber&color=fff', isVerified: true, rating: 4.8, totalProducts: 15 },
  { _id: 's2', name: 'Silver Moon Designs', description: 'Modern jewelry', category: 'Jewelry', logo: 'https://ui-avatars.com/api/?name=Silver+Moon&background=teal&color=fff', isVerified: true, rating: 4.9, totalProducts: 28 },
  { _id: 's3', name: 'Weave & Wood', description: 'Textiles and woodwork', category: 'Textiles', logo: 'https://ui-avatars.com/api/?name=Weave+Wood&background=green&color=fff', isVerified: false, rating: 4.5, totalProducts: 10 }
];

app.get('/api/health', (req, res) => res.json({ success: true, status: 'OK' }));
app.get('/api/auth/login', (req, res) => res.json({ success: true, data: { user: { id: 'demo', name: 'Demo', email: 'demo@test.com', role: 'buyer' }, accessToken: 'token' } }));
app.post('/api/auth/login', (req, res) => res.json({ success: true, data: { user: { id: 'demo', name: 'Demo', email: req.body.email, role: 'buyer' }, accessToken: 'token' } }));
app.post('/api/auth/register', (req, res) => res.json({ success: true, data: { user: { id: 'new', name: req.body.name, email: req.body.email, role: 'buyer' }, accessToken: 'token' } }));
app.get('/api/products', (req, res) => res.json({ success: true, data: demoProducts }));
app.get('/api/products/featured', (req, res) => res.json({ success: true, data: demoProducts.slice(0, 4) }));
app.get('/api/products/categories', (req, res) => res.json({ success: true, data: demoCategories }));
app.get('/api/stores', (req, res) => res.json({ success: true, data: demoStores }));
app.get('/api/cart', (req, res) => res.json({ success: true, data: [] }));
app.get('/api/orders/my', (req, res) => res.json({ success: true, data: [] }));

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')));

app.listen(5000, () => console.log('Server on 5000'));
module.exports = app;