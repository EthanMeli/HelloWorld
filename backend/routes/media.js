const express = require('express');
const { MediaItem } = require('../models');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all media items by category
router.get('/:category', authenticateToken, async (req, res) => {
  try {
    const { category } = req.params;
    const { activeLanguage } = req.user;

    const validCategories = ['podcast', 'literature', 'song', 'video'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const mediaItems = await MediaItem.findAll({
      where: {
        language: activeLanguage,
        category,
        isActive: true
      },
      order: [['createdAt', 'DESC']],
      attributes: [
        'id', 'title', 'description', 'sourceUrl', 
        'duration', 'difficulty', 'thumbnailUrl', 'createdAt'
      ]
    });

    res.json({
      category,
      language: activeLanguage,
      items: mediaItems,
      total: mediaItems.length
    });
  } catch (error) {
    console.error('Error fetching media items:', error);
    res.status(500).json({ error: 'Failed to fetch media items' });
  }
});

// Get specific media item with transcript/lyrics
router.get('/:category/:id', authenticateToken, async (req, res) => {
  try {
    const { category, id } = req.params;
    const { activeLanguage } = req.user;

    const mediaItem = await MediaItem.findOne({
      where: {
        id,
        language: activeLanguage,
        category,
        isActive: true
      }
    });

    if (!mediaItem) {
      return res.status(404).json({ error: 'Media item not found' });
    }

    res.json({
      id: mediaItem.id,
      title: mediaItem.title,
      description: mediaItem.description,
      sourceUrl: mediaItem.sourceUrl,
      transcriptOrLyrics: mediaItem.transcriptOrLyrics,
      duration: mediaItem.duration,
      difficulty: mediaItem.difficulty,
      thumbnailUrl: mediaItem.thumbnailUrl,
      category: mediaItem.category,
      language: mediaItem.language
    });
  } catch (error) {
    console.error('Error fetching media item:', error);
    res.status(500).json({ error: 'Failed to fetch media item' });
  }
});

// Get all categories with counts
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { activeLanguage } = req.user;

    const categories = ['podcast', 'literature', 'song', 'video'];
    const categoryStats = await Promise.all(
      categories.map(async (category) => {
        const count = await MediaItem.count({
          where: {
            language: activeLanguage,
            category,
            isActive: true
          }
        });
        return { category, count };
      })
    );

    res.json({
      language: activeLanguage,
      categories: categoryStats,
      totalItems: categoryStats.reduce((sum, cat) => sum + cat.count, 0)
    });
  } catch (error) {
    console.error('Error fetching media categories:', error);
    res.status(500).json({ error: 'Failed to fetch media categories' });
  }
});

module.exports = router;
