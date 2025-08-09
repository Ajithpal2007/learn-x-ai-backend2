import asyncHandler from 'express-async-handler';
import Career from '../models/careerModel.js';

// @desc    Get careers with filtering, searching, and sorting
// @route   GET /api/careers
// @access  Private
const getCareers = asyncHandler(async (req, res) => {
  const { cluster, searchTerm, sortBy } = req.query;
  const filter = {};

  if (cluster && cluster !== 'All') {
    filter.cluster = cluster;
  }
  if (searchTerm) {
    filter.name = { $regex: searchTerm, $options: 'i' }; // Case-insensitive search
  }

  let sortOptions = {};
  if (sortBy === 'salary') {
    sortOptions.salary = -1; // -1 for descending order
  } else if (sortBy === 'growth') {
    // This is more complex, would need a numerical value for growth in the model
    // For now, we can sort alphabetically which is not ideal but functional
    sortOptions.growth = -1;
  }
  // Default sort can be added here if needed

  const careers = await Career.find(filter).sort(sortOptions);
  res.status(200).json(careers);
});


//@desc    Create a new career
// @route   POST /api/careers
// @access  Private/Admin
const createCareer = asyncHandler(async (req, res) => {
  const { name, salary, growth, cluster, traits, rationale } = req.body;

  const career = new Career({
    name, salary, growth, cluster, traits, rationale
  });

  const createdCareer = await career.save();
  res.status(201).json(createdCareer);
});

// @desc    Update a career
// @route   PUT /api/careers/:id
// @access  Private/Admin
const updateCareer = asyncHandler(async (req, res) => {
  const { name, salary, growth, cluster, traits, rationale } = req.body;
  const career = await Career.findById(req.params.id);

  if (career) {
    career.name = name || career.name;
    career.salary = salary || career.salary;
    career.growth = growth || career.growth;
    career.cluster = cluster || career.cluster;
    career.traits = traits || career.traits;
    career.rationale = rationale || career.rationale;
    
    const updatedCareer = await career.save();
    res.json(updatedCareer);
  } else {
    res.status(404);
    throw new Error('Career not found');
  }
});

const deleteCareer = asyncHandler(async (req, res) => {
  
  const career = await Career.findByIdAndDelete(req.params.id);

  if (career) {
    // A successful delete now returns a proper 200 OK status
    res.status(200).json({ message: 'Career removed successfully' });
  } else {
    res.status(404);
    throw new Error('Career not found');
  }
});
export { getCareers, createCareer, updateCareer, deleteCareer };
