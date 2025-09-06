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
    default: Date.now,
    required: true
  },
  easeFactor: {
    type: Number,
    default: 2.5,
    min: 1.3,
    max: 3.0,
    required: true
  },
  intervalDays: {
    type: Number,
    default: 1,
    min: 1,
    required: true
  },
  repetitions: {
    type: Number,
    default: 0,
    min: 0,
    required: true
  },
  dueAt: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
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

reviewLogSchema.index({ cardId: 1, userId: 1 }, { unique: true });
reviewLogSchema.index({ userId: 1, dueAt: 1 });
reviewLogSchema.index({ dueAt: 1 });

module.exports = mongoose.model('ReviewLog', reviewLogSchema);
