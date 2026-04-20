// server/routes/upload.js
// Upload routes

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { protect, vendorOnly } = require('../middleware/auth');
const { uploadImages, deleteImage, uploadAvatar, uploadStoreImage } = require('../controllers/uploadController');
const { uploadLimiter } = require('../middleware/rateLimiter');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 10
  }
});

router.post('/images', protect, vendorOnly, uploadLimiter, upload.array('images', 10), uploadImages);
router.delete('/images/:publicId', protect, vendorOnly, deleteImage);
router.post('/avatar', protect, uploadLimiter, upload.single('avatar'), uploadAvatar);
router.post('/store', protect, vendorOnly, uploadLimiter, upload.single('image'), uploadStoreImage);

module.exports = router;
