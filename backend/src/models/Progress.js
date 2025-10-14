import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lessonId: {
    type: Number,
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  },
  timeSpent: {
    type: Number, // in seconds
    default: 0
  },
  isCompleted: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Ensure one progress record per user per lesson
progressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;