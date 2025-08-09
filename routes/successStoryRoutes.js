import express from 'express';
const router = express.Router();
import { getSuccessStories } from '../controllers/successStoryController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getSuccessStories);

export default router;