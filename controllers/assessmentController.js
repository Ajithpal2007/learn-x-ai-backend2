import asyncHandler from 'express-async-handler';
import Assessment from '../models/assessmentModel.js';

// @desc    Get all assessments for the logged-in user
// @route   GET /api/assessments
// @access  Private
const getAssessments = asyncHandler(async (req, res) => {
  // We can get the user's ID from the 'req.user' object that our 'protect' middleware sets
  const assessments = await Assessment.find({ user: req.user.id });
  res.status(200).json(assessments);
});

// @desc    Update a specific assessment
// @route   PUT /api/assessments/:id
// @access  Private
const updateAssessment = asyncHandler(async (req, res) => {
  const assessmentId = req.params.id;
  const { results } = req.body; // Get the results from the request body

  const assessment = await Assessment.findById(assessmentId);

  // 1. Check if the assessment exists
  if (!assessment) {
    res.status(404);
    throw new Error('Assessment not found');
  }

  // 2. IMPORTANT Security Check: Make sure the assessment belongs to the logged-in user
  if (assessment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized to update this assessment');
  }
  
  // 3. Update the document
  assessment.status = 'Completed';
  assessment.results = results;
  assessment.completedAt = new Date();
  
  const updatedAssessment = await assessment.save();

  res.status(200).json(updatedAssessment);
});


export { getAssessments, updateAssessment };