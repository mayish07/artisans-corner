// server/controllers/reviewController.js
// Review controller - handles product reviews and ratings

const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { ApiError } = require('../middleware/errorHandler');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @desc    Get reviews for a product
 * @route   GET /api/reviews/product/:productId
 * @access  Public
 */
const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { page = 1, limit = 10, sort = 'newest' } = req.query;

  const query = { productId, isHidden: { $ne: true } };

  let sortOption = {};
  switch (sort) {
    case 'newest': sortOption = { createdAt: -1 }; break;
    case 'oldest': sortOption = { createdAt: 1 }; break;
    case 'highest': sortOption = { rating: -1 }; break;
    case 'lowest': sortOption = { rating: 1 }; break;
    default: sortOption = { createdAt: -1 };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [reviews, total] = await Promise.all([
    Review.find(query)
      .populate('buyerId', 'name avatar')
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit)),
    Review.countDocuments(query)
  ]);

  const ratingDistribution = await Review.aggregate([
    { $match: { productId: productId, isHidden: { $ne: true } } },
    { $group: { _id: '$rating', count: { $sum: 1 } } }
  ]);

  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  ratingDistribution.forEach(d => {
    distribution[d._id] = d.count;
  });

  res.json({
    success: true,
    data: {
      reviews,
      distribution,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalReviews: total
      }
    }
  });
});

/**
 * @desc    Create a review (verified purchase only)
 * @route   POST /api/reviews
 * @access  Private
 */
const createReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment, title } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  const existingReview = await Review.findOne({
    productId,
    buyerId: req.user._id
  });

  if (existingReview) {
    throw ApiError.conflict('You have already reviewed this product');
  }

  const completedOrder = await Order.findOne({
    buyerId: req.user._id,
    'items.productId': productId,
    orderStatus: { $in: ['delivered', 'shipped', 'processing'] }
  });

  const isVerifiedPurchase = !!completedOrder;

  const review = await Review.create({
    productId,
    buyerId: req.user._id,
    rating,
    comment,
    title,
    isVerifiedPurchase
  });

  await Product.findByIdAndUpdate(productId, {
    $push: { ratings: review._id }
  });

  await product.updateRating();

  const populatedReview = await Review.findById(review._id)
    .populate('buyerId', 'name avatar');

  res.status(201).json({
    success: true,
    message: 'Review submitted successfully',
    data: { review: populatedReview }
  });
});

/**
 * @desc    Update own review
 * @route   PUT /api/reviews/:id
 * @access  Private
 */
const updateReview = asyncHandler(async (req, res) => {
  const { rating, comment, title } = req.body;

  const review = await Review.findById(req.params.id);

  if (!review) {
    throw ApiError.notFound('Review not found');
  }

  if (review.buyerId.toString() !== req.user._id.toString()) {
    throw ApiError.forbidden('You can only update your own reviews');
  }

  if (rating) review.rating = rating;
  if (comment) review.comment = comment;
  if (title !== undefined) review.title = title;

  await review.save();

  await Product.findByIdAndUpdate(review.productId, {}).then(async (product) => {
    if (product) await product.updateRating();
  });

  const populatedReview = await Review.findById(review._id)
    .populate('buyerId', 'name avatar');

  res.json({
    success: true,
    message: 'Review updated',
    data: { review: populatedReview }
  });
});

/**
 * @desc    Delete own review
 * @route   DELETE /api/reviews/:id
 * @access  Private
 */
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw ApiError.notFound('Review not found');
  }

  if (review.buyerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw ApiError.forbidden('You can only delete your own reviews');
  }

  await Product.findByIdAndUpdate(review.productId, {
    $pull: { ratings: review._id }
  });

  await review.deleteOne();

  const product = await Product.findById(review.productId);
  if (product) await product.updateRating();

  res.json({
    success: true,
    message: 'Review deleted'
  });
});

/**
 * @desc    Vendor reply to review
 * @route   POST /api/reviews/:id/reply
 * @access  Private/Vendor
 */
const replyToReview = asyncHandler(async (req, res) => {
  const { reply } = req.body;

  const review = await Review.findById(req.params.id);

  if (!review) {
    throw ApiError.notFound('Review not found');
  }

  const product = await Product.findById(review.productId);

  if (!product || product.vendorId.toString() !== req.user._id.toString()) {
    throw ApiError.forbidden('You can only reply to reviews on your products');
  }

  if (review.vendorReply) {
    throw ApiError.conflict('You have already replied to this review');
  }

  review.vendorReply = reply;
  review.vendorReplyAt = new Date();
  await review.save();

  res.json({
    success: true,
    message: 'Reply submitted',
    data: { review }
  });
});

/**
 * @desc    Get user's reviews
 * @route   GET /api/reviews/my-reviews
 * @access  Private
 */
const getMyReviews = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const [reviews, total] = await Promise.all([
    Review.find({ buyerId: req.user._id })
      .populate('productId', 'title slug images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Review.countDocuments({ buyerId: req.user._id })
  ]);

  res.json({
    success: true,
    data: {
      reviews,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalReviews: total
      }
    }
  });
});

module.exports = {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  replyToReview,
  getMyReviews
};
