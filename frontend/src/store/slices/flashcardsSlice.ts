import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { flashcardsAPI } from '../../services/api';

export interface Card {
  id: string;
  front: string;
  back: string;
  hint?: string;
  difficulty: number;
  reviewStats?: {
    lastReviewed: string;
    dueAt: string;
    easeFactor: number;
    intervalDays: number;
    repetitions: number;
  };
  isNew?: boolean;
  deckName?: string;
}

export interface Deck {
  id: string;
  name: string;
  description?: string;
  language: 'fr' | 'de';
  cardCount: number;
  createdAt: string;
}

interface FlashcardsState {
  decks: Deck[];
  currentDeck: Deck | null;
  cards: Card[];
  reviewCards: Card[];
  currentCard: Card | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FlashcardsState = {
  decks: [],
  currentDeck: null,
  cards: [],
  reviewCards: [],
  currentCard: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchDecks = createAsyncThunk(
  'flashcards/fetchDecks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await flashcardsAPI.getDecks();
      return response.data.decks;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch decks');
    }
  }
);

export const createDeck = createAsyncThunk(
  'flashcards/createDeck',
  async (deckData: { name: string; description?: string; language: 'fr' | 'de' }, { rejectWithValue }) => {
    try {
      const response = await flashcardsAPI.createDeck(deckData);
      return response.data.deck;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create deck');
    }
  }
);

export const fetchCards = createAsyncThunk(
  'flashcards/fetchCards',
  async (deckId: string, { rejectWithValue }) => {
    try {
      const response = await flashcardsAPI.getCards(deckId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch cards');
    }
  }
);

export const createCard = createAsyncThunk(
  'flashcards/createCard',
  async ({ deckId, cardData }: { deckId: string; cardData: { front: string; back: string; hint?: string; difficulty?: number } }, { rejectWithValue }) => {
    try {
      const response = await flashcardsAPI.createCard(deckId, cardData);
      return response.data.card;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create card');
    }
  }
);

export const fetchReviewCards = createAsyncThunk(
  'flashcards/fetchReviewCards',
  async (limit: number = 20, { rejectWithValue }) => {
    try {
      const response = await flashcardsAPI.getReviewCards(limit);
      return response.data.cards;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch review cards');
    }
  }
);

export const submitReview = createAsyncThunk(
  'flashcards/submitReview',
  async ({ cardId, rating }: { cardId: string; rating: number }, { rejectWithValue }) => {
    try {
      const response = await flashcardsAPI.submitReview(cardId, rating);
      return { cardId, reviewData: response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to submit review');
    }
  }
);

const flashcardsSlice = createSlice({
  name: 'flashcards',
  initialState,
  reducers: {
    clearCurrentDeck: (state) => {
      state.currentDeck = null;
      state.cards = [];
    },
    clearCurrentCard: (state) => {
      state.currentCard = null;
    },
    setCurrentCard: (state, action) => {
      state.currentCard = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch decks
      .addCase(fetchDecks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDecks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.decks = action.payload;
        state.error = null;
      })
      .addCase(fetchDecks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create deck
      .addCase(createDeck.fulfilled, (state, action) => {
        state.decks.unshift(action.payload);
      })
      // Fetch cards
      .addCase(fetchCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDeck = action.payload.deck;
        state.cards = action.payload.cards;
        state.error = null;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create card
      .addCase(createCard.fulfilled, (state, action) => {
        state.cards.push(action.payload);
      })
      // Fetch review cards
      .addCase(fetchReviewCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReviewCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewCards = action.payload;
        state.error = null;
      })
      .addCase(fetchReviewCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Submit review
      .addCase(submitReview.fulfilled, (state, action) => {
        const { cardId } = action.payload;
        state.reviewCards = state.reviewCards.filter(card => card.id !== cardId);
      });
  },
});

export const { clearCurrentDeck, clearCurrentCard, setCurrentCard, clearError } = flashcardsSlice.actions;
export default flashcardsSlice.reducer;
