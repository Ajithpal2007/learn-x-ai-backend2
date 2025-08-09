import asyncHandler from 'express-async-handler';
import College from '../models/collegeModel.js';

// Get colleges, with optional filtering (this function already exists)
const getColleges = asyncHandler(async (req, res) => {
  // ... your existing code ...
  const filter = {};
  if (req.query.stream) {
    filter.stream = req.query.stream;
  }
  if (req.query.location) {
    filter.location = { $regex: req.query.location, $options: 'i' };
  }
  const colleges = await College.find(filter);
  res.status(200).json(colleges);
});

// --- NEW FUNCTION ---
// @desc    Get a single college by ID
// @route   GET /api/colleges/:id
// @access  Private
const getCollegeById = asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id);

  if (college) {
    res.status(200).json(college);
  } else {
    res.status(404);
    throw new Error('College not found');
  }
});


// @desc    Create a new college
// @route   POST /api/colleges
// @access  Private/Admin
const createCollege = asyncHandler(async (req, res) => {
  const { name, location, stream, nirf_ranking, fees, exams, websiteUrl } = req.body;

  const college = new College({
    name, location, stream, nirf_ranking, fees, exams, websiteUrl
  });

  const createdCollege = await college.save();
  res.status(201).json(createdCollege);
});

// @desc    Update a college
// @route   PUT /api/colleges/:id
// @access  Private/Admin
const updateCollege = asyncHandler(async (req, res) => {
  const { name, location, stream, nirf_ranking, fees, exams, websiteUrl } = req.body;
  const college = await College.findById(req.params.id);

  if (college) {
    college.name = name || college.name;
    college.location = location || college.location;
    college.stream = stream || college.stream;
    // ... and so on for all fields
    
    const updatedCollege = await college.save();
    res.json(updatedCollege);
  } else {
    res.status(404);
    throw new Error('College not found');
  }
});


// @desc Delete a college
// @route DELETE /api/colleges/:id
// @access Private/Admin
const deleteCollege = asyncHandler(async (req, res) => {
// --- THE FIX: Use findByIdAndDelete which is the correct, non-crashing method ---
const college = await College.findByIdAndDelete(req.params.id);
if (college) {
// A successful delete now returns a proper success message
res.status(200).json({ message: 'College removed successfully' });
} else {
res.status(404);
throw new Error('College not found');
}
});

// --- EXPORT THE NEW FUNCTION ---
export { getColleges, getCollegeById, createCollege, updateCollege, deleteCollege };
