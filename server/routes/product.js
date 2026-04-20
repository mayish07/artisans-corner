// server/routes/product.js
// Product routes

const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getCategories,
  getFeaturedProducts
} = require('../controllers/productController');
const { protect, authorize, vendorOnly } = require('../middleware/auth');
const { productValidation } = require('../middleware/validate');
const { searchLimiter } = require('../middleware/rateLimiter');

router.get('/categories', getCategories);
router.get('/featured', getFeaturedProducts);
router.get('/vendor/my-products', protect, vendorOnly, getMyProducts);
router.get('/', searchLimiter, getProducts);
router.get('/:idOrSlug', getProduct);

router.post('/', protect, vendorOnly, productValidation.create, createProduct);
router.put('/:id', protect, vendorOnly, productValidation.update, updateProduct);
router.delete('/:id', protect, vendorOnly, deleteProduct);

module.exports = router;
