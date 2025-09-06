# HelloWorld - Language Learning App MVP

A mobile language learning application built with React Native (frontend) and Node.js/Express (backend) to help English speakers learn French or German.

## Features

- **Progressive Lessons**: 10 lessons per language with dialogues, grammar tips, and exercises
- **Flashcard System**: Create decks and review cards with spaced repetition algorithm
- **Media Library**: Immersive content including podcasts, literature, songs, and videos
- **User Profiles**: Language selection, progress tracking, and statistics
- **Cross-platform**: Works on both iOS and Android

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication
- RESTful API

### Frontend
- React Native with Expo
- React Navigation
- React Native Paper (Material Design)
- Context API for state management

## Project Structure

```
HelloWorld/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Database configuration
│   ├── middleware/         # Authentication middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── scripts/           # Database seeding scripts
│   └── server.js          # Main server file
├── mobile/                # React Native frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context providers
│   │   ├── navigation/    # Navigation configuration
│   │   ├── screens/       # App screens
│   │   ├── services/      # API services
│   │   └── theme/         # App theme
│   ├── App.js             # Main app component
│   └── package.json       # Dependencies
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Expo CLI (`npm install -g expo-cli`)
- React Native development environment

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/helloworld
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   ```

4. Start MongoDB (if running locally)

5. Seed the database with sample data:
   ```bash
   npm run seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The backend will be running on `http://localhost:3000`

### Frontend Setup

1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npm start
   ```

4. Use the Expo Go app on your phone to scan the QR code, or run on an emulator:
   - iOS: `npm run ios`
   - Android: `npm run android`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Lessons
- `GET /api/lessons` - Get lessons for user's language
- `GET /api/lessons/:id` - Get specific lesson
- `POST /api/lessons/:id/progress` - Update lesson progress

### Flashcards
- `GET /api/decks` - Get user's decks
- `POST /api/decks` - Create new deck
- `GET /api/decks/:id/cards` - Get cards in deck
- `POST /api/decks/:id/cards` - Add card to deck
- `GET /api/reviews` - Get cards due for review
- `POST /api/reviews` - Submit review result

### Media
- `GET /api/media` - Get media items
- `GET /api/media/categories` - Get available categories
- `GET /api/media/:id` - Get specific media item

### User
- `GET /api/user/stats` - Get user statistics
- `PATCH /api/user/preferences` - Update user preferences

## Sample Data

The app includes sample data for:
- 10 French lessons (basic greetings, numbers, family, etc.)
- 10 German lessons (basic greetings, numbers, family, etc.)
- Media content (podcasts, literature, songs, videos) for both languages

## Features Implemented

### ✅ Core Features
- User authentication (register/login)
- Language selection (French/German)
- Progressive lesson system
- Flashcard creation and review
- Spaced repetition algorithm
- Media library with categories
- User profile and statistics
- Cross-platform mobile app

### 🔄 Future Enhancements
- AI grammar corrections
- Community features (forums, chat)
- More languages
- Gamification (badges, leaderboards)
- Offline mode
- Voice recognition
- Advanced analytics

## Development

### Backend Development
```bash
cd backend
npm run dev  # Start with nodemon for auto-restart
```

### Frontend Development
```bash
cd mobile
npm start    # Start Expo development server
```

### Database Seeding
```bash
cd backend
node scripts/seedData.js
```

## Testing

The MVP includes basic error handling and validation. For production, consider adding:
- Unit tests for backend API endpoints
- Integration tests for database operations
- Frontend component testing
- End-to-end testing

## Deployment

### Backend Deployment
- Deploy to Heroku, AWS, or similar platform
- Set up MongoDB Atlas for production database
- Configure environment variables

### Frontend Deployment
- Build for iOS App Store
- Build for Google Play Store
- Use Expo Application Services (EAS) for builds

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please create an issue in the repository or contact the development team.
