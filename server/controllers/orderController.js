// server/controllers/orderController.js
// Order controller - handles order creation, updates, and management

const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const User = require('../models/User');
const { ApiError } = require('../middleware/errorHandler');
const { asyncHandler } = require('../middleware/errorHandler');
const { sendEmail } = require('../utils/email');

const PLATFORM_COMMISSION = 0.05;

/**
 * @desc    Create new order from cart
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentIntentId } = req.body;

  const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
  
  if (!cart || cart.items.length === 0) {
    throw ApiError.badRequest('Cart is empty');
  }

  const validItems = cart.items.filter(item => 
    item.productId && 
    item.productId.isActive && 
    !item.productId.isFlagged &&
    item.productId.stock >= item.quantity
  );

  if (validItems.length === 0) {
    throw ApiError.badRequest('No valid items in cart');
  }

  let totalAmount = 0;
  const orderItems = [];
  const vendorEarnings = {};

  for (const item of validItems) {
    const product = item.productId;
    const itemTotal = product.price * item.quantity;
    totalAmount += itemTotal;

    const vendorId = product.vendorId.toString();
    if (!vendorEarnings[vendorId]) {
      vendorEarnings[vendorId] = 0;
    }
    vendorEarnings[vendorId] += itemTotal;

    orderItems.push({
      productId: product._id,
      vendorId: product.vendorId,
      title: product.title,
      quantity: item.quantity,
      price: product.price,
      image: product.images[0]
    });

    product.stock -= item.quantity;
    product.salesCount += item.quantity;
    await product.save();
  }

  const commission = totalAmount * PLATFORM_COMMISSION;
  const vendors = Object.keys(vendorEarnings).map(vendorId => ({
    vendorId,
    totalEarnings: vendorEarnings[vendorId],
    commission: vendorEarnings[vendorId] * PLATFORM_COMMISSION,
    netEarnings: vendorEarnings[vendorId] * (1 - PLATFORM_COMMISSION)
  }));

  const order = await Order.create({
    buyerId: req.user._id,
    items: orderItems,
    shippingAddress,
    totalAmount,
    commission,
    paymentStatus: paymentIntentId ? 'paid' : 'pending',
    stripePaymentIntentId: paymentIntentId,
    orderStatus: 'processing',
    vendors
  });

  cart.items = [];
  await cart.save();

  const io = req.app.get('io');
  for (const item of orderItems) {
    io.to(`vendor-${item.vendorId}`).emit('new-order', {
      orderId: order._id,
      productTitle: item.title,
      quantity: item.quantity
    });
  }

  try {
    await sendEmail({
      to: req.user.email,
      subject: `Order Confirmed - #${order._id}`,
      html: `<h1>Order Confirmed!</h1><p>Your order #${order._id} has been placed successfully.</p>`
    });
  } catch (error) {
    console.error('Failed to send order email:', error);
  }

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: { order }
  });
});

/**
 * @desc    Get user's orders
 * @route   GET /api/orders
 * @access  Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  const query = { buyerId: req.user._id };
  if (status) query.orderStatus = status;

  const skip = (Number(page) - 1) * Number(limit);

  const [orders, total] = await Promise.all([
    Order.find(query)
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
 * @desc    Get single order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw ApiError.notFound('Order not found');
  }

  const isBuyer = order.buyerId.toString() === req.user._id.toString();
  const isVendor = order.items.some(item => item.vendorId.toString() === req.user._id.toString());
  const isAdmin = req.user.role === 'admin';

  if (!isBuyer && !isVendor && !isAdmin) {
    throw ApiError.forbidden('Access denied');
  }

  res.json({
    success: true,
    data: { order }
  });
});

/**
 * @desc    Update order status (vendor)
 * @route   PUT /api/orders/:id/status
 * @access  Private/Vendor
 */
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus, trackingNumber } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    throw ApiError.notFound('Order not found');
  }

  const isVendor = order.items.some(item => item.vendorId.toString() === req.user._id.toString());
  const isAdmin = req.user.role === 'admin';

  if (!isVendor && !isAdmin) {
    throw ApiError.forbidden('Access denied');
  }

  if (isVendor && order.orderStatus === 'delivered') {
    throw ApiError.badRequest('Cannot update delivered order');
  }

  order.orderStatus = orderStatus;
  if (trackingNumber) order.trackingNumber = trackingNumber;

  if (orderStatus === 'delivered') {
    order.deliveredAt = new Date();
  } else if (orderStatus === 'shipped') {
    order.shippedAt = new Date();
  }

  await order.save();

  const io = req.app.get('io');
  io.to(`user-${order.buyerId}`).emit('order-status-update', {
    orderId: order._id,
    status: orderStatus
  });

  res.json({
    success: true,
    message: 'Order status updated',
    data: { order }
  });
});

/**
 * @desc    Get vendor's orders
 * @route   GET /api/orders/vendor
 * @access  Private/Vendor
 */
const getVendorOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  const orders = await Order.find({
    'items.vendorId': req.user._id
  })
    .sort({ createdAt: -1 });

  let vendorOrders = orders.map(order => ({
    ...order.toObject(),
    items: order.items.filter(item => item.vendorId.toString() === req.user._id.toString()),
    totalAmount: order.items
      .filter(item => item.vendorId.toString() === req.user._id.toString())
      .reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }));

  if (status) {
    vendorOrders = vendorOrders.filter(o => o.orderStatus === status);
  }

  const startIndex = (Number(page) - 1) * Number(limit);
  const paginatedOrders = vendorOrders.slice(startIndex, startIndex + Number(limit));

  res.json({
    success: true,
    data: {
      orders: paginatedOrders,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(vendorOrders.length / Number(limit)),
        totalOrders: vendorOrders.length
      }
    }
  });
});

/**
 * @desc    Cancel order (buyer)
 * @route   PUT /api/orders/:id/cancel
 * @access  Private
 */
const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw ApiError.notFound('Order not found');
  }

  if (order.buyerId.toString() !== req.user._id.toString()) {
    throw ApiError.forbidden('Access denied');
  }

  if (!['processing', 'confirmed'].includes(order.orderStatus)) {
    throw ApiError.badRequest('Cannot cancel order in current status');
  }

  order.orderStatus = 'cancelled';
  order.cancelledAt = new Date();
  order.cancelledBy = req.user._id;

  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { stock: item.quantity, salesCount: -item.quantity }
    });
  }

  await order.save();

  res.json({
    success: true,
    message: 'Order cancelled successfully',
    data: { order }
  });
});

/**
 * @desc    Get vendor sales statistics
 * @route   GET /api/orders/vendor/stats
 * @access  Private/Vendor
 */
const getVendorStats = asyncHandler(async (req, res) => {
  const { period = '30days' } = req.query;

  let startDate = new Date();
  if (period === '7days') startDate.setDate(startDate.getDate() - 7);
  else if (period === '30days') startDate.setDate(startDate.getDate() - 30);
  else if (period === '90days') startDate.setDate(startDate.getDate() - 90);
  else startDate.setFullYear(startDate.getFullYear() - 1);

  const orders = await Order.find({
    'items.vendorId': req.user._id,
    orderStatus: { $in: ['delivered', 'shipped', 'processing'] },
    createdAt: { $gte: startDate }
  });

  const dailySales = {};
  let totalSales = 0;
  let totalOrders = 0;
  let totalEarnings = 0;

  for (const order of orders) {
    const vendorItems = order.items.filter(
      item => item.vendorId.toString() === req.user._id.toString()
    );

    for (const item of vendorItems) {
      const itemTotal = item.price * item.quantity;
      totalSales += itemTotal;
      totalEarnings += itemTotal * (1 - PLATFORM_COMMISSION);
      totalOrders++;

      const dateKey = order.createdAt.toISOString().split('T')[0];
      if (!dailySales[dateKey]) {
        dailySales[dateKey] = { sales: 0, orders: 0 };
      }
      dailySales[dateKey].sales += itemTotal;
      dailySales[dateKey].orders += 1;
    }
  }

  const chartData = Object.entries(dailySales)
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  res.json({
    success: true,
    data: {
      totalSales,
      totalOrders,
      totalEarnings,
      commission: totalSales * PLATFORM_COMMISSION,
      chartData
    }
  });
});

module.exports = {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  getVendorOrders,
  cancelOrder,
  getVendorStats
};
