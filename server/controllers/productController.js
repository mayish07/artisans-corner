// server/controllers/productController.js
// Product controller - handles product CRUD operations for vendors

const Product = require('../models/Product');
const { ApiError } = require('../middleware/errorHandler');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @desc    Get all products with filtering, searching, and pagination
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    search,
    category,
    subcategory,
    minPrice,
    maxPrice,
    minRating,
    vendorId,
    sort = 'newest',
    featured
  } = req.query;

  const query = {
    isActive: true,
    isFlagged: false
  };

  if (search) {
    query.$text = { $search: search };
  }
  if (category) query.category = category;
  if (subcategory) query.subcategory = subcategory;
  if (vendorId) query.vendorId = vendorId;
  if (featured === 'true') query.isFeatured = true;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (minRating) query.avgRating = { $gte: Number(minRating) };

  let sortOption = {};
  switch (sort) {
    case 'newest': sortOption = { createdAt: -1 }; break;
    case 'oldest': sortOption = { createdAt: 1 }; break;
    case 'price-low': sortOption = { price: 1 }; break;
    case 'price-high': sortOption = { price: -1 }; break;
    case 'top-rated': sortOption = { avgRating: -1 }; break;
    case 'popular': sortOption = { salesCount: -1 }; break;
    default: sortOption = { createdAt: -1 };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate('vendorId', 'name storeProfile.storeName storeProfile.logo')
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit)),
    Product.countDocuments(query)
  ]);

  res.json({
    success: true,
    data: {
      products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalProducts: total,
        hasMore: skip + products.length < total
      }
    }
  });
});

/**
 * @desc    Get single product by ID or slug
 * @route   GET /api/products/:idOrSlug
 * @access  Public
 */
const getProduct = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  let product;
  if (idOrSlug.match(/^[0-9a-fA-F]{24}$/) && idOrSlug.length === 24) {
    product = await Product.findById(idOrSlug);
  } else {
    product = await Product.findOne({ slug: idOrSlug });
  }

  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  if (product.isFlagged) {
    throw ApiError.notFound('Product not available');
  }

  await product.incrementViews();

  const relatedProducts = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
    isActive: true,
    isFlagged: false
  })
    .populate('vendorId', 'name storeProfile.storeName')
    .limit(4)
    .select('title slug images price avgRating');

  res.json({
    success: true,
    data: {
      product,
      relatedProducts
    }
  });
});

/**
 * @desc    Create new product (vendor only)
 * @route   POST /api/products
 * @access  Private/Vendor
 */
const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    comparePrice,
    images,
    category,
    subcategory,
    stock,
    tags,
    specifications,
    materials,
    processingTime,
    shippingInfo
  } = req.body;

  const product = await Product.create({
    title,
    description,
    price,
    comparePrice,
    images,
    category,
    subcategory,
    stock,
    tags,
    specifications,
    materials,
    processingTime,
    shippingInfo,
    vendorId: req.user._id
  });

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: { product }
  });
});

/**
 * @desc    Update product (vendor only, own products)
 * @route   PUT /api/products/:id
 * @access  Private/Vendor
 */
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  if (product.vendorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw ApiError.forbidden('You can only update your own products');
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    message: 'Product updated successfully',
    data: { product: updatedProduct }
  });
});

/**
 * @desc    Delete product (vendor only, own products)
 * @route   DELETE /api/products/:id
 * @access  Private/Vendor
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  if (product.vendorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw ApiError.forbidden('You can only delete your own products');
  }

  await Product.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Product deleted successfully'
  });
});

/**
 * @desc    Get vendor's own products
 * @route   GET /api/products/vendor/my-products
 * @access  Private/Vendor
 */
const getMyProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;

  const query = { vendorId: req.user._id };
  if (status === 'active') query.isActive = true;
  if (status === 'inactive') query.isActive = false;
  if (status === 'flagged') query.isFlagged = true;

  const skip = (Number(page) - 1) * Number(limit);

  const [products, total] = await Promise.all([
    Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Product.countDocuments(query)
  ]);

  res.json({
    success: true,
    data: {
      products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalProducts: total
      }
    }
  });
});

/**
 * @desc    Get all categories with counts
 * @route   GET /api/products/categories
 * @access  Public
 */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.aggregate([
    { $match: { isActive: true, isFlagged: false } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  const categoryList = categories.map(c => ({
    name: c._id,
    count: c.count
  }));

  res.json({
    success: true,
    data: { categories: categoryList }
  });
});

/**
 * @desc    Get featured products
 * @route   GET /api/products/featured
 * @access  Public
 */
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    isFeatured: true,
    isActive: true,
    isFlagged: false
  })
    .populate('vendorId', 'name storeProfile.storeName')
    .limit(8)
    .select('title slug images price avgRating totalReviews');

  res.json({
    success: true,
    data: { products }
  });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getCategories,
  getFeaturedProducts
};
