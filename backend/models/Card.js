const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  deckId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
    required: true
  },
  front: {
    type: String,
    required: true,
    trim: true
  },
  back: {
    type: String,
    required: true,
    trim: true
  },
  hint: {
    type: String,
    trim: true
  },
  audioUrl: {
    type: String
  },
  imageUrl: {
    type: String
  }
}, {
  timestamps: true
});

// Index for efficient querying by deck
cardSchema.index({ deckId: 1 });

module.exports = mongoose.model('Card', cardSchema);
