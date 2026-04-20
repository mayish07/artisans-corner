// server/routes/user.js
// User routes

const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  becomeSeller,
  updateStoreProfile,
  getVendorStore,
  addToWishlist,
  removeFromWishlist,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress
} = require('../controllers/userController');
const { protect, authorize, vendorOnly } = require('../middleware/auth');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/become-seller', protect, becomeSeller);
router.put('/store', protect, vendorOnly, updateStoreProfile);
router.get('/store/:storeSlug', getVendorStore);

router.get('/wishlist', protect, getProfile);
router.post('/wishlist/:productId', protect, addToWishlist);
router.delete('/wishlist/:productId', protect, removeFromWishlist);

router.get('/addresses', protect, getAddresses);
router.post('/addresses', protect, addAddress);
router.put('/addresses/:addressId', protect, updateAddress);
router.delete('/addresses/:addressId', protect, deleteAddress);

module.exports = router;
