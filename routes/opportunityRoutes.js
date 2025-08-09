import express from 'express';
const router = express.Router();
import { getOpportunities } from '../controllers/opportunityController.js';
import { protect } from '../middleware/authMiddleware.js';
router.route('/').get(protect, getOpportunities);
export default router;