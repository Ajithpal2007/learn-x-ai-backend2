import './config/env.js';
import path from 'path'; 
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// Route Imports
import userRoutes from './routes/userRoutes.js';
import collegeRoutes from './routes/collegeRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import webinarRoutes from './routes/webinarRoutes.js';
import mentorRoutes from './routes/mentorRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import successStoryRoutes from './routes/successStoryRoutes.js';
import entranceExamRoutes from './routes/entranceExamRoutes.js';
import vocationalCourseRoutes from './routes/vocationalCourseRoutes.js';
import boardPrepRoutes from './routes/boardPrepRoutes.js';
import discussionRoutes from './routes/discussionRoutes.js';
import scholarshipRoutes from './routes/scholarshipRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import opportunityRoutes from './routes/opportunityRoutes.js'; 
import uploadRoutes from './routes/uploadRoutes.js'
import adminRoutes from './routes/adminRoutes.js'; 
import blogRoutes from './routes/blogRoutes.js';


import { fileURLToPath } from 'url';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const allowedOrigins = ['https://learn-x-ai-frontend-ejbj.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};
// --- CONFIGURATION & MIDDLEWARE ---
connectDB();
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- API ROUTES ---
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/api/users', userRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/webinars', webinarRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/success-stories', successStoryRoutes);
app.use('/api/entrance-exams', entranceExamRoutes);
app.use('/api/vocational-courses', vocationalCourseRoutes);
app.use('/api/board-prep', boardPrepRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/opportunities', opportunityRoutes); 
app.use('/api/blog/posts', blogRoutes);



// This line tells the server to use your adminRoutes file for any URL starting with /api/admin
app.use('/api/admin', adminRoutes);

// --- ERROR HANDLING ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
