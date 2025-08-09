import express from 'express';

const router = express.Router();

// --- CHECK THIS IMPORT ---
// Make sure 'getMe' is included here.
import { 
  registerUser, 
  loginUser, 
  getMe, 
  saveItem, 
  getSavedItems,
  getRoadmap,
  updateRoadmap,
  unsaveItem,
  getProfile, updateProfile, getSettings, updateSettings,getDashboardStats,getMyProfile,updateMyProfile,updateUserPFP,getCareerById,getUsers,deleteUser,updateUser,



} from '../controllers/userController.js';


// --- CHECK THIS IMPORT ---
// Make sure the 'protect' middleware is imported.
import { protect, isAdmin } from '../middleware/authMiddleware.js';


// --- THESE ARE YOUR PUBLIC ROUTES ---
router.post('/register', registerUser);
router.post('/login', loginUser);

// --- THIS IS YOUR PROTECTED ROUTE ---
// The server is saying it cannot find this.
// Check that this line exists and has no typos.
router.get('/me', protect, getMe);

// --- CHECK THIS EXPORT ---
// Make sure you are exporting the router at the end.
router.post('/save', protect, saveItem);
router.get('/saved', protect, getSavedItems);
router.route('/roadmap')    
  .get(protect, getRoadmap)
  .put(protect, updateRoadmap);
router.get('/roadmap', protect, getRoadmap);
router.route('/save')
  .post(protect, saveItem)
  .delete(protect, unsaveItem);
router.get('/saved', protect, getSavedItems);
router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);
  
router.route('/settings')
  .get(protect, getSettings)
  .put(protect, updateSettings);

  router.get('/dashboard', protect, getDashboardStats);

router.route('/my-profile')
  .get(protect, getMyProfile)
  .put(protect, updateMyProfile);
  router.put('/update-pfp', protect, updateUserPFP);

router.post('/register', registerUser);
router.post('/login', loginUser);

// --- Protected User Routes ---
router.get('/me', protect, getMe);
// ... other protected user routes

// --- ADMIN-ONLY ROUTES ---
router.route('/')
    .get(protect, isAdmin, getUsers); // GET all users

router.route('/:id')
    .delete(protect, isAdmin, deleteUser)
    .put(protect, isAdmin, updateUser);

export default router;