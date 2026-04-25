// server/server.js
// Artisan's Corner - Simple Server

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();

// Security
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));

// Static files
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));

console.log('Serving from:', distPath);

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});

// Demo login endpoint - creates user in memory for demo
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Demo mode - accept any credentials
  if (email && password) {
    // Return demo user data
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
        accessToken: 'demo-access-token',
        refreshToken: 'demo-refresh-token'
      }
    });
    return;
  }
  
  res.status(400).json({ success: false, message: 'Invalid credentials' });
});

// Demo products
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: [
      { _id: '1', title: 'Handcrafted Ceramic Vase', price: 89.99, category: 'Pottery', images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e2b479?w=600'] },
      { _id: '2', title: 'Silver Moon Ring', price: 125.00, category: 'Jewelry', images: ['https://images.unsplash.com/photo-1605100809563-1628d549d7fc?w=600'] }
    ]
  });
});

app.get('/api/products/categories', (req, res) => {
  res.json({ success: true, data: ['Jewelry', 'Pottery', 'Textiles', 'Woodwork', 'Art'] });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

module.exports = app;