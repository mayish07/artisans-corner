// server/controllers/userController.js
// User controller - handles user profile and vendor operations

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { ApiError } = require('../middleware/errorHandler');
const { asyncHandler } = require('../middleware/errorHandler');
const { sendEmail } = require('../utils/email');

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('wishlist', 'title slug images price avgRating');

  res.json({
    success: true,
    data: { user }
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  const { name, avatar, phone, bio } = req.body;

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (avatar) user.avatar = avatar;
  if (phone) {
    user.storeProfile = user.storeProfile || {};
    user.storeProfile.phone = phone;
  }
  if (bio !== undefined) {
    user.storeProfile = user.storeProfile || {};
    user.storeProfile.bio = bio;
  }

  await user.save();

  res.json({
    success: true,
    message: 'Profile updated',
    data: { user }
  });
});

/**
 * @desc    Become a seller/vendor
 * @route   POST /api/users/become-seller
 * @access  Private
 */
const becomeSeller = asyncHandler(async (req, res) => {
  const { storeName, bio } = req.body;

  if (req.user.role === 'vendor') {
    throw ApiError.conflict('You are already a vendor');
  }

  const existingSlug = storeName.toLowerCase().replace(/\s+/g, '-');
  const existingStore = await User.findOne({ 'storeProfile.storeSlug': existingSlug });

  if (existingStore) {
    throw ApiError.conflict('Store name already taken');
  }

  const user = await User.findById(req.user._id);

  user.role = 'vendor';
  user.storeProfile = {
    storeName,
    bio,
    storeSlug: existingSlug,
    approved: false
  };

  await user.save();

  const admins = await User.find({ role: 'admin' });
  for (const admin of admins) {
    try {
      await sendEmail({
        to: admin.email,
        subject: 'New Vendor Application',
        html: `<h1>New Vendor Application</h1><p>${user.name} has applied to become a vendor. Store: ${storeName}</p>`
      });
    } catch (error) {
      console.error('Failed to notify admin:', error);
    }
  }

  res.json({
    success: true,
    message: 'Vendor application submitted. Pending approval.',
    data: { user }
  });
});

/**
 * @desc    Update vendor store profile
 * @route   PUT /api/users/store
 * @access  Private/Vendor
 */
const updateStoreProfile = asyncHandler(async (req, res) => {
  const { storeName, bio, logo, banner, socialLinks } = req.body;

  if (req.user.role !== 'vendor' && req.user.role !== 'admin') {
    throw ApiError.forbidden('Only vendors can update store profile');
  }

  const user = await User.findById(req.user._id);

  if (!user.storeProfile) {
    throw ApiError.badRequest('Store profile not found');
  }

  if (storeName) {
    const newSlug = storeName.toLowerCase().replace(/\s+/g, '-');
    const existingStore = await User.findOne({
      'storeProfile.storeSlug': newSlug,
      _id: { $ne: user._id }
    });

    if (existingStore) {
      throw ApiError.conflict('Store name already taken');
    }

    user.storeProfile.storeName = storeName;
    user.storeProfile.storeSlug = newSlug;
  }

  if (bio !== undefined) user.storeProfile.bio = bio;
  if (logo) user.storeProfile.logo = logo;
  if (banner) user.storeProfile.banner = banner;
  if (socialLinks) user.storeProfile.socialLinks = { ...user.storeProfile.socialLinks, ...socialLinks };

  await user.save();

  res.json({
    success: true,
    message: 'Store profile updated',
    data: { user }
  });
});

/**
 * @desc    Get vendor public profile
 * @route   GET /api/users/store/:storeSlug
 * @access  Public
 */
const getVendorStore = asyncHandler(async (req, res) => {
  const { storeSlug } = req.params;

  const user = await User.findOne({
    'storeProfile.storeSlug': storeSlug,
    role: 'vendor',
    'storeProfile.approved': true,
    isActive: true
  }).select('name avatar storeProfile createdAt');

  if (!user) {
    throw ApiError.notFound('Store not found');
  }

  const products = await Product.find({
    vendorId: user._id,
    isActive: true,
    isFlagged: false
  })
    .select('title slug images price avgRating totalReviews stock')
    .sort({ createdAt: -1 })
    .limit(20);

  const stats = await Product.aggregate([
    { $match: { vendorId: user._id, isActive: true, isFlagged: false } },
    {
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
        avgRating: { $avg: '$avgRating' },
        totalSales: { $sum: '$salesCount' }
      }
    }
  ]);

  res.json({
    success: true,
    data: {
      store: {
        name: user.name,
        avatar: user.avatar,
        storeName: user.storeProfile.storeName,
        bio: user.storeProfile.bio,
        logo: user.storeProfile.logo,
        banner: user.storeProfile.banner,
        joinedAt: user.createdAt
      },
      products,
      stats: stats[0] || { totalProducts: 0, avgRating: 0, totalSales: 0 }
    }
  });
});

/**
 * @desc    Add product to wishlist
 * @route   POST /api/users/wishlist/:productId
 * @access  Private
 */
const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  const user = await User.findById(req.user._id);

  if (user.wishlist.includes(productId)) {
    throw ApiError.conflict('Product already in wishlist');
  }

  user.wishlist.push(productId);
  await user.save();

  res.json({
    success: true,
    message: 'Added to wishlist',
    data: { wishlist: user.wishlist }
  });
});

/**
 * @desc    Remove product from wishlist
 * @route   DELETE /api/users/wishlist/:productId
 * @access  Private
 */
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const user = await User.findById(req.user._id);

  user.wishlist.pull(productId);
  await user.save();

  res.json({
    success: true,
    message: 'Removed from wishlist',
    data: { wishlist: user.wishlist }
  });
});

/**
 * @desc    Get user addresses
 * @route   GET /api/users/addresses
 * @access  Private
 */
const getAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('addresses');

  res.json({
    success: true,
    data: { addresses: user.addresses || [] }
  });
});

/**
 * @desc    Add address
 * @route   POST /api/users/addresses
 * @access  Private
 */
const addAddress = asyncHandler(async (req, res) => {
  const address = req.body;

  const user = await User.findById(req.user._id);

  if (!user.addresses) user.addresses = [];

  if (address.isDefault) {
    user.addresses.forEach(a => a.isDefault = false);
  }

  user.addresses.push(address);
  await user.save();

  res.status(201).json({
    success: true,
    message: 'Address added',
    data: { addresses: user.addresses }
  });
});

/**
 * @desc    Update address
 * @route   PUT /api/users/addresses/:addressId
 * @access  Private
 */
const updateAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const updates = req.body;

  const user = await User.findById(req.user._id);

  const address = user.addresses.id(addressId);
  if (!address) {
    throw ApiError.notFound('Address not found');
  }

  if (updates.isDefault) {
    user.addresses.forEach(a => a.isDefault = false);
  }

  Object.assign(address, updates);
  await user.save();

  res.json({
    success: true,
    message: 'Address updated',
    data: { addresses: user.addresses }
  });
});

/**
 * @desc    Delete address
 * @route   DELETE /api/users/addresses/:addressId
 * @access  Private
 */
const deleteAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;

  const user = await User.findById(req.user._id);

  user.addresses.pull({ _id: addressId });
  await user.save();

  res.json({
    success: true,
    message: 'Address deleted',
    data: { addresses: user.addresses }
  });
});

module.exports = {
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
};
