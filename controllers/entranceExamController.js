import asyncHandler from 'express-async-handler';
import EntranceExam from '../models/entranceExamModel.js';

// @desc    Get all entrance exams, optionally filtered by category
// @route   GET /api/entrance-exams
// @access  Private
const getEntranceExams = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) {
    filter.category = req.query.category;
  }
  const exams = await EntranceExam.find(filter);
  res.status(200).json(exams);
});

export { getEntranceExams };