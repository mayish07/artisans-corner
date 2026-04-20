// server/models/Store.js
// Store model for vendor storefronts

const mongoose = require('mongoose');
const slugify = require('slugify');

const storeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Store name is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Store name cannot exceed 100 characters'],
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
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  logo: {
    type: String,
    default: null
  },
  banner: {
    type: String,
    default: null
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Jewelry', 'Pottery', 'Textiles', 'Woodwork', 'Art', 'Candles', 'Leather', 'Other'],
    index: true
  },
  totalRevenue: {
    type: Number,
    default: 0
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  socialLinks: {
    instagram: String,
    etsy: String,
    website: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

storeSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      trim: true
    });
  }
  next();
});

storeSchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug, isActive: true });
};

storeSchema.methods.updateRating = async function() {
  const Product = mongoose.model('Product');
  const products = await Product.find({ store: this._id });
  
  if (products.length > 0) {
    const totalRating = products.reduce((sum, p) => sum + (p.averageRating || 0), 0);
    const validProducts = products.filter(p => p.reviewCount > 0);
    if (validProducts.length > 0) {
      this.rating = totalRating / products.length;
    }
  } else {
    this.rating = 0;
  }
  
  return this.save();
};

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
