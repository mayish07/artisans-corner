// server/controllers/uploadController.js
// Upload controller - handles image uploads to Cloudinary

const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

/**
 * @desc    Upload images to Cloudinary
 * @route   POST /api/upload/images
 * @access  Private
 */
const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const uploadPromises = req.files.map(file => 
      uploadToCloudinary(file.path, 'artisans-corner/products')
    );

    const results = await Promise.all(uploadPromises);

    const images = results.map(result => ({
      url: result.secure_url,
      publicId: result.public_id
    }));

    res.json({
      success: true,
      message: 'Images uploaded successfully',
      data: { images }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload images',
      error: error.message
    });
  }
};

/**
 * @desc    Delete image from Cloudinary
 * @route   DELETE /api/upload/images/:publicId
 * @access  Private
 */
const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;

    const result = await deleteFromCloudinary(publicId);

    res.json({
      success: true,
      message: 'Image deleted successfully',
      data: { result }
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete image',
      error: error.message
    });
  }
};

/**
 * @desc    Upload avatar
 * @route   POST /api/upload/avatar
 * @access  Private
 */
const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const result = await uploadToCloudinary(req.file.path, 'artisans-corner/avatars', true);

    res.json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: {
        url: result.secure_url,
        publicId: result.public_id
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload avatar',
      error: error.message
    });
  }
};

/**
 * @desc    Upload store logo/banner
 * @route   POST /api/upload/store
 * @access  Private
 */
const uploadStoreImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const folder = req.body.type === 'banner' ? 'artisans-corner/banners' : 'artisans-corner/logos';
    const result = await uploadToCloudinary(req.file.path, folder);

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: result.secure_url,
        publicId: result.public_id
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message
    });
  }
};

module.exports = {
  uploadImages,
  deleteImage,
  uploadAvatar,
  uploadStoreImage
};
