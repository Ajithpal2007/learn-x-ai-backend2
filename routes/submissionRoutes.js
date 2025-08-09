
import express from 'express';
const router = express.Router();
import {
    createSubmission,
    getSubmissions,
    updateSubmissionStatus,
    deleteSubmission
} from '../controllers/submissionController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

// --- THIS IS THE FIX ---
// We chain the .get() method here.
// .post is for public users to create submissions.
// .get is for admins to view all submissions.
router.route('/')
    .post(createSubmission)
    .get(protect, isAdmin, getSubmissions);

// These routes for updating and deleting are for admins only.
router.route('/:id')
    .put(protect, isAdmin, updateSubmissionStatus)
    .delete(protect, isAdmin, deleteSubmission);

export default router