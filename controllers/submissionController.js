import asyncHandler from 'express-async-handler';
import Submission from '../models/submissionModel.js';

// @desc    Create a new submission
// @route   POST /api/submissions
// @access  Public
const createSubmission = asyncHandler(async (req, res) => {
  const { name, email, message, submissionType, role, schoolName } = req.body;

  if (!name || !email || !submissionType) {
    res.status(400);
    throw new Error('Name, email, and submission type are required.');
  }

  await Submission.create({
    name,
    email,
    message,
    submissionType,
    role,
    schoolName,
  });

  res.status(201).json({ message: 'Submission received successfully. We will get back to you shortly.' });
});

// @desc    Get all submissions
// @route   GET /api/submissions
// @access  Private/Admin
const getSubmissions = asyncHandler(async (req, res) => {
    const submissions = await Submission.find({}).sort({ createdAt: -1 }); // Show newest first
    res.json(submissions);
});

// @desc    Update a submission's status
// @route   PUT /api/submissions/:id
// @access  Private/Admin
const updateSubmissionStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const submission = await Submission.findById(req.params.id);

    if (submission) {
        submission.status = status;
        const updatedSubmission = await submission.save();
        res.json(updatedSubmission);
    } else {
        res.status(404);
        throw new Error('Submission not found');
    }
});

// @desc    Delete a submission
// @route   DELETE /api/submissions/:id
// @access  Private/Admin
const deleteSubmission = asyncHandler(async (req, res) => {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (submission) {
        res.json({ message: 'Submission removed' });
    } else {
        res.status(404);
        throw new Error('Submission not found');
    }
});

export { createSubmission, getSubmissions, updateSubmissionStatus, deleteSubmission };
