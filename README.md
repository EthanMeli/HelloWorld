# HelloWorld Language Learning App - MVP

A React Native mobile application for learning French and German, featuring progressive lessons, spaced repetition flashcards, and immersive media content.

## 🏗️ Project Structure

```
HelloWorld/
├── backend/                 # Node.js + Express API
│   ├── models/             # Sequelize database models
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication & validation
│   ├── scripts/            # Database seeding
│   └── server.js           # Main server file
├── frontend/               # React Native app
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── screens/        # App screens
│   │   ├── navigation/     # Navigation configuration
│   │   ├── store/          # Redux store & slices
│   │   ├── services/       # API services
│   │   └── theme/          # App theme & styling
│   └── App.js              # Main app entry point
└── PRD.md                  # Product Requirements Document
```

## ✨ Features

### Core Features
- **User Authentication**: Registration, login with JWT tokens
- **Language Selection**: Choose between French or German
- **Progressive Lessons**: 10 lessons per language with dialogues and grammar
- **Spaced Repetition Flashcards**: Create decks, review with SM2 algorithm
- **Media Content**: Podcasts, literature, songs, and videos
- **Progress Tracking**: Track lesson completion and flashcard reviews

### Technical Features
- **Cross-platform**: iOS and Android support
- **Offline-ready**: Redux Persist for state management
- **Type-safe**: TypeScript throughout the frontend
- **Modern UI**: React Native Paper components
- **RESTful API**: Express.js backend with PostgreSQL

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- React Native development environment
- iOS Simulator or Android Emulator

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Setup database**:
   ```bash
   # Create PostgreSQL database
   createdb helloworld_db
   
   # Seed with sample data
   npm run seed
   ```

5. **Start the server**:
   ```bash
   npm run dev
   ```

Backend will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**:
   ```bash
   npm start
   ```

5. **Run on device/simulator**:
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   ```

## 📱 App Navigation

### Authentication Flow
- **Welcome Screen**: App introduction with sign-in/register options
- **Login Screen**: Email/password authentication
- **Register Screen**: Account creation with language selection

### Main App Tabs
1. **Lessons**: Browse and complete language lessons
2. **Flashcards**: Create decks, add cards, and review
3. **Media**: Explore podcasts, literature, songs, and videos
4. **Profile**: User settings and progress stats

## 🗄️ Database Schema

### Core Models
- **Users**: Authentication and language preferences
- **Lessons**: Structured language content with dialogues
- **Decks & Cards**: Flashcard system
- **ReviewLog**: Spaced repetition tracking
- **MediaItems**: Audio, video, and text content
- **UserLessonProgress**: Lesson completion tracking

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Lessons
- `GET /api/lessons` - Get lessons for user's language
- `GET /api/lessons/:id` - Get lesson details
- `POST /api/lessons/:id/progress` - Update lesson progress

### Flashcards
- `GET /api/flashcards/decks` - Get user's decks
- `POST /api/flashcards/decks` - Create new deck
- `GET /api/flashcards/decks/:id/cards` - Get cards in deck
- `POST /api/flashcards/decks/:id/cards` - Add card to deck
- `GET /api/flashcards/review` - Get cards due for review
- `POST /api/flashcards/review/:cardId` - Submit card review

### Media
- `GET /api/media` - Get media categories
- `GET /api/media/:category` - Get media items by category
- `GET /api/media/:category/:id` - Get media item details

### User
- `GET /api/user/profile` - Get user profile
- `PATCH /api/user/profile` - Update user profile
- `GET /api/user/dashboard` - Get user dashboard stats

## 🎯 MVP Scope

This MVP includes:
- ✅ User registration/login with language selection
- ✅ 10 progressive lessons per language (French & German)
- ✅ Flashcard creation and spaced repetition system
- ✅ Media content browsing (5+ items per category)
- ✅ User profiles with language switching
- ✅ Progress tracking for lessons and flashcards

## 🔮 Future Enhancements

- AI-powered grammar corrections
- Community features (forums, chat)
- Additional languages
- Gamification (badges, leaderboards)
- Offline mode
- Voice recognition
- Advanced analytics

## 🛠️ Development Commands

### Backend
```bash
npm run dev          # Start development server
npm run start        # Start production server
npm run seed         # Seed database with sample data
npm test             # Run tests
```

### Frontend
```bash
npm start            # Start Metro bundler
npm run ios          # Run on iOS simulator
npm run android      # Run on Android emulator
npm run lint         # Run ESLint
npm test             # Run tests
```

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=helloworld_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or support, please open an issue in the repository.

---

**HelloWorld Team** - Learning languages, one lesson at a time! 🌍
