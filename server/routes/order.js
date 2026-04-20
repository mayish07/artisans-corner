// server/routes/order.js
// Order routes

const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  getVendorOrders,
  cancelOrder,
  getVendorStats
} = require('../controllers/orderController');
const { protect, authorize, vendorOnly } = require('../middleware/auth');
const { orderValidation } = require('../middleware/validate');
const { orderLimiter } = require('../middleware/rateLimiter');

router.get('/vendor', protect, vendorOnly, getVendorOrders);
router.get('/vendor/stats', protect, vendorOnly, getVendorStats);
router.get('/my', protect, getMyOrders);
router.get('/:id', protect, getOrder);

router.post('/', protect, orderLimiter, orderValidation.create, createOrder);
router.put('/:id/status', protect, vendorOnly, updateOrderStatus);
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;
