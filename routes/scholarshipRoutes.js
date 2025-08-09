import express from 'express';
const router = express.Router();
import {
    getScholarships,
    createScholarship,
    updateScholarship,
    deleteScholarship
} from '../controllers/scholarshipController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

// Public users can get scholarships, but only admins can modify them.
router.route('/')
    .get(protect, getScholarships)
    .post(protect, isAdmin, createScholarship);

router.route('/:id')
    .put(protect, isAdmin, updateScholarship)
    .delete(protect, isAdmin, deleteScholarship);

export default router;