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

// Demo seed endpoint - call once to create demo user
router.get('/seed-demo', async (req, res) => {
  try {
    const User = require('../models/User');
    const bcrypt = require('bcryptjs');
    
    const existingUser = await User.findOne({ email: 'demo@demo.com' });
    if (existingUser) {
      return res.json({ success: true, message: 'Demo user already exists' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('demo123', salt);
    
    const demoUser = new User({
      name: 'Demo User',
      email: 'demo@demo.com',
      password: hashedPassword,
      role: 'buyer',
      isActive: true,
    });
    
    await demoUser.save();
    
    res.json({ success: true, message: 'Demo user created! Login with demo@demo.com / demo123' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
