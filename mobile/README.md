# HelloWorld Mobile App

React Native mobile application for the HelloWorld language learning platform.

## Features

- Cross-platform iOS and Android support
- Material Design with React Native Paper
- Tab-based navigation
- User authentication
- Progressive lessons with exercises
- Flashcard system with spaced repetition
- Media library with immersive content
- User profile and statistics

## Tech Stack

- React Native 0.76.3 with Expo SDK 53
- React Navigation (Stack + Bottom Tabs)
- React Native Paper (Material Design)
- Context API for state management
- Axios for API communication
- AsyncStorage for local data persistence
- Expo Router for enhanced navigation

## App Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context providers
│   └── AuthContext.js  # Authentication state management
├── navigation/         # Navigation configuration
│   ├── AppNavigator.js # Main app navigator
│   ├── AuthNavigator.js # Authentication flow
│   └── MainNavigator.js # Main app tabs
├── screens/           # App screens
│   ├── auth/         # Login/Register screens
│   ├── lessons/      # Lesson screens
│   ├── flashcards/   # Flashcard screens
│   ├── media/        # Media library screens
│   └── profile/      # Profile and settings
├── services/         # API services
│   └── api.js        # Axios configuration
└── theme/           # App theming
    └── theme.js     # Material Design theme
```

## Navigation Structure

### Authentication Flow
- Login Screen
- Register Screen (with language selection)

### Main App (Tab Navigation)
- **Lessons Tab**
  - Lessons List
  - Lesson Detail with exercises
- **Flashcards Tab**
  - Decks List
  - Deck Detail
  - Review Session
- **Media Tab**
  - Media Library
  - Media Detail
- **Profile Tab**
  - User Profile
  - Settings

## Key Features

### Authentication
- Email/password registration and login
- Language selection during registration
- JWT token management
- Automatic login persistence

### Lessons
- Progressive lesson system (10 per language)
- Interactive exercises with multiple choice
- Progress tracking
- Vocabulary and grammar tips

### Flashcards
- Create custom decks
- Add cards with front/back content
- Spaced repetition review system
- Performance tracking

### Media Library
- Categorized content (podcasts, literature, songs, videos)
- Language-specific filtering
- Difficulty levels
- Transcripts and lyrics

### Profile & Settings
- User statistics and progress
- Language switching
- Account management

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm start
   ```

3. Run on device/emulator:
   ```bash
   npm run ios      # iOS simulator
   npm run android  # Android emulator
   ```

## Configuration

Update the API base URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url/api';
```

For local development with physical device, use your computer's IP address:
```javascript
const API_BASE_URL = 'http://192.168.1.100:3000/api';
```

## State Management

The app uses React Context for state management:

### AuthContext
- User authentication state
- Login/logout functions
- User profile data
- Token management

## UI Components

Built with React Native Paper for consistent Material Design:

- Cards for content display
- Buttons with various styles
- Text inputs with validation
- Progress indicators
- Navigation components
- FAB (Floating Action Button)

## Responsive Design

- Adaptive layouts for different screen sizes
- Safe area handling
- Keyboard-aware scrolling
- Touch-friendly interface

## Development

```bash
npm start          # Start Expo dev server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run in web browser
```

## Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## Testing

The app includes basic error handling and loading states. For production, consider adding:
- Unit tests for components
- Integration tests for navigation
- E2E tests for user flows

## Performance

- Lazy loading of screens
- Optimized FlatList rendering
- Image optimization
- Efficient state updates

## Accessibility

- Screen reader support
- High contrast support
- Touch target sizing
- Semantic markup
