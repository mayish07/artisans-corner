// server/models/ProductQA.js
// Product Q&A model for customer questions

const mongoose = require('mongoose');

const productQASchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true,
    maxlength: [500, 'Question cannot exceed 500 characters']
  },
  answer: {
    type: String,
    maxlength: [1000, 'Answer cannot exceed 1000 characters']
  },
  answeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  answeredAt: Date,
  isApproved: {
    type: Boolean,
    default: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  helpful: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

productQASchema.index({ productId: 1, createdAt: -1 });

const ProductQA = mongoose.model('ProductQA', productQASchema);

module.exports = ProductQA;