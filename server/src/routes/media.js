const express = require('express');
const cloudinary = require('cloudinary').v2;
const requireAdmin = require('../middleware/requireAdmin');
const router = express.Router();

router.post('/signature', requireAdmin, (_req, res) => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return res.status(503).json({ message: 'Le stockage média Cloudinary n’est pas encore configuré.' });
  }
  cloudinary.config({ cloud_name: CLOUDINARY_CLOUD_NAME, api_key: CLOUDINARY_API_KEY, api_secret: CLOUDINARY_API_SECRET });
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request({ timestamp, folder: 'gnah' }, CLOUDINARY_API_SECRET);
  return res.json({ cloudName: CLOUDINARY_CLOUD_NAME, apiKey: CLOUDINARY_API_KEY, timestamp, folder: 'gnah', signature });
});

module.exports = router;
