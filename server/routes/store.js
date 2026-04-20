// server/routes/store.js
const express = require('express');
const router = express.Router();
const Store = require('../models/Store');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Get all stores (public)
router.get('/', async (req, res) => {
  try {
    const { category, search, sort = 'createdAt', page = 1, limit = 12 } = req.query;
    
    const query = { isActive: true };
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOption = {};
    if (sort === 'rating') sortOption.rating = -1;
    else if (sort === 'sales') sortOption.totalOrders = -1;
    else sortOption.createdAt = -1;

    const stores = await Store.find(query)
      .populate('owner', 'name avatar')
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Store.countDocuments(query);

    res.json({
      success: true,
      data: {
        stores,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get store by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const store = await Store.findOne({ slug: req.params.slug, isActive: true })
      .populate('owner', 'name avatar');

    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }

    res.json({
      success: true,
      data: { store },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create store (become seller)
router.post('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user.role === 'vendor') {
      return res.status(400).json({ 
        success: false, 
        message: 'You already have a store' 
      });
    }

    const { name, description, category, logo, banner, socialLinks } = req.body;

    const existingStore = await Store.findOne({ name });
    if (existingStore) {
      return res.status(400).json({ 
        success: false, 
        message: 'Store name already exists' 
      });
    }

    const store = new Store({
      owner: req.user.id,
      name,
      description,
      category,
      logo,
      banner,
      socialLinks,
    });

    await store.save();

    user.role = 'vendor';
    user.storeProfile = {
      storeName: name,
      storeSlug: store.slug,
      approved: true,
    };
    await user.save();

    res.status(201).json({
      success: true,
      data: { store, user },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update store settings
router.put('/settings', protect, async (req, res) => {
  try {
    const store = await Store.findOne({ owner: req.user.id });
    
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }

    const { name, description, category, logo, banner, socialLinks } = req.body;

    if (name && name !== store.name) {
      const existingStore = await Store.findOne({ name, _id: { $ne: store._id } });
      if (existingStore) {
        return res.status(400).json({ 
          success: false, 
          message: 'Store name already exists' 
        });
      }
      store.name = name;
    }

    if (description !== undefined) store.description = description;
    if (category) store.category = category;
    if (logo) store.logo = logo;
    if (banner) store.banner = banner;
    if (socialLinks) store.socialLinks = { ...store.socialLinks, ...socialLinks };

    await store.save();

    const user = await User.findById(req.user.id);
    if (user.storeProfile) {
      user.storeProfile.storeName = store.name;
      user.storeProfile.storeSlug = store.slug;
      if (logo) user.storeProfile.logo = logo;
      if (banner) user.storeProfile.banner = banner;
      await user.save();
    }

    res.json({
      success: true,
      data: { store },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get vendor dashboard stats
router.get('/vendor/stats', protect, async (req, res) => {
  try {
    const store = await Store.findOne({ owner: req.user.id });
    
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }

    const Product = require('../models/Product');
    const Order = require('../models/Order');

    const productCount = await Product.countDocuments({ storeId: store._id });
    
    const orders = await Order.find({ 'items.vendor': req.user.id });
    const totalRevenue = orders.reduce((sum, order) => {
      const myItems = order.items.filter(
        item => item.vendor?.toString() === req.user.id
      );
      return sum + myItems.reduce((s, i) => s + i.price * i.quantity, 0);
    }, 0);

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders: orders.length,
        productCount,
        rating: store.rating,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get vendor sales data
router.get('/vendor/sales', protect, async (req, res) => {
  try {
    const Order = require('../models/Order');
    
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const orders = await Order.find({
      'items.vendor': req.user.id,
      createdAt: { $gte: sixMonthsAgo },
    }).sort({ createdAt: 1 });

    const salesByMonth = {};
    orders.forEach(order => {
      const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' });
      const myItems = order.items.filter(
        item => item.vendor?.toString() === req.user.id
      );
      const total = myItems.reduce((s, i) => s + i.price * i.quantity, 0);
      
      if (!salesByMonth[month]) {
        salesByMonth[month] = { revenue: 0, orders: 0 };
      }
      salesByMonth[month].revenue += total;
      salesByMonth[month].orders += 1;
    });

    const salesData = Object.entries(salesByMonth).map(([month, data]) => ({
      month,
      revenue: parseFloat(data.revenue.toFixed(2)),
      orders: data.orders,
    }));

    res.json({
      success: true,
      data: { salesData },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Deactivate store
router.put('/deactivate', protect, async (req, res) => {
  try {
    const store = await Store.findOne({ owner: req.user.id });
    
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }

    store.isActive = false;
    await store.save();

    const user = await User.findById(req.user.id);
    user.role = 'buyer';
    user.storeProfile = {};
    await user.save();

    res.json({
      success: true,
      message: 'Store deactivated',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
