const express = require('express');
const { body, validationResult } = require('express-validator');
const Deck = require('../models/Deck');
const Card = require('../models/Card');
const ReviewLog = require('../models/ReviewLog');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/decks
// @desc    Get user's decks
// @access  Private
router.get('/decks', auth, async (req, res) => {
  try {
    const decks = await Deck.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    // Get card count for each deck
    const decksWithCardCount = await Promise.all(
      decks.map(async (deck) => {
        const cardCount = await Card.countDocuments({ deckId: deck._id });
        return {
          ...deck.toObject(),
          cardCount
        };
      })
    );

    res.json(decksWithCardCount);
  } catch (error) {
    console.error('Get decks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/decks
// @desc    Create new deck
// @access  Private
router.post('/decks', [
  body('name').trim().isLength({ min: 1, max: 100 }),
  body('description').optional().trim().isLength({ max: 500 })
], auth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    const deck = new Deck({
      userId: req.user._id,
      name,
      description,
      language: req.user.activeLanguage
    });

    await deck.save();
    res.status(201).json(deck);
  } catch (error) {
    console.error('Create deck error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/decks/:id/cards
// @desc    Get cards in a deck
// @access  Private
router.get('/decks/:id/cards', auth, async (req, res) => {
  try {
    const deck = await Deck.findOne({ _id: req.params.id, userId: req.user._id });
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }

    const cards = await Card.find({ deckId: req.params.id });
    res.json(cards);
  } catch (error) {
    console.error('Get cards error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/decks/:id/cards
// @desc    Add card to deck
// @access  Private
router.post('/decks/:id/cards', [
  body('front').trim().isLength({ min: 1 }),
  body('back').trim().isLength({ min: 1 }),
  body('hint').optional().trim()
], auth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const deck = await Deck.findOne({ _id: req.params.id, userId: req.user._id });
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }

    const { front, back, hint, audioUrl, imageUrl } = req.body;

    const card = new Card({
      deckId: req.params.id,
      front,
      back,
      hint,
      audioUrl,
      imageUrl
    });

    await card.save();
    res.status(201).json(card);
  } catch (error) {
    console.error('Create card error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reviews
// @desc    Get cards due for review
// @access  Private
router.get('/reviews', auth, async (req, res) => {
  try {
    // Get user's decks
    const decks = await Deck.find({ userId: req.user._id });
    const deckIds = decks.map(deck => deck._id);

    // Get cards from user's decks that are due for review
    const cards = await Card.find({ deckId: { $in: deckIds } });
    const cardIds = cards.map(card => card._id);

    // Get review logs for these cards
    const reviewLogs = await ReviewLog.find({
      userId: req.user._id,
      cardId: { $in: cardIds },
      dueAt: { $lte: new Date() }
    }).populate('cardId');

    // If no cards are due, get new cards (cards without review logs)
    if (reviewLogs.length === 0) {
      const reviewedCardIds = await ReviewLog.distinct('cardId', { userId: req.user._id });
      const newCards = await Card.find({
        deckId: { $in: deckIds },
        _id: { $nin: reviewedCardIds }
      }).limit(10);

      return res.json(newCards);
    }

    res.json(reviewLogs.map(log => log.cardId));
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/reviews
// @desc    Submit review result
// @access  Private
router.post('/reviews', [
  body('cardId').isMongoId(),
  body('rating').isInt({ min: 1, max: 5 })
], auth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cardId, rating } = req.body;

    // Check if card belongs to user
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    const deck = await Deck.findOne({ _id: card.deckId, userId: req.user._id });
    if (!deck) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get or create review log
    let reviewLog = await ReviewLog.findOne({ userId: req.user._id, cardId });

    if (!reviewLog) {
      reviewLog = new ReviewLog({
        userId: req.user._id,
        cardId,
        rating,
        easeFactor: 2.5,
        intervalDays: 1,
        repetitions: 0
      });
    } else {
      reviewLog.rating = rating;
      reviewLog.lastReviewedAt = new Date();
    }

    // Update spaced repetition parameters based on rating
    if (rating >= 3) {
      // Good or better
      reviewLog.repetitions += 1;
      
      if (reviewLog.repetitions === 1) {
        reviewLog.intervalDays = 1;
      } else if (reviewLog.repetitions === 2) {
        reviewLog.intervalDays = 6;
      } else {
        reviewLog.intervalDays = Math.round(reviewLog.intervalDays * reviewLog.easeFactor);
      }

      // Adjust ease factor
      reviewLog.easeFactor = Math.max(1.3, reviewLog.easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02)));
    } else {
      // Again or Hard
      reviewLog.repetitions = 0;
      reviewLog.intervalDays = 1;
      reviewLog.easeFactor = Math.max(1.3, reviewLog.easeFactor - 0.2);
    }

    // Calculate next due date
    reviewLog.dueAt = new Date(Date.now() + reviewLog.intervalDays * 24 * 60 * 60 * 1000);

    await reviewLog.save();
    res.json(reviewLog);
  } catch (error) {
    console.error('Submit review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
