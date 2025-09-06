const express = require('express');
const { User, Lesson, UserLessonProgress, Deck, Card, ReviewLog } = require('../models');
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

    res.json({ user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.patch('/profile', authenticateToken, validateRequest(schemas.updateProfile), async (req, res) => {
  try {
    const { username, activeLanguage } = req.body;
    const userId = req.user.id;

    // Check if username is already taken (if updating username)
    if (username) {
      const existingUser = await User.findOne({
        where: {
          username,
          id: { $ne: userId }
        }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }

    // Update user
    const [updatedRowsCount] = await User.update(
      { 
        ...(username && { username }),
        ...(activeLanguage && { activeLanguage })
      },
      { where: { id: userId } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch updated user
    const updatedUser = await User.findByPk(userId, {
      attributes: ['id', 'email', 'username', 'activeLanguage', 'createdAt']
    });

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
