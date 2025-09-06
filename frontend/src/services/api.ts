import axios, { AxiosInstance, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      AsyncStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/auth/login', credentials),
  
  register: (userData: { email: string; username: string; password: string; activeLanguage: 'fr' | 'de' }) =>
    apiClient.post('/auth/register', userData),
  
  updateProfile: (profileData: { username?: string; activeLanguage?: 'fr' | 'de' }) =>
    apiClient.patch('/user/profile', profileData),
  
  getProfile: () =>
    apiClient.get('/user/profile'),
  
  getDashboard: () =>
    apiClient.get('/user/dashboard'),
};

// Lessons API
export const lessonsAPI = {
  getLessons: () =>
    apiClient.get('/lessons'),
  
  getLessonDetails: (lessonId: string) =>
    apiClient.get(`/lessons/${lessonId}`),
  
  updateProgress: (lessonId: string, progress: { completed?: boolean; score?: number; timeSpent?: number }) =>
    apiClient.post(`/lessons/${lessonId}/progress`, progress),
};

// Flashcards API
export const flashcardsAPI = {
  getDecks: () =>
    apiClient.get('/flashcards/decks'),
  
  createDeck: (deckData: { name: string; description?: string; language: 'fr' | 'de' }) =>
    apiClient.post('/flashcards/decks', deckData),
  
  getCards: (deckId: string) =>
    apiClient.get(`/flashcards/decks/${deckId}/cards`),
  
  createCard: (deckId: string, cardData: { front: string; back: string; hint?: string; difficulty?: number }) =>
    apiClient.post(`/flashcards/decks/${deckId}/cards`, cardData),
  
  getReviewCards: (limit?: number) =>
    apiClient.get('/flashcards/review', { params: { limit } }),
  
  submitReview: (cardId: string, rating: number) =>
    apiClient.post(`/flashcards/review/${cardId}`, { rating }),
};

// Media API
export const mediaAPI = {
  getCategories: () =>
    apiClient.get('/media'),
  
  getMediaByCategory: (category: string) =>
    apiClient.get(`/media/${category}`),
  
  getMediaDetails: (category: string, id: string) =>
    apiClient.get(`/media/${category}/${id}`),
};

export default apiClient;
