const express = require('express');
const MediaItem = require('../models/MediaItem');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/media
// @desc    Get media items for user's active language
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    
    let query = { language: req.user.activeLanguage };
    
    if (category) {
      query.category = category;
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }

    const mediaItems = await MediaItem.find(query)
      .sort({ createdAt: -1 });

    res.json(mediaItems);
  } catch (error) {
    console.error('Get media error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/media/categories
// @desc    Get available categories for user's active language
// @access  Private
router.get('/categories', auth, async (req, res) => {
  try {
    const categories = await MediaItem.distinct('category', { 
      language: req.user.activeLanguage 
    });
    
    const categoryCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await MediaItem.countDocuments({
          language: req.user.activeLanguage,
          category
        });
        return { category, count };
      })
    );

    res.json(categoryCounts);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/media/:id
// @desc    Get specific media item
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const mediaItem = await MediaItem.findById(req.params.id);
    
    if (!mediaItem) {
      return res.status(404).json({ message: 'Media item not found' });
    }

    // Check if media item is for user's active language
    if (mediaItem.language !== req.user.activeLanguage) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(mediaItem);
  } catch (error) {
    console.error('Get media item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
