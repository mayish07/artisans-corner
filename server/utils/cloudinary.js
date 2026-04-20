// server/utils/cloudinary.js
// Cloudinary utility for image uploads

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload image to Cloudinary
 * @param {string} filePath - Local file path
 * @param {string} folder - Folder in Cloudinary
 * @param {boolean} isAvatar - Whether it's an avatar (square crop)
 * @returns {Promise<Object>} Upload result
 */
const uploadToCloudinary = async (filePath, folder = 'artisans-corner', isAvatar = false) => {
  try {
    const options = {
      folder,
      resource_type: 'auto',
      transformation: isAvatar ? [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto', fetch_format: 'auto' }
      ] : [
        { quality: 'auto', fetch_format: 'auto' }
      ]
    };

    const result = await cloudinary.uploader.upload(filePath, options);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<Object>} Delete result
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
};

/**
 * Delete multiple images from Cloudinary
 * @param {Array<string>} publicIds - Array of Cloudinary public IDs
 * @returns {Promise<Object>} Delete result
 */
const deleteMultipleFromCloudinary = async (publicIds) => {
  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
};

/**
 * Get optimized image URL
 * @param {string} publicId - Cloudinary public ID
 * @param {Object} options - Transformation options
 * @returns {string} Optimized URL
 */
const getOptimizedUrl = (publicId, options = {}) => {
  const {
    width = 800,
    height,
    crop = 'limit',
    quality = 'auto'
  } = options;

  return cloudinary.url(publicId, {
    width,
    height,
    crop,
    quality,
    fetch_format: 'auto'
  });
};

/**
 * Generate responsive image URLs
 * @param {string} publicId - Cloudinary public ID
 * @returns {Object} Responsive URL set
 */
const getResponsiveUrls = (publicId) => {
  return {
    thumbnail: cloudinary.url(publicId, { width: 150, height: 150, crop: 'fill', fetch_format: 'auto', quality: 'auto' }),
    small: cloudinary.url(publicId, { width: 320, crop: 'limit', fetch_format: 'auto', quality: 'auto' }),
    medium: cloudinary.url(publicId, { width: 640, crop: 'limit', fetch_format: 'auto', quality: 'auto' }),
    large: cloudinary.url(publicId, { width: 1024, crop: 'limit', fetch_format: 'auto', quality: 'auto' }),
    original: cloudinary.url(publicId)
  };
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  deleteFromCloudinary,
  deleteMultipleFromCloudinary,
  getOptimizedUrl,
  getResponsiveUrls
};
