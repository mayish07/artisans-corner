// server/models/Review.js
// Review model with verified purchase validation and vendor reply support

const mongoose = require('mongoose');

/**
 * @typedef {Object} ReviewDocument
 * @property {mongoose.Types.ObjectId} productId
 * @property {mongoose.Types.ObjectId} buyerId
 * @property {number} rating
 * @property {string} comment
 * @property {Array<string>} images
 * @property {string} vendorReply
 * @property {Date} vendorReplyAt
 * @property {boolean} isVerifiedPurchase
 * @property {boolean} isApproved
 * @property {boolean} isReported
 * @property {string} reportReason
 * @property {number} helpfulCount
 * @property {Array<{userId: mongoose.Types.ObjectId, createdAt: Date}>} helpfulVotes
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be an integer'
    }
  },
  title: {
    type: String,
    maxlength: [100, 'Review title cannot exceed 100 characters']
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    minlength: [10, 'Review must be at least 10 characters'],
    maxlength: [2000, 'Review cannot exceed 2000 characters']
  },
  images: [{
    type: String
  }],
  vendorReply: {
    type: String,
    maxlength: [500, 'Vendor reply cannot exceed 500 characters']
  },
  vendorReplyAt: Date,
  vendorReplyEditedAt: Date,
  isVerifiedPurchase: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: true
  },
  isReported: {
    type: Boolean,
    default: false
  },
  reportReason: String,
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  helpfulCount: {
    type: Number,
    default: 0
  },
  helpfulVotes: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  qualityScore: {
    type: Number,
    min: 0,
    max: 100
  },
  tags: [{
    type: String,
    enum: ['great_quality', 'fast_shipping', 'well_packaged', 'value_for_money', 'accurate_description', 'excellent_customer_service']
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

reviewSchema.index({ productId: 1, createdAt: -1 });
reviewSchema.index({ buyerId: 1, createdAt: -1 });
reviewSchema.index({ rating: -1, createdAt: -1 });
reviewSchema.index({ isVerifiedPurchase: 1, rating: -1 });

reviewSchema.pre('save', function(next) {
  if (this.isModified('vendorReply') && !this.vendorReplyAt) {
    this.vendorReplyAt = new Date();
  }
  if (this.isModified('vendorReply') && this.vendorReplyAt) {
    this.vendorReplyEditedAt = new Date();
  }
  next();
});

reviewSchema.statics.canReview = async function(userId, productId) {
  const Order = mongoose.model('Order');
  
  const hasPurchased = await Order.findOne({
    buyerId: userId,
    'items.productId': productId,
    orderStatus: { $in: ['delivered', 'shipped', 'confirmed'] },
    paymentStatus: 'paid'
  });

  const hasReviewed = await this.findOne({
    buyerId: userId,
    productId: productId
  });

  return {
    canReview: !!hasPurchased,
    isVerifiedPurchase: !!hasPurchased,
    hasReviewed: !!hasReviewed,
    existingReview: hasReviewed
  };
};

reviewSchema.statics.getProductReviews = async function(productId, options = {}) {
  const {
    page = 1,
    limit = 10,
    sort = 'newest',
    rating,
    verifiedOnly = false
  } = options;

  let query = {
    productId,
    isApproved: true,
    isReported: false
  };

  if (rating) query.rating = parseInt(rating);
  if (verifiedOnly) query.isVerifiedPurchase = true;

  let sortOption = {};
  switch (sort) {
    case 'newest':
      sortOption = { createdAt: -1 };
      break;
    case 'oldest':
      sortOption = { createdAt: 1 };
      break;
    case 'highest':
      sortOption = { rating: -1 };
      break;
    case 'lowest':
      sortOption = { rating: 1 };
      break;
    case 'helpful':
      sortOption = { helpfulCount: -1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  const reviews = await this.find(query)
    .populate('buyerId', 'name avatar')
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await this.countDocuments(query);

  const ratingDistribution = await this.aggregate([
    { $match: { productId: new mongoose.Types.ObjectId(productId), isApproved: true } },
    { $group: { _id: '$rating', count: { $sum: 1 } } },
    { $sort: { _id: -1 } }
  ]);

  return {
    reviews,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    ratingDistribution
  };
};

reviewSchema.methods.markHelpful = async function(userId) {
  const alreadyVoted = this.helpfulVotes.some(
    vote => vote.userId.toString() === userId.toString()
  );

  if (alreadyVoted) {
    this.helpfulVotes = this.helpfulVotes.filter(
      vote => vote.userId.toString() !== userId.toString()
    );
    this.helpfulCount = Math.max(0, this.helpfulCount - 1);
  } else {
    this.helpfulVotes.push({ userId });
    this.helpfulCount += 1;
  }

  return this.save();
};

reviewSchema.methods.vendorReplyToReview = function(reply) {
  if (this.vendorReply) {
    throw new Error('Review already has a vendor reply. Only one reply allowed.');
  }
  this.vendorReply = reply;
  this.vendorReplyAt = new Date();
  return this.save();
};

reviewSchema.statics.getVendorReviewStats = async function(vendorId) {
  const Product = mongoose.model('Product');
  const products = await Product.find({ vendorId, isActive: true }).select('_id');
  const productIds = products.map(p => p._id);

  const stats = await this.aggregate([
    { $match: { productId: { $in: productIds }, isApproved: true } },
    {
      $group: {
        _id: null,
        totalReviews: { $sum: 1 },
        averageRating: { $avg: '$rating' },
        fiveStar: {
          $sum: { $cond: [{ $eq: ['$rating', 5] }, 1, 0] }
        },
        fourStar: {
          $sum: { $cond: [{ $eq: ['$rating', 4] }, 1, 0] }
        },
        threeStar: {
          $sum: { $cond: [{ $eq: ['$rating', 3] }, 1, 0] }
        },
        twoStar: {
          $sum: { $cond: [{ $eq: ['$rating', 2] }, 1, 0] }
        },
        oneStar: {
          $sum: { $cond: [{ $eq: ['$rating', 1] }, 1, 0] }
        },
        verifiedPurchases: {
          $sum: { $cond: ['$isVerifiedPurchase', 1, 0] }
        }
      }
    }
  ]);

  return stats[0] || {
    totalReviews: 0,
    averageRating: 0,
    fiveStar: 0,
    fourStar: 0,
    threeStar: 0,
    twoStar: 0,
    oneStar: 0,
    verifiedPurchases: 0
  };
};

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
