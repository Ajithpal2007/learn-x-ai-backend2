import express from 'express';
const router = express.Router();
import { getEntranceExams } from '../controllers/entranceExamController.js';
import { protect } from '../middleware/authMiddleware.js';
router.route('/').get(protect, getEntranceExams);
export default router;