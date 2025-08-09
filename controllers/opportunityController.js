import asyncHandler from 'express-async-handler';
import Opportunity from '../models/opportunityModel.js';
const getOpportunities = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) { filter.category = req.query.category; }
  const opportunities = await Opportunity.find(filter);
  res.status(200).json(opportunities);
});
export { getOpportunities };

