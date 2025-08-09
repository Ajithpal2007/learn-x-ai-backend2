import asyncHandler from 'express-async-handler';
import SuccessStory from '../models/successStoryModel.js';

// @desc    Get all success stories
// @route   GET /api/success-stories
// @access  Private
const getSuccessStories = asyncHandler(async (req, res) => {
  const stories = await SuccessStory.find({});
  res.status(200).json(stories);
});

export { getSuccessStories };