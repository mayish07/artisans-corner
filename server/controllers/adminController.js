// server/controllers/adminController.js
// Admin controller - handles admin-only operations

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Review = require('../models/Review');
const Coupon = require('../models/Coupon');
const { ApiError } = require('../middleware/errorHandler');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @desc    Get platform statistics
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
const getStats = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalVendors,
    totalProducts,
    totalOrders,
    totalRevenue
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'vendor' }),
    Product.countDocuments(),
    Order.countDocuments(),
    Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ])
  ]);

  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('buyerId', 'name email');

  const pendingVendorApplications = await User.countDocuments({
    role: 'vendor',
    'storeProfile.approved': false
  });

  const flaggedProducts = await Product.countDocuments({ isFlagged: true });

  res.json({
    success: true,
    data: {
      stats: {
        totalUsers,
        totalVendors,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        pendingVendorApplications,
        flaggedProducts
      },
      recentOrders
    }
  });
});

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, role, search } = req.query;

  const query = {};
  if (role) query.role = role;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [users, total] = await Promise.all([
    User.find(query)
      .select('-password -refreshToken')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    User.countDocuments(query)
  ]);

  res.json({
    success: true,
    data: {
      users,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalUsers: total
      }
    }
  });
});

/**
 * @desc    Get vendor applications
 * @route   GET /api/admin/vendor-applications
 * @access  Private/Admin
 */
const getVendorApplications = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;

  const query = { role: 'vendor' };
  if (status === 'pending') query['storeProfile.approved'] = false;
  else if (status === 'approved') query['storeProfile.approved'] = true;

  const skip = (Number(page) - 1) * Number(limit);

  const [vendors, total] = await Promise.all([
    User.find(query)
      .select('name email storeProfile createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    User.countDocuments(query)
  ]);

  res.json({
    success: true,
    data: {
      applications: vendors,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        total: total
      }
    }
  });
});

/**
 * @desc    Approve vendor application
 * @route   PUT /api/admin/vendor-applications/:userId/approve
 * @access  Private/Admin
 */
const approveVendor = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  if (user.role !== 'vendor') {
    throw ApiError.badRequest('User is not a vendor');
  }

  user.storeProfile.approved = true;
  await user.save();

  res.json({
    success: true,
    message: 'Vendor approved successfully',
    data: { user }
  });
});

/**
 * @desc    Reject vendor application
 * @route   PUT /api/admin/vendor-applications/:userId/reject
 * @access  Private/Admin
 */
const rejectVendor = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { reason } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  user.role = 'buyer';
  user.storeProfile = undefined;
  await user.save();

  res.json({
    success: true,
    message: 'Vendor application rejected',
    data: { user }
  });
});

/**
 * @desc    Get all products for moderation
 * @route   GET /api/admin/products
 * @access  Private/Admin
 */
const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, flagged, vendorId } = req.query;

  const query = {};
  if (flagged === 'true') query.isFlagged = true;
  if (vendorId) query.vendorId = vendorId;

  const skip = (Number(page) - 1) * Number(limit);

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate('vendorId', 'name email storeProfile.storeName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Product.countDocuments(query)
  ]);

  res.json({
    success: true,
    data: {
      products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalProducts: total
      }
    }
  });
});

/**
 * @desc    Flag a product
 * @route   PUT /api/admin/products/:productId/flag
 * @access  Private/Admin
 */
const flagProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { reason } = req.body;

  const product = await Product.findByIdAndUpdate(
    productId,
    { isFlagged: true, flagReason: reason },
    { new: true }
  );

  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  res.json({
    success: true,
    message: 'Product flagged',
    data: { product }
  });
});

/**
 * @desc    Unflag a product
 * @route   PUT /api/admin/products/:productId/unflag
 * @access  Private/Admin
 */
const unflagProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.productId,
    { isFlagged: false, flagReason: null },
    { new: true }
  );

  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  res.json({
    success: true,
    message: 'Product unflagged',
    data: { product }
  });
});

/**
 * @desc    Delete a product
 * @route   DELETE /api/admin/products/:productId
 * @access  Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.productId);

  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  res.json({
    success: true,
    message: 'Product deleted'
  });
});

/**
 * @desc    Get all orders
 * @route   GET /api/admin/orders
 * @access  Private/Admin
 */
const getAllOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status, paymentStatus } = req.query;

  const query = {};
  if (status) query.orderStatus = status;
  if (paymentStatus) query.paymentStatus = paymentStatus;

  const skip = (Number(page) - 1) * Number(limit);

  const [orders, total] = await Promise.all([
    Order.find(query)
      .populate('buyerId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Order.countDocuments(query)
  ]);

  res.json({
    success: true,
    data: {
      orders,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalOrders: total
      }
    }
  });
});

/**
 * @desc    Update any order status
 * @route   PUT /api/admin/orders/:orderId/status
 * @access  Private/Admin
 */
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus, trackingNumber } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    throw ApiError.notFound('Order not found');
  }

  order.orderStatus = orderStatus;
  if (trackingNumber) order.trackingNumber = trackingNumber;
  await order.save();

  res.json({
    success: true,
    message: 'Order status updated',
    data: { order }
  });
});

/**
 * @desc    Get revenue statistics
 * @route   GET /api/admin/revenue
 * @access  Private/Admin
 */
const getRevenueStats = asyncHandler(async (req, res) => {
  const { period = '30days' } = req.query;

  let startDate = new Date();
  if (period === '7days') startDate.setDate(startDate.getDate() - 7);
  else if (period === '30days') startDate.setDate(startDate.getDate() - 30);
  else if (period === '90days') startDate.setDate(startDate.getDate() - 90);
  else startDate.setFullYear(startDate.getFullYear() - 1);

  const orders = await Order.find({
    paymentStatus: 'paid',
    createdAt: { $gte: startDate }
  });

  let totalRevenue = 0;
  let totalCommission = 0;
  const dailyRevenue = {};

  for (const order of orders) {
    totalRevenue += order.totalAmount;
    totalCommission += order.commission || 0;

    const dateKey = order.createdAt.toISOString().split('T')[0];
    if (!dailyRevenue[dateKey]) {
      dailyRevenue[dateKey] = { revenue: 0, orders: 0, commission: 0 };
    }
    dailyRevenue[dateKey].revenue += order.totalAmount;
    dailyRevenue[dateKey].orders += 1;
    dailyRevenue[dateKey].commission += order.commission || 0;
  }

  const chartData = Object.entries(dailyRevenue)
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const topVendors = await Order.aggregate([
    { $match: { paymentStatus: 'paid', createdAt: { $gte: startDate } } },
    { $unwind: '$vendors' },
    {
      $group: {
        _id: '$vendors.vendorId',
        totalSales: { $sum: '$vendors.totalEarnings' },
        totalOrders: { $sum: 1 }
      }
    },
    { $sort: { totalSales: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'vendor'
      }
    },
    { $unwind: '$vendor' },
    {
      $project: {
        vendorId: '$_id',
        vendorName: '$vendor.name',
        storeName: '$vendor.storeProfile.storeName',
        totalSales: 1,
        totalOrders: 1
      }
    }
  ]);

  res.json({
    success: true,
    data: {
      totalRevenue,
      totalCommission,
      netRevenue: totalRevenue - totalCommission,
      totalOrders: orders.length,
      chartData,
      topVendors
    }
  });
});

/**
 * @desc    Create coupon
 * @route   POST /api/admin/coupons
 * @access  Private/Admin
 */
const createCoupon = asyncHandler(async (req, res) => {
  const { code, discountPercent, expiryDate, usageLimit } = req.body;

  const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
  if (existingCoupon) {
    throw ApiError.conflict('Coupon code already exists');
  }

  const coupon = await Coupon.create({
    code: code.toUpperCase(),
    discountPercent,
    expiryDate,
    usageLimit,
    isActive: true
  });

  res.status(201).json({
    success: true,
    message: 'Coupon created',
    data: { coupon }
  });
});

/**
 * @desc    Get all coupons
 * @route   GET /api/admin/coupons
 * @access  Private/Admin
 */
const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    data: { coupons }
  });
});

/**
 * @desc    Update user (admin)
 * @route   PUT /api/admin/users/:userId
 * @access  Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role, isActive } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  if (role) user.role = role;
  if (typeof isActive === 'boolean') user.isActive = isActive;

  await user.save();

  res.json({
    success: true,
    message: 'User updated',
    data: { user }
  });
});

module.exports = {
  getStats,
  getAllUsers,
  getVendorApplications,
  approveVendor,
  rejectVendor,
  getAllProducts,
  flagProduct,
  unflagProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  getRevenueStats,
  createCoupon,
  getCoupons,
  updateUser
};
