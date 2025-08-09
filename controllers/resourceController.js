import asyncHandler from 'express-async-handler';
import Resource from '../models/resourceModel.js';

// @desc    Get resources, with optional filtering
// @route   GET /api/resources
// @access  Private
const getResources = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.type) filter.type = req.query.type;
  if (req.query.field) filter.field = req.query.field;

  const resources = await Resource.find(filter);
  res.status(200).json(resources);
});

export { getResources };