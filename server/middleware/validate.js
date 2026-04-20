// server/middleware/validate.js
// Input validation middleware using express-validator

const { body, param, query, validationResult } = require('express-validator');

/**
 * Handle validation errors from express-validator
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg,
      value: err.value
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors
    });
  }
  next();
};

/**
 * Sanitize string input - trim and remove dangerous characters
 * @param {string} field
 * @returns {ChainableDecorator}
 */
const sanitizeString = (field) => {
  return body(field)
    .trim()
    .escape()
    .customSanitizer(value => {
      if (typeof value === 'string') {
        return value.replace(/<[^>]*>/g, '');
      }
      return value;
    });
};

const authValidation = {
  register: [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
      .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
      .matches(/[0-9]/).withMessage('Password must contain a number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character'),
    body('confirmPassword')
      .notEmpty().withMessage('Please confirm your password')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords do not match'),
    handleValidationErrors
  ],

  login: [
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Password is required'),
    handleValidationErrors
  ],

  forgotPassword: [
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format')
      .normalizeEmail(),
    handleValidationErrors
  ],

  resetPassword: [
    body('resetToken')
      .notEmpty().withMessage('Reset token is required'),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
      .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
      .matches(/[0-9]/).withMessage('Password must contain a number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character'),
    body('confirmPassword')
      .notEmpty().withMessage('Please confirm your password')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords do not match'),
    handleValidationErrors
  ],

  changePassword: [
    body('currentPassword')
      .notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .notEmpty().withMessage('New password is required')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
      .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
      .matches(/[0-9]/).withMessage('Password must contain a number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character')
      .custom((value, { req }) => value !== req.body.currentPassword)
      .withMessage('New password must be different from current password'),
    body('confirmPassword')
      .notEmpty().withMessage('Please confirm your password')
      .custom((value, { req }) => value === req.body.newPassword)
      .withMessage('Passwords do not match'),
    handleValidationErrors
  ]
};

const productValidation = {
  create: [
    body('title')
      .trim()
      .notEmpty().withMessage('Product title is required')
      .isLength({ min: 3, max: 200 }).withMessage('Title must be 3-200 characters'),
    body('description')
      .trim()
      .notEmpty().withMessage('Description is required')
      .isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
    body('price')
      .notEmpty().withMessage('Price is required')
      .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category')
      .trim()
      .notEmpty().withMessage('Category is required'),
    body('stock')
      .notEmpty().withMessage('Stock is required')
      .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('images')
      .isArray({ min: 1 }).withMessage('At least one image is required'),
    handleValidationErrors
  ],

  update: [
    body('title')
      .optional()
      .trim()
      .isLength({ min: 3, max: 200 }).withMessage('Title must be 3-200 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
    body('price')
      .optional()
      .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('stock')
      .optional()
      .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    handleValidationErrors
  ]
};

const orderValidation = {
  create: [
    body('shippingAddress.fullName')
      .trim()
      .notEmpty().withMessage('Full name is required'),
    body('shippingAddress.phone')
      .trim()
      .notEmpty().withMessage('Phone number is required')
      .matches(/^[+]?[\d\s-]{10,}$/).withMessage('Invalid phone number format'),
    body('shippingAddress.line1')
      .trim()
      .notEmpty().withMessage('Address line 1 is required'),
    body('shippingAddress.city')
      .trim()
      .notEmpty().withMessage('City is required'),
    body('shippingAddress.state')
      .trim()
      .notEmpty().withMessage('State is required'),
    body('shippingAddress.zip')
      .trim()
      .notEmpty().withMessage('ZIP code is required'),
    body('shippingAddress.country')
      .optional()
      .trim(),
    handleValidationErrors
  ],

  updateStatus: [
    body('orderStatus')
      .notEmpty().withMessage('Order status is required')
      .isIn(['processing', 'confirmed', 'shipped', 'delivered', 'cancelled'])
      .withMessage('Invalid order status'),
    body('trackingNumber')
      .optional()
      .trim(),
    body('note')
      .optional()
      .trim()
      .isLength({ max: 500 }).withMessage('Note cannot exceed 500 characters'),
    handleValidationErrors
  ]
};

const reviewValidation = {
  create: [
    body('productId')
      .notEmpty().withMessage('Product ID is required')
      .isMongoId().withMessage('Invalid product ID'),
    body('rating')
      .notEmpty().withMessage('Rating is required')
      .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment')
      .trim()
      .notEmpty().withMessage('Review comment is required')
      .isLength({ min: 10, max: 2000 }).withMessage('Comment must be 10-2000 characters'),
    body('title')
      .optional()
      .trim()
      .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
    handleValidationErrors
  ],

  vendorReply: [
    body('reply')
      .trim()
      .notEmpty().withMessage('Reply is required')
      .isLength({ max: 500 }).withMessage('Reply cannot exceed 500 characters'),
    handleValidationErrors
  ]
};

const cartValidation = {
  addItem: [
    body('productId')
      .notEmpty().withMessage('Product ID is required')
      .isMongoId().withMessage('Invalid product ID'),
    body('quantity')
      .optional()
      .isInt({ min: 1, max: 99 }).withMessage('Quantity must be between 1 and 99'),
    handleValidationErrors
  ],

  updateQuantity: [
    body('quantity')
      .notEmpty().withMessage('Quantity is required')
      .isInt({ min: 1, max: 99 }).withMessage('Quantity must be between 1 and 99'),
    handleValidationErrors
  ]
};

const userValidation = {
  updateProfile: [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
    body('phone')
      .optional()
      .trim()
      .matches(/^[+]?[\d\s-]{10,}$/).withMessage('Invalid phone number format'),
    handleValidationErrors
  ],

  becomeSeller: [
    body('storeName')
      .trim()
      .notEmpty().withMessage('Store name is required')
      .isLength({ min: 3, max: 100 }).withMessage('Store name must be 3-100 characters'),
    body('bio')
      .optional()
      .trim()
      .isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),
    handleValidationErrors
  ]
};

const queryValidation = {
  pagination: [
    query('page')
      .optional()
      .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('sort')
      .optional()
      .isIn(['newest', 'oldest', 'price-low', 'price-high', 'top-rated', 'popular'])
      .withMessage('Invalid sort option'),
    handleValidationErrors
  ],

  search: [
    query('q')
      .optional()
      .trim()
      .isLength({ max: 200 }).withMessage('Search query too long'),
    query('category')
      .optional()
      .trim(),
    query('minPrice')
      .optional()
      .isFloat({ min: 0 }).withMessage('Minimum price must be positive'),
    query('maxPrice')
      .optional()
      .isFloat({ min: 0 }).withMessage('Maximum price must be positive'),
    handleValidationErrors
  ]
};

const mongoIdValidation = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  sanitizeString,
  authValidation,
  productValidation,
  orderValidation,
  reviewValidation,
  cartValidation,
  userValidation,
  queryValidation,
  mongoIdValidation
};
