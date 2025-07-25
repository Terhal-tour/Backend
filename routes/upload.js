// routes/upload.js
import express from 'express';
import multer from 'multer';
import cloudinary from '../lib/cloudinary.js';
import fs from 'fs';

const router = express.Router();

const upload = multer({ dest: 'temp/' }); // temp folder

router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'terhal-posts', // optional folder in your Cloudinary account
    });

    // Delete temp file
    fs.unlinkSync(req.file.path);

    // result.url or result.secure_url is your final image URL
    res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;
