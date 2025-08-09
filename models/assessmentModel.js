import mongoose from 'mongoose';

const assessmentSchema = mongoose.Schema(
  {
    // Link to the user who took the assessment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This creates a reference to the 'User' model
    },
    // The broad category of the test
    assessmentType: {
      type: String,
      required: true,
      enum: ['Aptitude', 'Interest', 'Personality', 'Values'], // Enforces data consistency
    },
    // The specific name of the test (e.g., "Logical Reasoning", "Big Five")
    assessmentName: {
      type: String,
      required: true,
    },
    // The current state of the assessment for this user
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
    // A flexible object to store the results, which will vary by test type
    results: {
      // A general score, if applicable
      score: {
        type: Number,
      },
      // For more complex results, like personality traits
      // Example: { "Openness": 85, "Conscientiousness": 72, ... }
      detailedScores: {
        type: Map,
        of: String,
      },
      // For interest profilers like RIASEC, could store the primary code
      // Example: "Artistic"
      primaryProfile: {
        type: String,
      },
    },
    // The date when the user completed the assessment
    completedAt: {
      type: Date,
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

const Assessment = mongoose.model('Assessment', assessmentSchema);

export default Assessment;