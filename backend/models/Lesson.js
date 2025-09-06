const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  language: {
    type: String,
    enum: ['fr', 'de'],
    required: true
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  dialogue: {
    type: String,
    required: true
  },
  grammarTips: {
    type: String
  },
  vocabulary: [{
    word: String,
    translation: String,
    pronunciation: String
  }],
  isActive: {
    type: Boolean,
    default: true
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

lessonSchema.index({ language: 1, level: 1 });
lessonSchema.index({ language: 1, isActive: 1 });

module.exports = mongoose.model('Lesson', lessonSchema);
