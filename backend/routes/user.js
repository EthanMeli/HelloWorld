const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const UserLessonProgress = require('../models/UserLessonProgress');
const Deck = require('../models/Deck');
const ReviewLog = require('../models/ReviewLog');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/user/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    // Get lesson progress stats
    const totalLessons = await UserLessonProgress.countDocuments({ userId: req.user._id });
    const completedLessons = await UserLessonProgress.countDocuments({ 
      userId: req.user._id, 
      completed: true 
    });

    // Get flashcard stats
    const totalDecks = await Deck.countDocuments({ userId: req.user._id });
    const totalCards = await ReviewLog.countDocuments({ userId: req.user._id });
    const cardsReviewed = await ReviewLog.countDocuments({ 
      userId: req.user._id,
      repetitions: { $gt: 0 }
    });

    // Get streak (consecutive days with reviews)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const reviewsToday = await ReviewLog.countDocuments({
      userId: req.user._id,
      lastReviewedAt: { $gte: today }
    });

    res.json({
      lessons: {
        total: totalLessons,
        completed: completedLessons,
        progress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
      },
      flashcards: {
        totalDecks,
        totalCards,
        cardsReviewed,
        progress: totalCards > 0 ? Math.round((cardsReviewed / totalCards) * 100) : 0
      },
      streak: reviewsToday > 0 ? 1 : 0 // Simplified streak calculation
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/user/preferences
// @desc    Update user preferences (including language)
// @access  Private
router.patch('/preferences', [
  body('activeLanguage').optional().isIn(['fr', 'de']),
  body('username').optional().trim().isLength({ min: 1, max: 50 })
], auth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { activeLanguage, username } = req.body;
    const updateData = {};

    if (activeLanguage) {
      updateData.activeLanguage = activeLanguage;
    }

    if (username) {
      updateData.username = username;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, select: '-password' }
    );

    res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        activeLanguage: user.activeLanguage,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/user/account
// @desc    Delete user account
// @access  Private
router.delete('/account', auth, async (req, res) => {
  try {
    // Delete all user data
    await Promise.all([
      UserLessonProgress.deleteMany({ userId: req.user._id }),
      Deck.deleteMany({ userId: req.user._id }),
      ReviewLog.deleteMany({ userId: req.user._id }),
      User.findByIdAndDelete(req.user._id)
    ]);

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
