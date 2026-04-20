// server/models/Order.js
// Order model with items, shipping, payment, and commission tracking

const mongoose = require('mongoose');

/**
 * @typedef {Object} OrderItem
 * @property {mongoose.Types.ObjectId} productId
 * @property {mongoose.Types.ObjectId} vendorId
 * @property {string} title
 * @property {string} image
 * @property {number} quantity
 * @property {number} price
 * @property {number} total
 */

/**
 * @typedef {Object} ShippingAddress
 * @property {string} fullName
 * @property {string} phone
 * @property {string} line1
 * @property {string} line2
 * @property {string} city
 * @property {string} state
 * @property {string} zip
 * @property {string} country
 */

/**
 * @typedef {Object} OrderDocument
 * @property {mongoose.Types.ObjectId} buyerId
 * @property {Array<OrderItem>} items
 * @property {ShippingAddress} shippingAddress
 * @property {number} subtotal
 * @property {number} shippingCost
 * @property {number} tax
 * @property {number} discount
 * @property {string} couponCode
 * @property {number} totalAmount
 * @property {number} commission
 * @property {number} vendorEarnings
 * @property {'pending' | 'paid' | 'failed' | 'refunded'} paymentStatus
 * @property {'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'} orderStatus
 * @property {string} stripePaymentIntentId
 * @property {string} trackingNumber
 * @property {Array<{status: string, timestamp: Date, note: string}>} statusHistory
 * @property {Date} shippedAt
 * @property {Date} deliveredAt
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    validate: {
      validator: Number.isInteger,
      message: 'Quantity must be an integer'
    }
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });

const statusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  note: {
    type: String
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  items: [orderItemSchema],
  shippingAddress: {
    fullName: {
      type: String,
      required: [true, 'Full name is required']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    },
    line1: {
      type: String,
      required: [true, 'Address line 1 is required']
    },
    line2: String,
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    zip: {
      type: String,
      required: [true, 'ZIP code is required']
    },
    country: {
      type: String,
      default: 'United States'
    }
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  shippingCost: {
    type: Number,
    default: 0,
    min: 0
  },
  tax: {
    type: Number,
    default: 0,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  couponCode: String,
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
    index: true
  },
  commission: {
    type: Number,
    required: true,
    min: 0
  },
  vendorEarnings: {
    type: Number,
    required: true,
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded', 'partially_refunded'],
    default: 'pending',
    index: true
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'processing',
    index: true
  },
  stripePaymentIntentId: {
    type: String,
    index: true
  },
  stripeReceiptUrl: String,
  trackingNumber: String,
  trackingUrl: String,
  carrier: String,
  statusHistory: [statusHistorySchema],
  shippedAt: Date,
  deliveredAt: Date,
  notes: String,
  isReviewed: {
    type: Boolean,
    default: false
  },
  refundReason: String,
  refundAmount: Number
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

orderSchema.index({ buyerId: 1, createdAt: -1 });
orderSchema.index({ 'items.vendorId': 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1, paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });

orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.orderNumber = `ART-${year}${month}${day}-${random}`;
    
    if (!this.statusHistory || this.statusHistory.length === 0) {
      this.statusHistory = [{
        status: 'processing',
        timestamp: new Date(),
        note: 'Order placed'
      }];
    }
  }
  next();
});

orderSchema.statics.COMMISSION_RATE = 0.05;

orderSchema.methods.calculateCommission = function() {
  const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  this.commission = Math.round(subtotal * Order.COMMISSION_RATE * 100) / 100;
  this.vendorEarnings = Math.round((subtotal - this.commission) * 100) / 100;
  return { commission: this.commission, vendorEarnings: this.vendorEarnings };
};

orderSchema.methods.updateStatus = function(newStatus, note, updatedBy) {
  const validTransitions = {
    processing: ['confirmed', 'cancelled'],
    confirmed: ['shipped', 'cancelled'],
    shipped: ['delivered'],
    delivered: [],
    cancelled: []
  };

  if (!validTransitions[this.orderStatus].includes(newStatus)) {
    throw new Error(`Cannot transition from ${this.orderStatus} to ${newStatus}`);
  }

  this.orderStatus = newStatus;
  this.statusHistory.push({
    status: newStatus,
    timestamp: new Date(),
    note,
    updatedBy
  });

  if (newStatus === 'shipped') this.shippedAt = new Date();
  if (newStatus === 'delivered') this.deliveredAt = new Date();

  return this.save();
};

orderSchema.statics.getVendorOrders = function(vendorId, options = {}) {
  const { status, page = 1, limit = 20 } = options;
  
  return this.find({
    'items.vendorId': vendorId,
    ...(status && { orderStatus: status })
  })
  .sort({ createdAt: -1 })
  .skip((page - 1) * limit)
  .limit(limit);
};

orderSchema.statics.getVendorStats = async function(vendorId, startDate, endDate) {
  const matchStage = {
    'items.vendorId': vendorId,
    orderStatus: { $in: ['delivered', 'shipped'] }
  };

  if (startDate || endDate) {
    matchStage.createdAt = {};
    if (startDate) matchStage.createdAt.$gte = new Date(startDate);
    if (endDate) matchStage.createdAt.$lte = new Date(endDate);
  }

  const stats = await this.aggregate([
    { $match: matchStage },
    { $unwind: '$items' },
    { $match: { 'items.vendorId': new mongoose.Types.ObjectId(vendorId) } },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$items.total' },
        totalOrders: { $sum: 1 },
        totalCommission: {
          $sum: { $multiply: ['$items.total', Order.COMMISSION_RATE] }
        },
        totalRevenue: {
          $sum: { $multiply: ['$items.total', { $subtract: [1, Order.COMMISSION_RATE] }] }
        }
      }
    }
  ]);

  return stats[0] || { totalSales: 0, totalOrders: 0, totalCommission: 0, totalRevenue: 0 };
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
