import asyncHandler from 'express-async-handler';
import VocationalCourse from '../models/vocationalCourseModel.js';

// @desc    Get all vocational courses
// @route   GET /api/vocational-courses
// @access  Private
const getVocationalCourses = asyncHandler(async (req, res) => {
  const courses = await VocationalCourse.find({});
  res.status(200).json(courses);
});

export { getVocationalCourses };