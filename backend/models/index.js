const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/helloworld_db');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Import models
const User = require('./User');
const Lesson = require('./Lesson');
const UserLessonProgress = require('./UserLessonProgress');
const Deck = require('./Deck');
const Card = require('./Card');
const ReviewLog = require('./ReviewLog');
const MediaItem = require('./MediaItem');

module.exports = {
  connectDB,
  User,
  Lesson,
  UserLessonProgress,
  Deck,
  Card,
  ReviewLog,
  MediaItem
};
