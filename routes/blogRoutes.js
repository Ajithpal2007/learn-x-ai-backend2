import express from 'express';
const router = express.Router();
import { 
    getPosts, 
    getPostById, 
    createPost, 
    updatePost, 
    deletePost,
    getCommentsForPost, // <-- Import comment functions
    createComment,      // <-- Import comment functions
    deleteComment       // <-- Import comment functions
} from '../controllers/blogController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

// --- Blog Post Routes ---
router.route('/')
    .get(getPosts)
    .post(protect, isAdmin, createPost);

router.route('/:id')
    .get(getPostById)
    .put(protect, isAdmin, updatePost)
    .delete(protect, isAdmin, deletePost);

// --- Comment Routes (Nested under posts) ---
router.route('/:id/comments')
    .get(getCommentsForPost)      // Get all comments for a post
    .post(protect, createComment); // Any logged-in user can create a comment

// --- Route for deleting a specific comment by its own ID ---
router.route('/comments/:commentId')
    .delete(protect, deleteComment);

export default router;