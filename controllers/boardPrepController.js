import asyncHandler from 'express-async-handler';
import BoardPrep from '../models/boardPrepModel.js';

// @desc    Get board prep info based on board and class
// @route   GET /api/board-prep
// @access  Private
const getBoardPrepInfo = asyncHandler(async (req, res) => {
  const { board, studentClass } = req.query; // e.g., ?board=CBSE&studentClass=12

  if (!board || !studentClass) {
    res.status(400);
    throw new Error('Please provide both board and class');
  }

  // Use findOne to get the specific document matching the criteria
  const prepInfo = await BoardPrep.findOne({ board: board, class: studentClass });

  if (prepInfo) {
    res.status(200).json(prepInfo);
  } else {
    res.status(404).json({ message: 'No prep information found for the selected criteria.' });
  }
});

export { getBoardPrepInfo };