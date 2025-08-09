import express from 'express';
const router = express.Router();
import {
    getCareers,
    createCareer,
    updateCareer,
    deleteCareer
} from '../controllers/careerController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

// Chain the routes for better organization
router.route('/')
  .get(protect, getCareers) // All users can view careers
  .post(protect, isAdmin, createCareer); // Only admins can create

router.route('/:id')

  .put(protect, isAdmin, updateCareer) // Only admins can update
  .delete(protect, isAdmin, deleteCareer); // Only admins can delete

export default router;