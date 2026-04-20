// server/controllers/cartController.js
// Cart controller - handles shopping cart operations

const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { ApiError } = require('../middleware/errorHandler');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @desc    Get user's cart
 * @route   GET /api/cart
 * @access  Private
 */
const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user._id })
    .populate('items.productId', 'title slug images price avgRating stock isActive');

  if (!cart) {
    cart = await Cart.create({ userId: req.user._id, items: [] });
  }

  const validItems = cart.items.filter(item => item.productId !== null);
  const invalidItems = cart.items.filter(item => item.productId === null);

  if (invalidItems.length > 0) {
    cart.items = validItems;
    await cart.save();
  }

  const cartItems = validItems.map(item => ({
    _id: item._id,
    productId: item.productId?._id,
    title: item.productId?.title,
    slug: item.productId?.slug,
    image: item.productId?.images?.[0] || '/placeholder.jpg',
    price: item.productId?.price || 0,
    quantity: item.quantity,
    inStock: item.productId?.stock >= item.quantity,
    stock: item.productId?.stock || 0,
    savedForLater: item.savedForLater,
    subtotal: (item.productId?.price || 0) * item.quantity
  }));

  const subtotal = cartItems
    .filter(i => !i.savedForLater)
    .reduce((sum, item) => sum + item.subtotal, 0);

  res.json({
    success: true,
    data: {
      items: cartItems,
      itemCount: cartItems.filter(i => !i.savedForLater).length,
      subtotal,
      savedForLaterCount: cartItems.filter(i => i.savedForLater).length
    }
  });
});

/**
 * @desc    Add item to cart
 * @route   POST /api/cart
 * @access  Private
 */
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  if (!product.isActive || product.isFlagged) {
    throw ApiError.badRequest('Product is not available');
  }

  if (product.stock < quantity) {
    throw ApiError.badRequest(`Only ${product.stock} items in stock`);
  }

  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      userId: req.user._id,
      items: [{ productId, quantity, savedForLater: false }]
    });
  } else {
    const existingItem = cart.items.find(
      item => item.productId.toString() === productId && !item.savedForLater
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) {
        throw ApiError.badRequest(`Only ${product.stock} items in stock`);
      }
      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({ productId, quantity, savedForLater: false });
    }

    await cart.save();
  }

  res.json({
    success: true,
    message: 'Item added to cart',
    data: { cart }
  });
});

/**
 * @desc    Update item quantity in cart
 * @route   PUT /api/cart/:itemId
 * @access  Private
 */
const updateCartItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    throw ApiError.notFound('Cart not found');
  }

  const item = cart.items.id(itemId);

  if (!item) {
    throw ApiError.notFound('Item not found in cart');
  }

  if (item.savedForLater) {
    throw ApiError.badRequest('Item is saved for later');
  }

  const product = await Product.findById(item.productId);

  if (!product || !product.isActive || product.isFlagged) {
    throw ApiError.badRequest('Product is no longer available');
  }

  if (quantity > product.stock) {
    throw ApiError.badRequest(`Only ${product.stock} items in stock`);
  }

  item.quantity = quantity;
  await cart.save();

  res.json({
    success: true,
    message: 'Cart updated',
    data: { cart }
  });
});

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:itemId
 * @access  Private
 */
const removeFromCart = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    throw ApiError.notFound('Cart not found');
  }

  cart.items.pull({ _id: itemId });
  await cart.save();

  res.json({
    success: true,
    message: 'Item removed from cart',
    data: { cart }
  });
});

/**
 * @desc    Save item for later
 * @route   PUT /api/cart/:itemId/save-for-later
 * @access  Private
 */
const saveForLater = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    throw ApiError.notFound('Cart not found');
  }

  const item = cart.items.id(itemId);

  if (!item) {
    throw ApiError.notFound('Item not found in cart');
  }

  item.savedForLater = true;
  await cart.save();

  res.json({
    success: true,
    message: 'Item saved for later',
    data: { cart }
  });
});

/**
 * @desc    Move saved item back to cart
 * @route   PUT /api/cart/:itemId/move-to-cart
 * @access  Private
 */
const moveToCart = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    throw ApiError.notFound('Cart not found');
  }

  const item = cart.items.id(itemId);

  if (!item) {
    throw ApiError.notFound('Item not found in cart');
  }

  const product = await Product.findById(item.productId);

  if (!product || !product.isActive || product.isFlagged) {
    throw ApiError.badRequest('Product is no longer available');
  }

  if (product.stock < 1) {
    throw ApiError.badRequest('Product is out of stock');
  }

  item.savedForLater = false;
  item.quantity = 1;
  await cart.save();

  res.json({
    success: true,
    message: 'Item moved to cart',
    data: { cart }
  });
});

/**
 * @desc    Clear cart
 * @route   DELETE /api/cart
 * @access  Private
 */
const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndUpdate(
    { userId: req.user._id },
    { items: [] }
  );

  res.json({
    success: true,
    message: 'Cart cleared'
  });
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  saveForLater,
  moveToCart,
  clearCart
};
