const mongoose = require('mongoose');

const mediaItemSchema = new mongoose.Schema({
  language: {
    type: String,
    enum: ['fr', 'de'],
    required: true
  },
  category: {
    type: String,
    enum: ['podcast', 'literature', 'song', 'video'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  sourceUrl: {
    type: String,
    required: true
  },
  transcriptOrLyrics: {
    type: String
  },
  duration: {
    type: Number, // in minutes
    default: 0
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  thumbnailUrl: {
    type: String
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for efficient querying by language and category
mediaItemSchema.index({ language: 1, category: 1 });

module.exports = mongoose.model('MediaItem', mediaItemSchema);
