# HelloWorld Backend

Node.js/Express backend for the HelloWorld language learning app.

## Features

- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- JWT authentication and authorization
- Spaced repetition algorithm for flashcards
- User progress tracking
- Media content management

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user  
- `GET /api/auth/profile` - Get user profile

### Lessons
- `GET /api/lessons` - Get lessons for user's active language
- `GET /api/lessons/:id` - Get specific lesson with progress
- `POST /api/lessons/:id/progress` - Update lesson progress

### Flashcards
- `GET /api/decks` - Get user's flashcard decks
- `POST /api/decks` - Create new deck
- `GET /api/decks/:id/cards` - Get cards in a deck
- `POST /api/decks/:id/cards` - Add card to deck
- `GET /api/reviews` - Get cards due for review
- `POST /api/reviews` - Submit review result with rating

### Media
- `GET /api/media` - Get media items (filtered by language)
- `GET /api/media/categories` - Get available categories
- `GET /api/media/:id` - Get specific media item

### User
- `GET /api/user/stats` - Get user learning statistics
- `PATCH /api/user/preferences` - Update user preferences
- `DELETE /api/user/account` - Delete user account

## Database Models

### User
- email, password, username
- activeLanguage (fr/de)
- timestamps

### Lesson
- language, level, title
- dialogue, grammarTips
- vocabulary, exercises

### UserLessonProgress
- userId, lessonId
- completed, score, timeSpent

### Deck
- userId, name, description
- language, isPublic

### Card
- deckId, front, back
- hint, audioUrl, imageUrl

### ReviewLog
- cardId, userId
- spaced repetition data (easeFactor, intervalDays, etc.)

### MediaItem
- language, category, title
- description, sourceUrl
- transcriptOrLyrics, duration, difficulty

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/helloworld
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   ```

3. Start MongoDB

4. Seed database:
   ```bash
   node scripts/seedData.js
   ```

5. Start server:
   ```bash
   npm run dev
   ```

## Spaced Repetition Algorithm

The app implements a simplified SM-2 algorithm for flashcard reviews:

- Cards start with ease factor 2.5
- Intervals: 1 day → 6 days → calculated based on ease factor
- Ratings: 1=Again, 2=Hard, 3=Good, 4=Easy, 5=Perfect
- Ease factor adjusts based on performance

## Security

- Password hashing with bcrypt
- JWT tokens for authentication
- Input validation with express-validator
- CORS and helmet for security headers

## Development

```bash
npm run dev    # Start with nodemon
npm start      # Start production server
npm test       # Run tests (when implemented)
```
