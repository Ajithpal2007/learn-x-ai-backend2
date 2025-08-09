import asyncHandler from 'express-async-handler';
import Scholarship from '../models/scholarshipModel.js';

// @desc    Get all scholarships
// @route   GET /api/scholarships
// @access  Private
const getScholarships = asyncHandler(async (req, res) => {
  const scholarships = await Scholarship.find({});
  res.status(200).json(scholarships);
});


// --- ADD THE FOLLOWING NEW FUNCTIONS ---

// @desc    Create a new scholarship
// @route   POST /api/scholarships
// @access  Private/Admin
const createScholarship = asyncHandler(async (req, res) => {
    const { name, provider, eligibility, field, amount, deadline } = req.body;

    const scholarship = new Scholarship({ name, provider, eligibility, field, amount, deadline });
    const createdScholarship = await scholarship.save();
    res.status(201).json(createdScholarship);
});

// @desc    Update a scholarship
// @route   PUT /api/scholarships/:id
// @access  Private/Admin
const updateScholarship = asyncHandler(async (req, res) => {
    const { name, provider, eligibility, field, amount, deadline } = req.body;
    const scholarship = await Scholarship.findById(req.params.id);

    if (scholarship) {
        scholarship.name = name || scholarship.name;
        scholarship.provider = provider || scholarship.provider;
        scholarship.eligibility = eligibility || scholarship.eligibility;
        scholarship.field = field || scholarship.field;
        scholarship.amount = amount || scholarship.amount;
        scholarship.deadline = deadline || scholarship.deadline;

        const updatedScholarship = await scholarship.save();
        res.json(updatedScholarship);
    } else {
        res.status(404);
        throw new Error('Scholarship not found');
    }
});


const deleteScholarship = asyncHandler(async (req, res) => {
    // --- THE FIX: Use findByIdAndDelete which is the modern, correct method ---
    const scholarship = await Scholarship.findByIdAndDelete(req.params.id);

    if (scholarship) {
        // A successful delete now returns a proper 200 OK status
        res.status(200).json({ message: 'Scholarship removed successfully' });
    } else {
        res.status(404);
        throw new Error('Scholarship not found');
    }
});



export {
    getScholarships,
    createScholarship,
    updateScholarship,
    deleteScholarship
};