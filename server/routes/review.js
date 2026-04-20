// server/routes/review.js
// Review routes

const express = require('express');
const router = express.Router();
const {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  replyToReview,
  getMyReviews
} = require('../controllers/reviewController');
const { protect, authorize, vendorOnly } = require('../middleware/auth');
const { reviewValidation } = require('../middleware/validate');
const { reviewLimiter } = require('../middleware/rateLimiter');

router.get('/product/:productId', getProductReviews);
router.get('/my-reviews', protect, getMyReviews);
router.post('/', protect, reviewLimiter, reviewValidation.create, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
router.post('/:id/reply', protect, vendorOnly, reviewValidation.vendorReply, replyToReview);

module.exports = router;
