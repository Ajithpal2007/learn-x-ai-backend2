import asyncHandler from 'express-async-handler';
import BlogPost from '../models/blogPostModel.js';
import Comment from '../models/commentModel.js'; // <-- Import the Comment model

// --- POST FUNCTIONS ---
export const getPosts = asyncHandler(async (req, res) => { /* ... existing code ... */ });
export const getPostById = asyncHandler(async (req, res) => { /* ... existing code ... */ });
export const createPost = asyncHandler(async (req, res) => { /* ... existing code ... */ });
export const updatePost = asyncHandler(async (req, res) => { /* ... existing code ... */ });
export const deletePost = asyncHandler(async (req, res) => { /* ... existing code ... */ });

// --- ADD THESE NEW COMMENT FUNCTIONS ---

// @desc    Get all comments for a post
// @route   GET /api/blog/posts/:id/comments
// @access  Public
export const getCommentsForPost = asyncHandler(async (req, res) => {
    const comments = await Comment.find({ post: req.params.id }).populate('author', 'name profilePictureUrl').sort({ createdAt: 'desc' });
    res.json(comments);
});

// @desc    Create a comment on a post
// @route   POST /api/blog/posts/:id/comments
// @access  Private
export const createComment = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const post = await BlogPost.findById(req.params.id);

    if (post) {
        const comment = new Comment({
            text,
            author: req.user._id,
            post: req.params.id,
        });
        const createdComment = await comment.save();
        post.comments.push(createdComment);
        await post.save();

        // Populate the author details before sending back
        const populatedComment = await Comment.findById(createdComment._id).populate('author', 'name profilePictureUrl');
        res.status(201).json(populatedComment);
    } else {
        res.status(404); throw new Error('Post not found');
    }
});

// @desc    Delete a comment
// @route   DELETE /api/blog/comments/:commentId
// @access  Private
export const deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.commentId);

    if (comment) {
        // Security Check: Only allow the author of the comment or an admin to delete it
        if (comment.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            res.status(403);
            throw new Error('User not authorized to delete this comment');
        }

        // Remove comment from the BlogPost's comments array
        await BlogPost.updateOne({ _id: comment.post }, { $pull: { comments: comment._id } });
        
        await Comment.findByIdAndDelete(req.params.commentId);

        res.json({ message: 'Comment removed' });
    } else {
        res.status(404);
        throw new Error('Comment not found');
    }
});