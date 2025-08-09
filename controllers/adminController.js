import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import College from '../models/collegeModel.js';
import Career from '../models/careerModel.js';
import Scholarship from '../models/scholarshipModel.js';
import Submission from '../models/submissionModel.js';

const getAdminStats = asyncHandler(async (req, res) => {
    const [userCount, collegeCount, careerCount, scholarshipCount, submissionCount] = await Promise.all([
        User.countDocuments(),
        College.countDocuments(),
        Career.countDocuments(),
        Scholarship.countDocuments(),
        Submission.countDocuments({ status: 'New' })
    ]);

    res.json({
        users: userCount,
        colleges: collegeCount,
        careers: careerCount,
        scholarships: scholarshipCount,
        newSubmissions: submissionCount
    });
});

export { getAdminStats };