import asyncHandler from 'express-async-handler';
import Comment from '../models/commentModel.js';
import BlogPost from '../models/blogPostModel.js';

// @desc    Create a comment on a post
// @route   POST /api/posts/:postId/comments
// @access  Private
const createComment = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const post = await BlogPost.findById(req.params.postId);

    if (post) {
        const comment = new Comment({
            text,
            author: req.user._id,
            post: req.params.postId,
        });
        const createdComment = await comment.save();
        post.comments.push(createdComment);
        await post.save();
        res.status(201).json(createdComment);
    } else {
        res.status(404); throw new Error('Post not found');
    }
});
