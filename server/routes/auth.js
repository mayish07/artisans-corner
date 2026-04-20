// server/routes/auth.js
// Authentication routes

const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
  refreshTokenHandler
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter, loginLimiter, registerLimiter, passwordResetLimiter } = require('../middleware/rateLimiter');
const { authValidation } = require('../middleware/validate');

router.post('/register', registerLimiter, authValidation.register, register);
router.post('/login', loginLimiter, authValidation.login, login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.post('/refresh', refreshTokenHandler);
router.put('/profile', protect, updateProfile);
router.post('/change-password', protect, changePassword);

router.post('/forgot-password', passwordResetLimiter, authValidation.forgotPassword, forgotPassword);
router.post('/reset-password/:resetToken', passwordResetLimiter, authValidation.resetPassword, resetPassword);

module.exports = router;
