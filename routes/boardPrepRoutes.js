import express from 'express';
const router = express.Router();
import { getBoardPrepInfo } from '../controllers/boardPrepController.js';
import { protect } from '../middleware/authMiddleware.js';

// The filters (board, class) will be passed as query parameters
router.route('/').get(protect, getBoardPrepInfo);

export default router;