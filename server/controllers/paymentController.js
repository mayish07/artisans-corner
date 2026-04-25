// server/controllers/paymentController.js
// Payment controller - handles Stripe payment operations

const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { ApiError } = require('../middleware/errorHandler');
const { asyncHandler } = require('../middleware/errorHandler');

// Stripe at module level (singleton)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * @desc    Create Stripe payment intent
 * @route   POST /api/payment/create-intent
 * @access  Private
 */
const createPaymentIntent = asyncHandler(async (req, res) => {
  const { couponCode } = req.body;

  const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');

  if (!cart || cart.items.length === 0) {
    throw ApiError.badRequest('Cart is empty');
  }

  const validItems = cart.items.filter(item =>
    item.productId &&
    item.productId.isActive &&
    !item.productId.isFlagged &&
    !item.savedForLater &&
    item.productId.stock >= item.quantity
  );

  if (validItems.length === 0) {
    throw ApiError.badRequest('No valid items in cart');
  }

  let subtotal = validItems.reduce((sum, item) => {
    return sum + (item.productId.price * item.quantity);
  }, 0);

  let discount = 0;

  if (couponCode) {
    const Coupon = require('../models/Coupon');
    const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });

    if (coupon && coupon.isActive) {
      if (!coupon.expiryDate || new Date() < coupon.expiryDate) {
        if (!coupon.usageLimit || coupon.usedCount < coupon.usageLimit) {
          discount = (subtotal * coupon.discountPercent) / 100;
          if (coupon.maxDiscount) {
            discount = Math.min(discount, coupon.maxDiscount);
          }
        }
      }
    }
  }

  const totalAmount = subtotal - discount;
  const amountInCents = Math.round(totalAmount * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'usd',
    metadata: {
      userId: req.user._id.toString(),
      items: JSON.stringify(validItems.map(item => ({
        productId: item.productId._id.toString(),
        quantity: item.quantity
      })))
    },
    automatic_payment_methods: {
      enabled: true
    }
  });

  res.json({
    success: true,
    data: {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: totalAmount,
      subtotal,
      discount,
      currency: 'usd'
    }
  });
});

/**
 * @desc    Confirm payment and create order
 * @route   POST /api/payment/confirm
 * @access  Private
 */
const confirmPayment = asyncHandler(async (req, res) => {
  const { paymentIntentId, shippingAddress, couponCode } = req.body;

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status !== 'succeeded') {
    throw ApiError.badRequest('Payment not completed');
  }

  const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');

  if (!cart) {
    throw ApiError.badRequest('Cart not found');
  }

  const validItems = cart.items.filter(item =>
    item.productId &&
    item.productId.isActive &&
    !item.productId.isFlagged &&
    !item.savedForLater &&
    item.productId.stock >= item.quantity
  );

  let subtotal = validItems.reduce((sum, item) => {
    return sum + (item.productId.price * item.quantity);
  }, 0);

  let discount = 0;
  let coupon = null;

  if (couponCode) {
    const Coupon = require('../models/Coupon');
    coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });

    if (coupon && coupon.isActive) {
      discount = (subtotal * coupon.discountPercent) / 100;
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }

      coupon.usedCount += 1;
      await coupon.save();
    }
  }

  const totalAmount = subtotal - discount;
  const commission = totalAmount * 0.05;

  const vendorEarnings = {};
  const orderItems = [];

  for (const item of validItems) {
    const product = item.productId;
    const itemTotal = product.price * item.quantity;
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

  const vendors = Object.keys(vendorEarnings).map(vendorId => ({
    vendorId,
    totalEarnings: vendorEarnings[vendorId],
    commission: vendorEarnings[vendorId] * 0.05,
    netEarnings: vendorEarnings[vendorId] * 0.95
  }));

  const order = await Order.create({
    buyerId: req.user._id,
    items: orderItems,
    shippingAddress,
    totalAmount,
    commission,
    discount,
    couponCode: coupon ? coupon.code : null,
    paymentStatus: 'paid',
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

  res.json({
    success: true,
    message: 'Payment successful, order created',
    data: { order }
  });
});

module.exports = {
  createPaymentIntent,
  confirmPayment
};
