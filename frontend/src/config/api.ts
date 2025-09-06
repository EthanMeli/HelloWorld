import Constants from 'expo-constants';

// Determine the API base URL based on environment
const getApiBaseUrl = (): string => {
  // In development, use localhost
  if (__DEV__) {
    // For Android emulator
    if (Constants.platform?.android) {
      return 'http://10.0.2.2:3000/api';
    }
    // For iOS simulator and physical devices on same network
    return 'http://localhost:3000/api';
  }
  
  // In production, use your Render backend URL
  return 'https://helloworld-backend.onrender.com/api';
};

export const API_BASE_URL = getApiBaseUrl();

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  LESSONS: {
    LIST: '/lessons',
    DETAILS: (id: string) => `/lessons/${id}`,
    PROGRESS: (id: string) => `/lessons/${id}/progress`,
  },
  FLASHCARDS: {
    DECKS: '/flashcards/decks',
    DECK_DETAILS: (id: string) => `/flashcards/decks/${id}`,
    CARDS: (deckId: string) => `/flashcards/decks/${deckId}/cards`,
    REVIEW: '/flashcards/review',
  },
  MEDIA: {
    LIST: '/media',
    DETAILS: (id: string) => `/media/${id}`,
  },
  USER: {
    PROFILE: '/user/profile',
    PREFERENCES: '/user/preferences',
  },
} as const;

export default API_BASE_URL;
