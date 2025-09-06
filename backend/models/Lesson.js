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
    max: 10
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
    type: String,
    required: true
  },
  vocabulary: [{
    word: String,
    translation: String,
    pronunciation: String
  }],
  exercises: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    explanation: String
  }]
}, {
  timestamps: true
});

// Index for efficient querying by language and level
lessonSchema.index({ language: 1, level: 1 });

module.exports = mongoose.model('Lesson', lessonSchema);
