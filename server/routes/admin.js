// server/routes/admin.js
// Admin routes

const express = require('express');
const router = express.Router();
const {
  getStats,
  getAllUsers,
  getVendorApplications,
  approveVendor,
  rejectVendor,
  getAllProducts,
  flagProduct,
  unflagProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  getRevenueStats,
  createCoupon,
  getCoupons,
  updateUser
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

router.use(protect);
router.use(adminOnly);

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.put('/users/:userId', updateUser);

router.get('/vendor-applications', getVendorApplications);
router.put('/vendor-applications/:userId/approve', approveVendor);
router.put('/vendor-applications/:userId/reject', rejectVendor);

router.get('/products', getAllProducts);
router.put('/products/:productId/flag', flagProduct);
router.put('/products/:productId/unflag', unflagProduct);
router.delete('/products/:productId', deleteProduct);

router.get('/orders', getAllOrders);
router.put('/orders/:orderId/status', updateOrderStatus);

router.get('/revenue', getRevenueStats);

router.get('/coupons', getCoupons);
router.post('/coupons', createCoupon);

module.exports = router;
