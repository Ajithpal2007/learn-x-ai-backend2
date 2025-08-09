import express from 'express';
const router = express.Router();
import { getVocationalCourses } from '../controllers/vocationalCourseController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getVocationalCourses);

export default router;