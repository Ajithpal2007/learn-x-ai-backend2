// /models/userModel.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePictureUrl: { type: String, default: '' },

    personalInfo: {
      type: {
        dateOfBirth: { type: String, default: '' },
        location: { type: String, default: '' },
        contact: { type: String, default: '' },
        gender: { type: String, default: '' },
      },
      default: { dateOfBirth: '', location: '', contact: '', gender: '' },
    },

    educationalInfo: {
      type: {
        grade: { type: String, default: '' },
        stream: { type: String, default: '' },
        school: { type: String, default: '' },
        board: { type: String, default: '' },
      },
      default: { grade: '', stream: '', school: '', board: '' },
    },

    savedItems: {
      type: {
        colleges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'College' }],
        careers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Career' }],
        resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
      },
      default: { colleges: [], careers: [], resources: [] },
    },

    roadmap: {
      type: {
        academicGoals: { type: String, default: '' },
        careerMilestones: { type: String, default: '' },
        journal: { type: String, default: '' },
      },
      default: { academicGoals: '', careerMilestones: '', journal: '' },
    },

    profile: {
      type: {
        summary: { type: String, default: '' },
        goals: { type: String, default: '' },
      },
      default: { summary: '', goals: '' },
    },

    settings: {
      type: {
        notifications: {
          type: {
            email: { type: Boolean, default: true },
            push: { type: Boolean, default: false },
          },
          default: { email: true, push: false },
        }
      },
      default: { notifications: { email: true, push: false } },
    },
     isAdmin: { type: Boolean, required: true, default: false },

  },
  {
    timestamps: true,
  }
);

// --- Methods (pre-save hook for password and matchPassword) ---
// ... (These should remain as they are) ...
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) { next(); }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);
export default User;