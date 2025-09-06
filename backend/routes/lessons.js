const express = require('express');
const { Lesson, UserLessonProgress } = require('../models');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all lessons for user's active language
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { activeLanguage } = req.user;
    
    const lessons = await Lesson.find({
      language: activeLanguage,
      isActive: true
    }).sort({ level: 1 });

    // Get user progress for these lessons
    const lessonIds = lessons.map(lesson => lesson._id);
    const progressRecords = await UserLessonProgress.find({
      userId: req.user.id,
      lessonId: { $in: lessonIds }
    });

    // Create a map for quick lookup
    const progressMap = {};
    progressRecords.forEach(progress => {
      progressMap[progress.lessonId.toString()] = progress;
    });

    const lessonsWithProgress = lessons.map(lesson => {
      const progress = progressMap[lesson._id.toString()];
      return {
        id: lesson.id,
        title: lesson.title,
        level: lesson.level,
        language: lesson.language,
        completed: progress?.completed || false,
        score: progress?.score || null,
        lastViewedAt: progress?.lastViewedAt || null
      };
    });

    res.json({
      lessons: lessonsWithProgress,
      total: lessons.length
    });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

// Get specific lesson details
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { activeLanguage } = req.user;

    const lesson = await Lesson.findOne({
      _id: id,
      language: activeLanguage,
      isActive: true
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Get user progress for this lesson
    const progress = await UserLessonProgress.findOne({
      userId: req.user.id,
      lessonId: id
    });

    res.json({
      id: lesson.id,
      title: lesson.title,
      level: lesson.level,
      language: lesson.language,
      dialogue: lesson.dialogue,
      grammarTips: lesson.grammarTips,
      vocabulary: lesson.vocabulary,
      progress: {
        completed: progress?.completed || false,
        score: progress?.score || null,
        timeSpent: progress?.timeSpent || null,
        lastViewedAt: progress?.lastViewedAt || null
      }
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({ error: 'Failed to fetch lesson' });
  }
});

// Update lesson progress
router.post('/:id/progress', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { completed, score, timeSpent } = req.body;
    const userId = req.user.id;

    // Verify lesson exists and belongs to user's active language
    const lesson = await Lesson.findOne({
      _id: id,
      language: req.user.activeLanguage,
      isActive: true
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Update or create progress using findOneAndUpdate with upsert
    const progress = await UserLessonProgress.findOneAndUpdate(
      { userId, lessonId: id },
      {
        userId,
        lessonId: id,
        completed: completed || false,
        score: score || null,
        timeSpent: timeSpent || null,
        lastViewedAt: new Date()
      },
      { 
        upsert: true, 
        new: true,
        runValidators: true
      }
    );

    res.json({
      message: 'Progress updated',
      progress: {
        completed: progress.completed,
        score: progress.score,
        timeSpent: progress.timeSpent,
        lastViewedAt: progress.lastViewedAt
      }
    });
  } catch (error) {
    console.error('Error updating lesson progress:', error);
    res.status(500).json({ error: 'Failed to update lesson progress' });
  }
});

module.exports = router;
