// server/controllers/couponController.js
// Coupon controller - handles discount coupon operations

const Coupon = require('../models/Coupon');
const { ApiError } = require('../middleware/errorHandler');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @desc    Validate and apply coupon
 * @route   POST /api/coupons/apply
 * @access  Private
 */
const applyCoupon = asyncHandler(async (req, res) => {
  const { code, subtotal } = req.body;

  const coupon = await Coupon.findOne({ code: code.toUpperCase() });

  if (!coupon) {
    throw ApiError.notFound('Invalid coupon code');
  }

  if (!coupon.isActive) {
    throw ApiError.badRequest('Coupon is no longer active');
  }

  if (coupon.expiryDate && new Date() > coupon.expiryDate) {
    throw ApiError.badRequest('Coupon has expired');
  }

  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    throw ApiError.badRequest('Coupon usage limit reached');
  }

  const minOrderAmount = coupon.minOrderAmount || 0;
  if (subtotal < minOrderAmount) {
    throw ApiError.badRequest(`Minimum order amount is $${minOrderAmount}`);
  }

  const discount = (subtotal * coupon.discountPercent) / 100;
  const maxDiscount = coupon.maxDiscount || discount;

  res.json({
    success: true,
    message: 'Coupon applied successfully',
    data: {
      coupon: {
        code: coupon.code,
        discountPercent: coupon.discountPercent
      },
      discount: Math.min(discount, maxDiscount)
    }
  });
});

/**
 * @desc    Get coupon details
 * @route   GET /api/coupons/:code
 * @access  Private
 */
const getCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase() });

  if (!coupon) {
    throw ApiError.notFound('Coupon not found');
  }

  res.json({
    success: true,
    data: {
      coupon: {
        code: coupon.code,
        discountPercent: coupon.discountPercent,
        minOrderAmount: coupon.minOrderAmount,
        maxDiscount: coupon.maxDiscount,
        expiryDate: coupon.expiryDate,
        isActive: coupon.isActive,
        usageLimit: coupon.usageLimit,
        usedCount: coupon.usedCount
      }
    }
  });
});

module.exports = {
  applyCoupon,
  getCoupon
};
