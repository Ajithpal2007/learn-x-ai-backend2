import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

// Import all the models we will interact with
import User from '../models/userModel.js';
import Assessment from '../models/assessmentModel.js';
import College from '../models/collegeModel.js';
import Career from '../models/careerModel.js';
import Resource from '../models/resourceModel.js';


// @desc    Register a new user & create default assessments
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // If user creation is successful, create their default assessments
    const defaultAssessments = [
      { user: user._id, assessmentType: 'Aptitude', assessmentName: 'Logical Reasoning', status: 'Pending' },
      { user: user._id, assessmentType: 'Interest', assessmentName: 'RIASEC Interest Profiler', status: 'Pending' },
      { user: user._id, assessmentType: 'Personality', assessmentName: 'Big Five Personality Test', status: 'Pending' },
      { user: user._id, assessmentType: 'Values', assessmentName: 'Values Clarification', status: 'Pending' }
    ];
    await Assessment.insertMany(defaultAssessments);

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


// @desc    Authenticate a user (login)
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
       _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePictureUrl: user.profilePictureUrl,
      personalInfo: user.personalInfo,
      educationalInfo: user.educationalInfo,
      settings: user.settings,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});


// @desc    Get current user's data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});


// @desc    Save an item for a user (college, career, or resource)
// @route   POST /api/users/save
// @access  Private
const saveItem = asyncHandler(async (req, res) => {
  const { itemId, itemType } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (itemType === 'college') {
    if (!user.savedItems.colleges.includes(itemId)) {
      user.savedItems.colleges.push(itemId);
    }
  } else if (itemType === 'career') {
    if (!user.savedItems.careers.includes(itemId)) {
      user.savedItems.careers.push(itemId);
    }
  } else if (itemType === 'resource') {
    if (!user.savedItems.resources.includes(itemId)) {
      user.savedItems.resources.push(itemId);
    }
  } else {
    res.status(400);
    throw new Error('Invalid item type specified');
  }

  await user.save();
  res.status(200).json({ message: 'Item saved successfully' });
});


// @desc    Get a user's saved items
// @route   GET /api/users/saved
// @access  Private
const getSavedItems = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate('savedItems.colleges')
    .populate('savedItems.careers')
    .populate('savedItems.resources');
  
  if (user) {
    res.status(200).json(user.savedItems);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// @desc    Get a user's roadmap data
// @route   GET /api/users/roadmap
// @access  Private
const getRoadmap = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.status(200).json(user.roadmap);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// @desc    Update a user's roadmap data
// @route   PUT /api/users/roadmap
// @access  Private
const updateRoadmap = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.roadmap.academicGoals = req.body.academicGoals || user.roadmap.academicGoals;
    user.roadmap.careerMilestones = req.body.careerMilestones || user.roadmap.careerMilestones;
    user.roadmap.journal = req.body.journal || user.roadmap.journal;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser.roadmap);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Unsave an item for a user
// @route   DELETE /api/users/save
// @access  Private
const unsaveItem = asyncHandler(async (req, res) => {
  const { itemId, itemType } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404); throw new Error('User not found');
  }

  let list;
  if (itemType === 'college') list = user.savedItems.colleges;
  else if (itemType === 'career') list = user.savedItems.careers;
  else if (itemType === 'resource') list = user.savedItems.resources;
  else {
    res.status(400); throw new Error('Invalid item type');
  }

  // Pull (remove) the item from the array
  list.pull(itemId);

  await user.save();
  res.status(200).json({ message: 'Item unsaved successfully' });
});

// @desc    Get a user's full profile data
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  // req.user is populated by our 'protect' middleware
  // We just need to get the 'profile' part of it
  const user = await User.findById(req.user.id);
  if (user) {
    res.status(200).json({
      name: user.name,
      joined: user.createdAt,
      profile: user.profile,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update a user's profile data
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.profile.summary = req.body.summary || user.profile.summary;
    user.profile.goals = req.body.goals || user.profile.goals;
    // Note: Updating achievements and learningPath would be more complex
    // This is a simple update for now.
    
    const updatedUser = await user.save();
    res.status(200).json({
      name: updatedUser.name,
      profile: updatedUser.profile,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// @desc    Get user settings
// @route   GET /api/users/settings
// @access  Private
const getSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.status(200).json(user.settings);
  } else {
    res.status(404); throw new Error('User not found');
  }
});


// @desc    Update user settings
// @route   PUT /api/users/settings
// @access  Private
const updateSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    // Check for existence of nested object before assigning
    if (req.body.notifications) {
        user.settings.notifications.email = req.body.notifications.email;
        user.settings.notifications.push = req.body.notifications.push;
    }
    const updatedUser = await user.save();
    res.status(200).json(updatedUser.settings);
  } else {
    res.status(404); throw new Error('User not found');
  }
});


//@desc    Get dashboard statistics for the logged-in user
// @route   GET /api/users/dashboard
// @access  Private
const getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // --- We will fetch all data in parallel for better performance ---
  const [
    totalAssessments,
    completedAssessments,
    careerMatchesUnlocked,
    user
  ] = await Promise.all([
    Assessment.countDocuments({ user: userId }),
    Assessment.countDocuments({ user: userId, status: 'Completed' }),
    Career.countDocuments({}),
    User.findById(userId)
      .populate({ path: 'savedItems.colleges', model: 'College', select: 'name' })
      .populate({ path: 'savedItems.careers', model: 'Career', select: 'name' })
      .populate({ path: 'savedItems.resources', model: 'Resource', select: 'title' })
  ]);
  
  // Calculate Roadmap Progress
  let roadmapProgress = 0;
  if (user && user.roadmap) {
      if (user.roadmap.academicGoals) roadmapProgress += 33;
      if (user.roadmap.careerMilestones) roadmapProgress += 33;
      if (user.roadmap.journal) roadmapProgress += 34;
  }
  
  // --- NEW: Logic to get recent activity ---
  let recentActivity = [];
  if (user && user.savedItems) {
      const allSaved = [
          ...user.savedItems.colleges.map(item => ({ ...item.toObject(), type: 'College', savedAt: item.createdAt })),
          ...user.savedItems.careers.map(item => ({ ...item.toObject(), type: 'Career', savedAt: item.createdAt })),
          ...user.savedItems.resources.map(item => ({ ...item.toObject(), type: 'Resource', savedAt: item.createdAt }))
      ];
      // Sort all saved items by when they were created and get the last 3
      recentActivity = allSaved
          .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
          .slice(0, 3);
  }

  const stats = {
    assessments: {
      completed: completedAssessments,
      total: totalAssessments > 0 ? totalAssessments : 4,
    },
    careerMatchesUnlocked,
    roadmapProgress: Math.min(100, roadmapProgress),
    recentActivity // <-- Add the new data to the response
  };

  res.status(200).json(stats);
});


// @desc    Get a user's detailed profile for the My Profile page
// @route   GET /api/users/my-profile
// @access  Private
const getMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update a user's detailed profile
// @route   PUT /api/users/my-profile
// @access  Private
const updateMyProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email; // Note: changing email should be handled with care
        
        // Explicitly update nested objects to prevent errors
        if (req.body.personalInfo) user.personalInfo = req.body.personalInfo;
        if (req.body.educationalInfo) user.educationalInfo = req.body.educationalInfo;
        if (req.body.settings) user.settings = req.body.settings;
        if (req.body.profilePictureUrl) user.profilePictureUrl = req.body.profilePictureUrl;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const updateUserPFP = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.profilePictureUrl = req.body.imageUrl;
    await user.save();
    res.status(200).json({ message: 'Profile picture updated' });
  } else { 
    res.status(404);
    throw new Error('User not found');  

   }
});


// @desc    Get a single career by ID
// @route   GET /api/careers/:id
// @access  Private
const getCareerById = asyncHandler(async (req, res) => {
    const career = await Career.findById(req.params.id);
    if (career) {
        res.json(career);
    } else {
        res.status(404);
        throw new Error('Career not found');
    }
});





// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    // Find all users and exclude their passwords from the result
    const users = await User.find({}).select('-password');
    res.json(users);
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        // You might want to add logic here to handle the user's content (e.g., reassign posts)
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user (by admin)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.isAdmin !== undefined) {
            user.isAdmin = req.body.isAdmin;
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


// Export all the controller functions
export { 
  registerUser, 
  loginUser, 
  getMe, 
  saveItem, 
  getSavedItems,
  getRoadmap,
  updateRoadmap,
  unsaveItem ,
  getProfile,
  updateProfile,
  getSettings,
  updateSettings,
  getDashboardStats,
  getMyProfile,
  updateMyProfile,
  updateUserPFP,
  getCareerById,
  getUsers,
  deleteUser,
  updateUser,




};