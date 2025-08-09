import express from 'express';
const router = express.Router();
import { getMentors } from '../controllers/mentorController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getMentors);

export default router;