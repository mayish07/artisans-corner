// server/routes/coupon.js
// Coupon routes

const express = require('express');
const router = express.Router();
const {
  applyCoupon,
  getCoupon
} = require('../controllers/couponController');
const { protect } = require('../middleware/auth');

router.post('/apply', protect, applyCoupon);
router.get('/:code', protect, getCoupon);

module.exports = router;
