import express from 'express';
const router = express.Router();
import { chatWithAI, solveProblemStepByStep } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/chat', protect, chatWithAI);
router.post('/solve-math', protect, solveProblemStepByStep);
router.post('/solve-step-by-step', protect, solveProblemStepByStep);

export default router;