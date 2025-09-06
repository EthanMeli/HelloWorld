const express = require('express');
const { User, Deck, UserLessonProgress } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'email', 'username', 'activeLanguage', 'createdAt']
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get user statistics
    const deckCount = await Deck.count({
      where: { userId: user.id, isActive: true }
    });

    const completedLessons = await UserLessonProgress.count({
      where: { userId: user.id, completed: true }
    });

    const totalLessons = await UserLessonProgress.count({
      where: { userId: user.id }
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        activeLanguage: user.activeLanguage,
        memberSince: user.createdAt
      },
      stats: {
        deckCount,
        completedLessons,
        totalLessons,
        progressPercentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Update user profile
router.patch('/profile', authenticateToken, validateRequest(schemas.updateProfile), async (req, res) => {
  try {
    const { username, activeLanguage } = req.body;
    const userId = req.user.id;

    const updateData = {};
    if (username) updateData.username = username;
    if (activeLanguage) updateData.activeLanguage = activeLanguage;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    // Check if username is already taken (if updating username)
    if (username) {
      const existingUser = await User.findOne({
        where: { username, id: { $ne: userId } }
      });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }

    await User.update(updateData, {
      where: { id: userId }
    });

    const updatedUser = await User.findByPk(userId, {
      attributes: ['id', 'email', 'username', 'activeLanguage']
    });

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// Get user dashboard stats
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { activeLanguage } = req.user;

    // Get lesson progress
    const lessonStats = await UserLessonProgress.findAll({
      where: { userId },
      attributes: ['completed', 'score', 'lastViewedAt'],
      order: [['lastViewedAt', 'DESC']],
      limit: 5
    });

    const completedLessons = lessonStats.filter(stat => stat.completed).length;
    const averageScore = lessonStats.length > 0 
      ? Math.round(lessonStats.reduce((sum, stat) => sum + (stat.score || 0), 0) / lessonStats.length)
      : 0;

    // Get deck stats
    const deckStats = await Deck.findAll({
      where: { userId, language: activeLanguage, isActive: true },
      attributes: ['id', 'name', 'createdAt'],
      order: [['createdAt', 'DESC']],
      limit: 3
    });

    res.json({
      language: activeLanguage,
      lessonProgress: {
        completed: completedLessons,
        total: lessonStats.length,
        averageScore,
        recentActivity: lessonStats.slice(0, 3)
      },
      flashcards: {
        deckCount: deckStats.length,
        recentDecks: deckStats
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

module.exports = router;
