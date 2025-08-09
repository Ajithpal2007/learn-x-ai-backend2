import express from 'express';
const router = express.Router();
import { 
  getColleges, 
  getCollegeById,
  createCollege,
  updateCollege,
  deleteCollege
} from '../controllers/collegeController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

// Public GET routes
router.route('/').get(protect, getColleges);
router.route('/:id').get(protect, getCollegeById);

// --- ADMIN ONLY ROUTES ---
// These routes are protected first by 'protect' (to see if user is logged in)
// and THEN by 'isAdmin' (to see if they are an admin).
router.route('/').post(protect, isAdmin, createCollege);
router.route('/:id').put(protect, isAdmin, updateCollege);
router.route('/:id').delete(protect, isAdmin, deleteCollege);

export default router;