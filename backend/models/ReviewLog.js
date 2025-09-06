const mongoose = require('mongoose');

const reviewLogSchema = new mongoose.Schema({
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastReviewedAt: {
    type: Date,
    default: Date.now
  },
  easeFactor: {
    type: Number,
    default: 2.5,
    min: 1.3,
    max: 2.5
  },
  intervalDays: {
    type: Number,
    default: 1,
    min: 1
  },
  repetitions: {
    type: Number,
    default: 0,
    min: 0
  },
  dueAt: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5], // 1=Again, 2=Hard, 3=Good, 4=Easy, 5=Perfect
    required: true
  }
}, {
  timestamps: true
});

// Ensure one review log per user per card
reviewLogSchema.index({ userId: 1, cardId: 1 }, { unique: true });

module.exports = mongoose.model('ReviewLog', reviewLogSchema);
