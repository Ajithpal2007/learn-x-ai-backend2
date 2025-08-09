import path from 'path';
import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js'; // Protect the route
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) { cb(null, 'uploads/'); },
  filename(req, file, cb) { cb(null, `user-${req.user._id}-${Date.now()}${path.extname(file.originalname)}`); },
});

const upload = multer({ storage });

router.post('/', protect, upload.single('image'), (req, res) => {
  res.send({
    message: 'Image Uploaded',
    image: `/uploads/${req.file.filename}`, // Send back the path
  });
});

export default router;