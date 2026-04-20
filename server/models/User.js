// server/models/User.js
// User model with authentication, roles, and vendor store profile

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * @typedef {Object} StoreProfile
 * @property {string} storeName
 * @property {string} bio
 * @property {string} logo
 * @property {string} banner
 * @property {string} storeSlug
 * @property {boolean} approved
 */

/**
 * @typedef {Object} UserDocument
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {'buyer' | 'vendor' | 'admin'} role
 * @property {string} avatar
 * @property {StoreProfile} storeProfile
 * @property {Array<mongoose.Types.ObjectId>} wishlist
 * @property {string} resetPasswordToken
 * @property {Date} resetPasswordExpire
 * @property {string} refreshToken
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters'],
    index: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['buyer', 'vendor', 'admin'],
    default: 'buyer',
    index: true
  },
  avatar: {
    type: String,
    default: null
  },
  storeProfile: {
    storeName: {
      type: String,
      trim: true,
      maxlength: [100, 'Store name cannot exceed 100 characters']
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    logo: String,
    banner: String,
    storeSlug: {
      type: String,
      unique: true,
      sparse: true
    },
    approved: {
      type: Boolean,
      default: false
    },
    socialLinks: {
      instagram: String,
      facebook: String,
      twitter: String,
      website: String
    }
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  addresses: [{
    fullName: String,
    phone: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: String,
    country: { type: String, default: 'United States' },
    isDefault: { type: Boolean, default: false }
  }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  refreshToken: String,
  googleId: String,
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  notificationPreferences: {
    emailOrders: { type: Boolean, default: true },
    emailMarketing: { type: Boolean, default: false },
    pushNotifications: { type: Boolean, default: true }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.index({ role: 1, createdAt: -1 });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre('save', async function(next) {
  if (this.isModified('storeProfile.storeName') && this.storeProfile?.storeName) {
    this.storeProfile.storeSlug = slugify(this.storeProfile.storeName);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_ACCESS_SECRET || 'access-secret-key',
    { expiresIn: process.env.JWT_ACCESS_EXPIRE || '15m' }
  );
};

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
  );
};

userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const User = mongoose.model('User', userSchema);

module.exports = User;
