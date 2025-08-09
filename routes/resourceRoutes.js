import express from 'express';
const router = express.Router();
import { getResources } from '../controllers/resourceController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getResources);

export default router;