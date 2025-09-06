const mongoose = require('mongoose');

const userLessonProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    min: 0,
    max: 100
  },
  timeSpent: {
    type: Number, // Time spent in seconds
    min: 0
  },
  lastViewedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

userLessonProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });
userLessonProgressSchema.index({ userId: 1, completed: 1 });

module.exports = mongoose.model('UserLessonProgress', userLessonProgressSchema);
