import asyncHandler from 'express-async-handler';
import Discussion from '../models/discussionModel.js';

// @desc    Get all discussions, optionally filtered by category
// @route   GET /api/discussions
// @access  Private
const getDiscussions = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category && req.query.category !== 'All Discussions') {
    filter.category = req.query.category;
  }
  // Populate author to get user's name, sort by newest
  const discussions = await Discussion.find(filter)
    .populate('author', 'name')
    .sort({ createdAt: -1 });
    
  res.status(200).json(discussions);
});

// @desc    Create a new discussion
// @route   POST /api/discussions
// @access  Private
const createDiscussion = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error('Please provide title, content, and category');
  }

  const discussion = await Discussion.create({
    title,
    content,
    category,
    author: req.user.id, // The author is the logged-in user
  });

  res.status(201).json(discussion);
});

export { getDiscussions, createDiscussion };