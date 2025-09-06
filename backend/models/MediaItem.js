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
    required: true
  },
  description: {
    type: String
  },
  sourceUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Invalid URL format'
    }
  },
  transcriptOrLyrics: {
    type: String
  },
  duration: {
    type: Number,
    min: 0,
    comment: 'Duration in seconds'
  },
  difficulty: {
    type: Number,
    default: 1,
    min: 1,
    max: 5,
    required: true
  },
  thumbnailUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Invalid URL format'
    }
  },
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

mediaItemSchema.index({ language: 1, category: 1 });
mediaItemSchema.index({ language: 1, isActive: 1 });
mediaItemSchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model('MediaItem', mediaItemSchema);
