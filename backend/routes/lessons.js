const express = require('express');
const Lesson = require('../models/Lesson');
const UserLessonProgress = require('../models/UserLessonProgress');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/lessons
// @desc    Get lessons for user's active language
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const lessons = await Lesson.find({ language: req.user.activeLanguage })
      .sort({ level: 1 });

    // Get user progress for each lesson
    const progressPromises = lessons.map(async (lesson) => {
      const progress = await UserLessonProgress.findOne({
        userId: req.user._id,
        lessonId: lesson._id
      });
      return {
        ...lesson.toObject(),
        progress: progress || {
          completed: false,
          score: 0,
          timeSpent: 0
        }
      };
    });

    const lessonsWithProgress = await Promise.all(progressPromises);

    res.json(lessonsWithProgress);
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/lessons/:id
// @desc    Get specific lesson
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Check if lesson is for user's active language
    if (lesson.language !== req.user.activeLanguage) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get user progress
    const progress = await UserLessonProgress.findOne({
      userId: req.user._id,
      lessonId: lesson._id
    });

    res.json({
      ...lesson.toObject(),
      progress: progress || {
        completed: false,
        score: 0,
        timeSpent: 0
      }
    });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/lessons/:id/progress
// @desc    Update lesson progress
// @access  Private
router.post('/:id/progress', auth, async (req, res) => {
  try {
    const { completed, score, timeSpent } = req.body;

    const lesson = await Lesson.findById(req.params.id);
    if (!lesson || lesson.language !== req.user.activeLanguage) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const progress = await UserLessonProgress.findOneAndUpdate(
      { userId: req.user._id, lessonId: req.params.id },
      {
        completed: completed || false,
        score: score || 0,
        timeSpent: timeSpent || 0,
        lastViewedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.json(progress);
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
