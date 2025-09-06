const express = require('express');
const { Deck, Card, ReviewLog } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');

const router = express.Router();

// Get all decks for user
router.get('/decks', authenticateToken, async (req, res) => {
  try {
    const decks = await Deck.find({
      userId: req.user.id,
      isActive: true
    }).sort({ createdAt: -1 });

    const decksWithStats = await Promise.all(
      decks.map(async (deck) => {
        const cardCount = await Card.countDocuments({
          deckId: deck._id,
          isActive: true
        });

        return {
          id: deck.id,
          name: deck.name,
          description: deck.description,
          language: deck.language,
          cardCount,
          createdAt: deck.createdAt
        };
      })
    );

    res.json({ decks: decksWithStats });
  } catch (error) {
    console.error('Error fetching decks:', error);
    res.status(500).json({ error: 'Failed to fetch decks' });
  }
});

// Create new deck
router.post('/decks', authenticateToken, validateRequest(schemas.createDeck), async (req, res) => {
  try {
    const { name, description, language } = req.body;

    const deck = new Deck({
      userId: req.user.id,
      name,
      description,
      language
    });
    await deck.save();

    res.status(201).json({
      message: 'Deck created successfully',
      deck: {
        id: deck.id,
        name: deck.name,
        description: deck.description,
        language: deck.language,
        cardCount: 0
      }
    });
  } catch (error) {
    console.error('Error creating deck:', error);
    res.status(500).json({ error: 'Failed to create deck' });
  }
});

// Get cards in a deck
router.get('/decks/:deckId/cards', authenticateToken, async (req, res) => {
  try {
    const { deckId } = req.params;

    // Verify deck ownership
    const deck = await Deck.findOne({
      where: {
        id: deckId,
        userId: req.user.id,
        isActive: true
      }
    });

    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    const cards = await Card.findAll({
      where: {
        deckId,
        isActive: true
      },
      include: [{
        model: ReviewLog,
        as: 'reviews',
        where: { userId: req.user.id },
        required: false
      }],
      order: [['createdAt', 'ASC']]
    });

    const cardsWithProgress = cards.map(card => {
      const review = card.reviews?.[0];
      return {
        id: card.id,
        front: card.front,
        back: card.back,
        hint: card.hint,
        difficulty: card.difficulty,
        reviewStats: review ? {
          lastReviewed: review.lastReviewedAt,
          dueAt: review.dueAt,
          easeFactor: review.easeFactor,
          intervalDays: review.intervalDays,
          repetitions: review.repetitions
        } : null
      };
    });

    res.json({
      deck: {
        id: deck.id,
        name: deck.name,
        description: deck.description,
        language: deck.language
      },
      cards: cardsWithProgress
    });
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

// Add card to deck
router.post('/decks/:deckId/cards', authenticateToken, validateRequest(schemas.createCard), async (req, res) => {
  try {
    const { deckId } = req.params;
    const { front, back, hint, difficulty } = req.body;

    // Verify deck ownership
    const deck = await Deck.findOne({
      where: {
        id: deckId,
        userId: req.user.id,
        isActive: true
      }
    });

    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    const card = await Card.create({
      deckId,
      front,
      back,
      hint,
      difficulty: difficulty || 1
    });

    res.status(201).json({
      message: 'Card created successfully',
      card: {
        id: card.id,
        front: card.front,
        back: card.back,
        hint: card.hint,
        difficulty: card.difficulty
      }
    });
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ error: 'Failed to create card' });
  }
});

// Get cards due for review
router.get('/review', authenticateToken, async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const now = new Date();

    // Get cards due for review
    const dueCards = await Card.findAll({
      include: [
        {
          model: Deck,
          as: 'deck',
          where: {
            userId: req.user.id,
            language: req.user.activeLanguage,
            isActive: true
          }
        },
        {
          model: ReviewLog,
          as: 'reviews',
          where: {
            userId: req.user.id,
            dueAt: { [Op.lte]: now }
          },
          required: false
        }
      ],
      where: { isActive: true },
      order: [['reviews', 'dueAt', 'ASC']],
      limit: parseInt(limit)
    });

    // Include new cards (never reviewed)
    const newCards = await Card.findAll({
      include: [
        {
          model: Deck,
          as: 'deck',
          where: {
            userId: req.user.id,
            language: req.user.activeLanguage,
            isActive: true
          }
        }
      ],
      where: {
        isActive: true,
        '$reviews.id$': null
      },
      include: [{
        model: ReviewLog,
        as: 'reviews',
        where: { userId: req.user.id },
        required: false
      }],
      limit: Math.max(0, parseInt(limit) - dueCards.length)
    });

    const allCards = [...dueCards, ...newCards].map(card => ({
      id: card.id,
      front: card.front,
      back: card.back,
      hint: card.hint,
      difficulty: card.difficulty,
      deckName: card.deck.name,
      isNew: !card.reviews || card.reviews.length === 0
    }));

    res.json({
      cards: allCards,
      totalDue: allCards.length
    });
  } catch (error) {
    console.error('Error fetching review cards:', error);
    res.status(500).json({ error: 'Failed to fetch review cards' });
  }
});

// Submit card review (Spaced Repetition)
router.post('/review/:cardId', authenticateToken, validateRequest(schemas.reviewCard), async (req, res) => {
  try {
    const { cardId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    // Verify card exists and user has access
    const card = await Card.findOne({
      include: [{
        model: Deck,
        as: 'deck',
        where: {
          userId,
          isActive: true
        }
      }],
      where: {
        id: cardId,
        isActive: true
      }
    });

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Get existing review or create default values
    let existingReview = await ReviewLog.findOne({
      where: { cardId, userId }
    });

    let easeFactor = existingReview?.easeFactor || 2.5;
    let intervalDays = existingReview?.intervalDays || 1;
    let repetitions = existingReview?.repetitions || 0;

    // SM2 Algorithm implementation
    if (rating >= 3) {
      // Correct response
      if (repetitions === 0) {
        intervalDays = 1;
      } else if (repetitions === 1) {
        intervalDays = 6;
      } else {
        intervalDays = Math.round(intervalDays * easeFactor);
      }
      repetitions++;
    } else {
      // Incorrect response
      repetitions = 0;
      intervalDays = 1;
    }

    // Update ease factor
    easeFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
    easeFactor = Math.max(1.3, easeFactor);

    // Calculate next due date
    const dueAt = new Date();
    dueAt.setDate(dueAt.getDate() + intervalDays);

    // Update or create review log
    await ReviewLog.upsert({
      cardId,
      userId,
      lastReviewedAt: new Date(),
      easeFactor,
      intervalDays,
      repetitions,
      dueAt,
      rating
    });

    res.json({
      message: 'Review recorded successfully',
      nextReview: dueAt,
      intervalDays,
      easeFactor: Math.round(easeFactor * 100) / 100
    });
  } catch (error) {
    console.error('Error recording review:', error);
    res.status(500).json({ error: 'Failed to record review' });
  }
});

module.exports = router;
