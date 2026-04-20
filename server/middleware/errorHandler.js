// server/middleware/errorHandler.js
// Centralized error handling middleware

/**
 * Custom API Error class
 */
class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad Request', details = null) {
    return new ApiError(400, message, details);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(403, message);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message);
  }

  static conflict(message = 'Conflict') {
    return new ApiError(409, message);
  }

  static tooManyRequests(message = 'Too many requests') {
    return new ApiError(429, message);
  }

  static internal(message = 'Internal server error') {
    return new ApiError(500, message);
  }

  static validationError(errors) {
    return new ApiError(400, 'Validation failed', errors);
  }
}

/**
 * Not Found Error Handler - catches 404 errors
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const notFoundHandler = (req, res, next) => {
  const error = new ApiError(
    404,
    `Route not found: ${req.originalUrl}`,
    { path: req.originalUrl, method: req.method }
  );
  next(error);
};

/**
 * Global error handler middleware
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;

  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });

  if (err.name === 'CastError') {
    error = new ApiError(400, `Invalid ${err.path}: ${err.value}`);
  }

  if (err.name === 'ValidationError' && err.errors) {
    const errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
    error = new ApiError(400, 'Validation failed', errors);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    error = new ApiError(400, `Duplicate field value: ${field} already exists`);
  }

  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      error = new ApiError(400, 'File size too large. Maximum allowed is 10MB');
    } else if (err.code === 'LIMIT_FILE_COUNT') {
      error = new ApiError(400, 'Too many files uploaded');
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      error = new ApiError(400, 'Unexpected file field');
    } else {
      error = new ApiError(400, `File upload error: ${err.message}`);
    }
  }

  if (err.name === 'MongoServerError' && err.code === 112) {
    error = new ApiError(503, 'Database write conflict. Please retry');
  }

  if (err.name === 'BSONError') {
    error = new ApiError(400, 'Invalid data format');
  }

  const response = {
    success: false,
    message: error.message || 'Server Error',
    ...(error.details && { errors: error.details }),
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      originalError: err.message
    })
  };

  if (err.name === 'ValidationError' && !err.errors && err.message) {
    response.message = err.message;
  }

  res.status(error.statusCode).json(response);
};

/**
 * Async handler wrapper to avoid try-catch blocks
 * @param {Function} fn
 * @returns {Function} Express middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Development error response - includes stack trace
 * @param {Error} err
 * @param {Response} res
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err,
    stack: err.stack
  });
};

/**
 * Production error response - hides stack trace
 * @param {Error} err
 * @param {Response} res
 */
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.details && { errors: err.details })
    });
  } else {
    console.error('Programming Error:', err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
};

/**
 * Handle unhandled promise rejections
 */
const handleUnhandledRejection = (server) => {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    
    console.log('Shutting down server due to unhandled rejection...');
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  });
};

/**
 * Handle uncaught exceptions
 */
const handleUncaughtException = () => {
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    console.log('Shutting down server due to uncaught exception...');
    process.exit(1);
  });
};

/**
 * Graceful shutdown handler
 * @param {Server} server
 */
const gracefulShutdown = (server) => {
  process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
};

module.exports = {
  ApiError,
  notFoundHandler,
  globalErrorHandler,
  asyncHandler,
  sendErrorDev,
  sendErrorProd,
  handleUnhandledRejection,
  handleUncaughtException,
  gracefulShutdown
};
