// server/middleware/auth.js
// JWT authentication middleware and role-based access control

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @typedef {Object} AuthRequest
 * @extends express.Request
 * @property {User} user
 * @property {string} accessToken
 */

/**
 * Protect routes - verify JWT and attach user to request
 * @param {AuthRequest} req
 * @param {Response} res
 * @param {Function} next
 */
const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - no token provided'
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || 'access-secret-key'
    );

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated'
      });
    }

    req.user = user;
    req.accessToken = token;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
        code: 'TOKEN_EXPIRED'
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
};

/**
 * Optional auth - attach user if token present, but don't require it
 * @param {AuthRequest} req
 * @param {Response} res
 * @param {Function} next
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (token) {
      const decoded = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET || 'access-secret-key'
      );
      const user = await User.findById(decoded.id).select('-password');
      if (user && user.isActive) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    next();
  }
};

/**
 * Role-based access control middleware factory
 * @param {...string} allowedRoles - Roles that can access the route
 * @returns {Function} Express middleware
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - please login first'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied - ${req.user.role} role is not authorized for this action`
      });
    }

    next();
  };
};

/**
 * Vendor-specific authorization
 */
const vendorOnly = authorize('vendor', 'admin');

/**
 * Admin-only authorization
 */
const adminOnly = authorize('admin');

/**
 * Buyer or authenticated user authorization
 */
const buyerOrAbove = authorize('buyer', 'vendor', 'admin');

/**
 * Verify refresh token and generate new access token
 * @param {AuthRequest} req
 * @param {Response} res
 */
const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token required'
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'refresh-secret-key'
    );

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    const newAccessToken = user.generateAccessToken();

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired refresh token'
    });
  }
};

/**
 * Verify admin for admin-only routes
 */
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }
  next();
};

/**
 * Verify vendor approval status
 */
const verifyVendorApproved = (req, res, next) => {
  if (req.user.role === 'vendor' && !req.user.storeProfile?.approved) {
    return res.status(403).json({
      success: false,
      message: 'Vendor account pending approval',
      code: 'VENDOR_PENDING_APPROVAL'
    });
  }
  next();
};

/**
 * Double-check vendor can perform actions on their own resources
 * @param {string} resourceUserIdPath - Path to user ID in request body/params
 */
const verifyResourceOwnership = (resourceUserIdPath) => {
  return (req, res, next) => {
    const resourceUserId = req.body[resourceUserIdPath] || req.params[resourceUserIdPath];

    if (req.user.role === 'admin') {
      return next();
    }

    if (req.user._id.toString() !== resourceUserId?.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only manage your own resources'
      });
    }

    next();
  };
};

module.exports = {
  protect,
  optionalAuth,
  authorize,
  vendorOnly,
  adminOnly,
  buyerOrAbove,
  refreshAccessToken,
  verifyAdmin,
  verifyVendorApproved,
  verifyResourceOwnership
};
