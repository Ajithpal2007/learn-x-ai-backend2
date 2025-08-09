import asyncHandler from 'express-async-handler';
import Mentor from '../models/mentorModel.js';

// @desc    Get all mentors
// @route   GET /api/mentors
// @access  Private
const getMentors = asyncHandler(async (req, res) => {
  const mentors = await Mentor.find({});
  res.status(200).json(mentors);
});

export { getMentors };