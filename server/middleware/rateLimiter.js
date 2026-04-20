// server/middleware/rateLimiter.js
// Rate limiting middleware for API protection

const rateLimit = require('express-rate-limit');

/**
 * General API rate limiter
 * 100 requests per 15 minutes per IP
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  }
});

/**
 * Strict limiter for authentication routes
 * 5 requests per 15 minutes per IP
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  keyGenerator: (req) => {
    return req.ip + '-' + (req.body?.email || 'unknown');
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  }
});

/**
 * Login specific rate limiter
 * 5 attempts per 15 minutes per IP/email
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'Too many login attempts. Account locked for 15 minutes.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip + '-' + (req.body?.email || 'unknown');
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  }
});

/**
 * Registration rate limiter
 * 3 registrations per hour per IP
 */
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: 'Too many registration attempts. Please try again after an hour.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  }
});

/**
 * Password reset rate limiter
 * 3 requests per hour per IP/email
 */
const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: 'Too many password reset requests. Please try again after an hour.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip + '-' + (req.body?.email || req.query?.email || 'unknown');
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  }
});

/**
 * Order creation rate limiter
 * 10 orders per hour per user
 */
const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many order attempts. Please slow down.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user ? req.user._id.toString() : req.ip;
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  }
});

/**
 * Review submission rate limiter
 * 5 reviews per day per user
 */
const reviewLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many review submissions. Daily limit reached.',
    retryAfter: '24 hours'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user ? req.user._id.toString() : req.ip;
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  }
});

/**
 * Search rate limiter
 * 30 searches per minute per IP
 */
const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: 'Too many search requests. Please slow down.',
    retryAfter: '1 minute'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  }
});

/**
 * Image upload rate limiter
 * 20 uploads per minute per user
 */
const uploadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: 'Too many upload requests. Please slow down.',
    retryAfter: '1 minute'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user ? req.user._id.toString() : req.ip;
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  }
});

/**
 * API burst limiter - stricter for short bursts
 * 10 requests per minute per IP
 */
const burstLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many requests. Please wait before making more requests.',
    retryAfter: '1 minute'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  }
});

module.exports = {
  apiLimiter,
  authLimiter,
  loginLimiter,
  registerLimiter,
  passwordResetLimiter,
  orderLimiter,
  reviewLimiter,
  searchLimiter,
  uploadLimiter,
  burstLimiter
};
