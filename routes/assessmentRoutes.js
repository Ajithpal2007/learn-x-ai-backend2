import express from 'express';
const router = express.Router();
import { getAssessments, updateAssessment } from '../controllers/assessmentController.js';
import { protect } from '../middleware/authMiddleware.js';

// Get all assessments for the logged-in user
router.route('/').get(protect, getAssessments);

// Update a single assessment by its ID
router.route('/:id').put(protect, updateAssessment);

export default router;