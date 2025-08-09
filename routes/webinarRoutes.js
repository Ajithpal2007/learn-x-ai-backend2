import express from 'express';
const router = express.Router();
import {
    getWebinars,
    createWebinar,
    updateWebinar,
    deleteWebinar
} from '../controllers/webinarController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

// Regular users can get the list of webinars
// Admins can create new ones
router.route('/')
    .get(protect, getWebinars)
    .post(protect, isAdmin, createWebinar);

// Only admins can update or delete a specific webinar
router.route('/:id')
    .put(protect, isAdmin, updateWebinar)
    .delete(protect, isAdmin, deleteWebinar);

export default router;