import express from 'express';
const router = express.Router();
import { getDiscussions, createDiscussion } from '../controllers/discussionController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
  .get(protect, getDiscussions)
  .post(protect, createDiscussion);

export default router;