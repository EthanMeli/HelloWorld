import express from "express";
import User from "../models/User.js";
import Progress from "../models/Progress.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

// Get user progress dashboard data
router.get("/dashboard", protectRoute, async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user with populated progress
    const user = await User.findById(userId).select('-password');
    const progressRecords = await Progress.find({ userId }).sort({ completedAt: -1 });

    // Calculate stats
    const totalLessons = 10; // This should come from your lessons count
    const completedLessons = user.completedLessons.length;
    const streakCount = user.streakCount;

    // Calculate weekly progress (lessons completed this week)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyLessons = progressRecords.filter(p => p.completedAt >= oneWeekAgo).length;

    // Calculate total study time
    const totalStudyTime = progressRecords.reduce((total, record) => total + record.timeSpent, 0);

    const dashboardData = {
      user: {
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        joinDate: user.createdAt
      },
      progress: {
        lessonsCompleted: completedLessons,
        totalLessons: totalLessons,
        weeklyLessons: weeklyLessons,
        streakCount: streakCount,
        totalStudyTime: totalStudyTime,
        completedLessonIds: user.completedLessons
      },
      recentActivity: progressRecords.slice(0, 5) // Last 5 activities
    };

    res.json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Complete a lesson
router.post("/lesson/:lessonId/complete", protectRoute, async (req, res) => {
  try {
    const userId = req.user._id;
    const lessonId = parseInt(req.params.lessonId);
    const { timeSpent = 0 } = req.body;

    // Check if lesson already completed
    const existingProgress = await Progress.findOne({ userId, lessonId });
    
    if (existingProgress) {
      return res.status(400).json({ message: "Lesson already completed" });
    }

    // Create progress record
    const progress = new Progress({
      userId,
      lessonId,
      timeSpent,
      completedAt: new Date()
    });

    await progress.save();

    // Update user progress
    const user = await User.findById(userId);
    
    if (!user.completedLessons.includes(lessonId)) {
      user.completedLessons.push(lessonId);
      user.totalLessonsCompleted += 1;

      // Update streak
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const lastActivity = user.lastActivityDate ? new Date(user.lastActivityDate) : null;
      
      if (lastActivity) {
        lastActivity.setHours(0, 0, 0, 0);
        const daysDiff = (today - lastActivity) / (1000 * 60 * 60 * 24);
        
        if (daysDiff === 1) {
          // Consecutive day - increment streak
          user.streakCount += 1;
        } else if (daysDiff > 1) {
          // Gap in activity - reset streak
          user.streakCount = 1;
        }
        // If daysDiff === 0, it's the same day, don't change streak
      } else {
        // First activity
        user.streakCount = 1;
      }
      
      user.lastActivityDate = new Date();
      await user.save();
    }

    res.json({ 
      message: "Lesson completed successfully",
      progress: {
        lessonId,
        completedAt: progress.completedAt,
        streakCount: user.streakCount,
        totalCompleted: user.totalLessonsCompleted
      }
    });
  } catch (error) {
    console.error("Error completing lesson:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Test endpoint to increment streak (for testing only)
router.post("/test-streak", protectRoute, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    
    // Simulate activity on a new day
    const nextDay = user.lastActivityDate ? new Date(user.lastActivityDate) : new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    
    user.streakCount += 1;
    user.lastActivityDate = nextDay;
    await user.save();

    res.json({ 
      message: "Streak incremented for testing",
      streakCount: user.streakCount,
      lastActivityDate: user.lastActivityDate
    });
  } catch (error) {
    console.error("Error incrementing test streak:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Check lesson status
router.get("/lesson/:lessonId/status", protectRoute, async (req, res) => {
  try {
    const userId = req.user._id;
    const lessonId = parseInt(req.params.lessonId);

    const user = await User.findById(userId);
    const isCompleted = user.completedLessons.includes(lessonId);
    const progress = await Progress.findOne({ userId, lessonId });

    res.json({
      isCompleted,
      progress: progress || null
    });
  } catch (error) {
    console.error("Error checking lesson status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;