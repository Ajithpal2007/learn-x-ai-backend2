import express from 'express';
const router = express.Router();
import { getAdminStats } from '../controllers/adminController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

// This route is protected and can only be accessed by admins
router.route('/stats').get(protect, isAdmin, getAdminStats);

export default router;