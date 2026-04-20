// server/routes/cart.js
// Cart routes

const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  saveForLater,
  moveToCart,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');
const { cartValidation } = require('../middleware/validate');

router.get('/', protect, getCart);
router.post('/', protect, cartValidation.addItem, addToCart);
router.put('/:itemId', protect, cartValidation.updateQuantity, updateCartItem);
router.delete('/:itemId', protect, removeFromCart);
router.put('/:itemId/save-for-later', protect, saveForLater);
router.put('/:itemId/move-to-cart', protect, moveToCart);
router.delete('/', protect, clearCart);

module.exports = router;
