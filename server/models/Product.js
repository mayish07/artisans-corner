// server/models/Product.js
// Product model with multi-image support, categories, and vendor association

const mongoose = require('mongoose');
const slugify = require('slugify');

/**
 * @typedef {Object} ProductDocument
 * @property {string} title
 * @property {string} slug
 * @property {string} description
 * @property {number} price
 * @property {number} comparePrice
 * @property {Array<string>} images
 * @property {string} category
 * @property {string} subcategory
 * @property {number} stock
 * @property {mongoose.Types.ObjectId} vendorId
 * @property {Array<mongoose.Types.ObjectId>} ratings
 * @property {number} avgRating
 * @property {number} totalReviews
 * @property {boolean} isFeatured
 * @property {boolean} isActive
 * @property {boolean} isFlagged
 * @property {string} flagReason
 * @property {Object} specifications
 * @property {Array<string>} tags
 * @property {number} views
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [200, 'Title cannot exceed 200 characters'],
    index: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    minlength: [20, 'Description must be at least 20 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
    index: true
  },
  comparePrice: {
    type: Number,
    min: [0, 'Compare price cannot be negative']
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: [true, 'Category is required'],
    index: true
  },
  subcategory: {
    type: String,
    index: true
  },
  stock: {
    type: Number,
    required: true,
    min: [0, 'Stock cannot be negative'],
    default: 0,
    index: true
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
    index: true
  },
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  avgRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    index: true
  },
  totalReviews: {
    type: Number,
    default: 0,
    min: 0
  },
  isFeatured: {
    type: Boolean,
    default: false,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  isFlagged: {
    type: Boolean,
    default: false,
    index: true
  },
  flagReason: {
    type: String
  },
  specifications: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    weight: Number
  },
  materials: [{
    type: String,
    trim: true
  }],
  processingTime: {
    type: String,
    default: '3-5 business days'
  },
  shippingInfo: {
    freeShipping: { type: Boolean, default: false },
    domesticShipping: Number,
    internationalShipping: Number
  },
  views: {
    type: Number,
    default: 0
  },
  salesCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

productSchema.index({ title: 'text', description: 'text', tags: 'text' });
productSchema.index({ price: 1, avgRating: -1 });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ vendorId: 1, createdAt: -1 });
productSchema.index({ isFeatured: 1, isActive: 1 });

productSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true
    });
  }
  next();
});

productSchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug, isActive: true, isFlagged: false });
};

productSchema.statics.searchProducts = function(query, options = {}) {
  const {
    category,
    subcategory,
    minPrice,
    maxPrice,
    minRating,
    vendorId,
    sort = 'newest',
    page = 1,
    limit = 20
  } = options;

  let searchQuery = {
    isActive: true,
    isFlagged: false
  };

  if (query) {
    searchQuery.$text = { $search: query };
  }
  if (category) searchQuery.category = category;
  if (subcategory) searchQuery.subcategory = subcategory;
  if (vendorId) searchQuery.vendorId = vendorId;
  if (minPrice || maxPrice) {
    searchQuery.price = {};
    if (minPrice) searchQuery.price.$gte = minPrice;
    if (maxPrice) searchQuery.price.$lte = maxPrice;
  }
  if (minRating) searchQuery.avgRating = { $gte: minRating };

  let sortOption = {};
  switch (sort) {
    case 'newest':
      sortOption = { createdAt: -1 };
      break;
    case 'price-low':
      sortOption = { price: 1 };
      break;
    case 'price-high':
      sortOption = { price: -1 };
      break;
    case 'top-rated':
      sortOption = { avgRating: -1 };
      break;
    case 'popular':
      sortOption = { salesCount: -1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  return this.find(searchQuery)
    .populate('vendorId', 'name storeProfile storeProfile.storeName')
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(limit);
};

productSchema.methods.incrementViews = async function() {
  try {
    this.views += 1;
    return await this.save();
  } catch (error) {
    console.error('Error incrementing views:', error);
    return null;
  }
};

productSchema.methods.updateRating = async function() {
  const Review = mongoose.model('Review');
  const reviews = await Review.find({ productId: this._id, isVerifiedPurchase: true });
  
  if (reviews.length > 0) {
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    this.avgRating = total / reviews.length;
    this.totalReviews = reviews.length;
  } else {
    this.avgRating = 0;
    this.totalReviews = 0;
  }
  
  return this.save();
};

productSchema.virtual('isOutOfStock').get(function() {
  return this.stock <= 0;
});

productSchema.virtual('isLowStock').get(function() {
  return this.stock > 0 && this.stock <= 5;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
