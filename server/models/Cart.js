// server/models/Cart.js
// Cart model with user association and save-for-later functionality

const mongoose = require('mongoose');

/**
 * @typedef {Object} CartItem
 * @property {mongoose.Types.ObjectId} productId
 * @property {number} quantity
 * @property {boolean} savedForLater
 * @property {Date} addedAt
 */

/**
 * @typedef {Object} CartDocument
 * @property {mongoose.Types.ObjectId} userId
 * @property {Array<CartItem>} items
 * @property {Date} updatedAt
 */

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
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
  savedForLater: {
    type: Boolean,
    default: false
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  movedBackAt: Date
}, { _id: true });

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  couponCode: {
    type: String
  },
  appliedCoupon: {
    code: String,
    discountPercent: Number,
    discountAmount: Number
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

cartSchema.virtual('activeItems').get(function() {
  return this.items.filter(item => !item.savedForLater);
});

cartSchema.virtual('savedItems').get(function() {
  return this.items.filter(item => item.savedForLater);
});

cartSchema.virtual('totalItems').get(function() {
  return this.items
    .filter(item => !item.savedForLater)
    .reduce((sum, item) => sum + item.quantity, 0);
});

cartSchema.virtual('subtotal').get(function() {
  return 0;
});

cartSchema.methods.calculateSubtotal = async function() {
  const Product = mongoose.model('Product');
  const activeItems = this.items.filter(item => !item.savedForLater);
  
  let subtotal = 0;
  const itemsWithPrice = [];

  for (const item of activeItems) {
    const product = await Product.findById(item.productId).select('price stock title images');
    if (product) {
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;
      itemsWithPrice.push({
        ...item.toObject(),
        product,
        itemTotal,
        inStock: product.stock >= item.quantity
      });
    }
  }

  return { subtotal, items: itemsWithPrice, totalItems: this.totalItems };
};

cartSchema.methods.addItem = async function(productId, quantity = 1) {
  const existingItem = this.items.find(
    item => item.productId.toString() === productId.toString() && !item.savedForLater
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({
      productId,
      quantity,
      savedForLater: false,
      addedAt: new Date()
    });
  }

  return this.save();
};

cartSchema.methods.updateQuantity = function(productId, quantity) {
  const item = this.items.find(
    item => item.productId.toString() === productId.toString() && !item.savedForLater
  );

  if (!item) {
    throw new Error('Item not found in cart');
  }

  if (quantity <= 0) {
    return this.removeItem(productId);
  }

  item.quantity = quantity;
  return this.save();
};

cartSchema.methods.removeItem = function(productId) {
  this.items = this.items.filter(
    item => item.productId.toString() !== productId.toString()
  );
  return this.save();
};

cartSchema.methods.saveForLater = function(productId) {
  const item = this.items.find(
    item => item.productId.toString() === productId.toString() && !item.savedForLater
  );

  if (!item) {
    throw new Error('Item not found in cart');
  }

  item.savedForLater = true;
  item.movedBackAt = null;
  return this.save();
};

cartSchema.methods.moveToCart = function(productId) {
  const item = this.items.find(
    item => item.productId.toString() === productId.toString() && item.savedForLater
  );

  if (!item) {
    throw new Error('Item not found in saved items');
  }

  item.savedForLater = false;
  item.movedBackAt = new Date();
  return this.save();
};

cartSchema.methods.clearCart = function() {
  this.items = this.items.filter(item => item.savedForLater);
  this.couponCode = null;
  this.appliedCoupon = null;
  return this.save();
};

cartSchema.methods.applyCoupon = async function(couponCode) {
  const Coupon = mongoose.model('Coupon');
  const coupon = await Coupon.findOne({
    code: couponCode.toUpperCase(),
    isActive: true,
    $or: [
      { expiryDate: { $gte: new Date() } },
      { expiryDate: null }
    ]
  });

  if (!coupon) {
    throw new Error('Invalid or expired coupon code');
  }

  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    throw new Error('Coupon usage limit reached');
  }

  const { subtotal } = await this.calculateSubtotal();
  const discountAmount = Math.round((subtotal * coupon.discountPercent / 100) * 100) / 100;

  this.couponCode = coupon.code;
  this.appliedCoupon = {
    code: coupon.code,
    discountPercent: coupon.discountPercent,
    discountAmount
  };

  return { coupon, discountAmount, newTotal: subtotal - discountAmount };
};

cartSchema.methods.removeCoupon = function() {
  this.couponCode = null;
  this.appliedCoupon = null;
  return this.save();
};

cartSchema.statics.getOrCreateCart = async function(userId) {
  let cart = await this.findOne({ userId });
  
  if (!cart) {
    cart = new this({ userId, items: [] });
    await cart.save();
  }

  return cart;
};

cartSchema.statics.mergeGuestCart = async function(userId, guestItems) {
  const cart = await this.getOrCreateCart(userId);

  for (const guestItem of guestItems) {
    const existingItem = cart.items.find(
      item => item.productId.toString() === guestItem.productId.toString()
    );

    if (existingItem) {
      existingItem.quantity = Math.max(existingItem.quantity, guestItem.quantity);
    } else {
      cart.items.push({
        productId: guestItem.productId,
        quantity: guestItem.quantity,
        savedForLater: false,
        addedAt: new Date()
      });
    }
  }

  return cart.save();
};

cartSchema.set('toJSON', { virtuals: true });
cartSchema.set('toObject', { virtuals: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
