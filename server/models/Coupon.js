// server/models/Coupon.js
// Coupon model with usage limits, expiry, and discount tracking

const mongoose = require('mongoose');

/**
 * @typedef {Object} CouponDocument
 * @property {string} code
 * @property {string} description
 * @property {number} discountPercent
 * @property {number} discountAmount
 * @property {number} minimumOrderValue
 * @property {number} maximumDiscount
 * @property {Date} expiryDate
 * @property {number} usageLimit
 * @property {number} usedCount
 * @property {number} perUserLimit
 * @property {boolean} isActive
 * @property {'fixed' | 'percentage'} discountType
 * @property {Array<string>} applicableCategories
 * @property {Array<mongoose.Types.ObjectId>} applicableProducts
 * @property {Array<mongoose.Types.ObjectId>} excludedProducts
 * @property {mongoose.Types.ObjectId} createdBy
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Coupon code is required'],
    unique: true,
    uppercase: true,
    trim: true,
    minlength: [3, 'Coupon code must be at least 3 characters'],
    maxlength: [50, 'Coupon code cannot exceed 50 characters'],
    index: true
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    default: 'percentage'
  },
  discountPercent: {
    type: Number,
    min: [1, 'Discount must be at least 1%'],
    max: [100, 'Discount cannot exceed 100%'],
    validate: {
      validator: function(value) {
        return this.discountType !== 'percentage' || (value >= 1 && value <= 100);
      },
      message: 'Percentage discount must be between 1 and 100'
    }
  },
  discountAmount: {
    type: Number,
    min: [0, 'Discount amount cannot be negative']
  },
  minimumOrderValue: {
    type: Number,
    default: 0,
    min: [0, 'Minimum order value cannot be negative']
  },
  maximumDiscount: {
    type: Number,
    min: [0, 'Maximum discount cannot be negative']
  },
  freeShipping: {
    type: Boolean,
    default: false
  },
  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required'],
    index: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  usageLimit: {
    type: Number,
    min: [1, 'Usage limit must be at least 1']
  },
  usedCount: {
    type: Number,
    default: 0,
    min: 0
  },
  perUserLimit: {
    type: Number,
    default: 1,
    min: 1
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  applicableCategories: [{
    type: String,
    trim: true
  }],
  applicableProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  excludedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  applicableVendors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  excludedVendors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  newUsersOnly: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  usageHistory: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    discountAmount: Number,
    usedAt: {
      type: Date,
      default: Date.now
    }
  }],
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

couponSchema.index({ isActive: 1, expiryDate: 1 });
couponSchema.index({ createdBy: 1 });

couponSchema.pre('save', function(next) {
  if (this.isModified('code')) {
    this.code = this.code.toUpperCase().trim();
  }
  next();
});

couponSchema.methods.isValid = function(orderTotal, userId) {
  const now = new Date();

  if (!this.isActive) {
    return { valid: false, reason: 'Coupon is no longer active' };
  }

  if (this.startDate && now < this.startDate) {
    return { valid: false, reason: 'Coupon is not yet active' };
  }

  if (this.expiryDate && now > this.expiryDate) {
    return { valid: false, reason: 'Coupon has expired' };
  }

  if (this.usageLimit && this.usedCount >= this.usageLimit) {
    return { valid: false, reason: 'Coupon usage limit has been reached' };
  }

  if (this.minimumOrderValue && orderTotal < this.minimumOrderValue) {
    return {
      valid: false,
      reason: `Minimum order value of $${this.minimumOrderValue} required`
    };
  }

  const userUsage = this.usageHistory?.filter(
    h => h.userId.toString() === userId.toString()
  ).length || 0;

  if (this.perUserLimit && userUsage >= this.perUserLimit) {
    return {
      valid: false,
      reason: 'You have already used this coupon the maximum number of times'
    };
  }

  return { valid: true };
};

couponSchema.methods.calculateDiscount = function(subtotal) {
  let discount = 0;

  if (this.discountType === 'percentage') {
    discount = subtotal * (this.discountPercent / 100);
  } else if (this.discountType === 'fixed') {
    discount = this.discountAmount;
  }

  if (this.maximumDiscount && discount > this.maximumDiscount) {
    discount = this.maximumDiscount;
  }

  if (discount > subtotal) {
    discount = subtotal;
  }

  return Math.round(discount * 100) / 100;
};

couponSchema.methods.canApplyToProduct = function(productId, category, vendorId) {
  if (this.excludedProducts?.includes(productId)) {
    return false;
  }

  if (this.excludedVendors?.includes(vendorId)) {
    return false;
  }

  if (this.applicableProducts?.length > 0 && !this.applicableProducts.includes(productId)) {
    return false;
  }

  if (this.applicableCategories?.length > 0 && !this.applicableCategories.includes(category)) {
    return false;
  }

  if (this.applicableVendors?.length > 0 && !this.applicableVendors.includes(vendorId)) {
    return false;
  }

  return true;
};

couponSchema.methods.recordUsage = async function(userId, orderId, discountAmount) {
  this.usedCount += 1;
  this.usageHistory.push({
    userId,
    orderId,
    discountAmount,
    usedAt: new Date()
  });
  return this.save();
};

couponSchema.statics.findValidCoupon = async function(code, userId, orderTotal) {
  const coupon = await this.findOne({
    code: code.toUpperCase(),
    isActive: true
  });

  if (!coupon) {
    return { valid: false, reason: 'Coupon not found' };
  }

  const validation = coupon.isValid(orderTotal, userId);
  if (!validation.valid) {
    return validation;
  }

  const discount = coupon.calculateDiscount(orderTotal);

  return {
    valid: true,
    coupon,
    discount,
    newTotal: orderTotal - discount
  };
};

couponSchema.statics.generateCouponCode = function(prefix = 'ART') {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${random}`;
};

couponSchema.statics.getActiveCoupons = function(options = {}) {
  const { page = 1, limit = 20 } = options;
  const now = new Date();

  return this.find({
    isActive: true,
    $or: [
      { expiryDate: { $gte: now } },
      { expiryDate: null }
    ],
    startDate: { $lte: now }
  })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
};

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
