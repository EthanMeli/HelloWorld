import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mediaAPI } from '../../services/api';

export interface MediaItem {
  id: string;
  title: string;
  description?: string;
  sourceUrl?: string;
  transcriptOrLyrics?: string;
  duration?: number;
  difficulty: number;
  thumbnailUrl?: string;
  category: 'podcast' | 'literature' | 'song' | 'video';
  language: 'fr' | 'de';
  createdAt: string;
}

interface MediaState {
  categories: Array<{ category: string; count: number }>;
  currentCategory: string | null;
  items: MediaItem[];
  currentItem: MediaItem | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MediaState = {
  categories: [],
  currentCategory: null,
  items: [],
  currentItem: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchMediaCategories = createAsyncThunk(
  'media/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await mediaAPI.getCategories();
      return response.data.categories;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch categories');
    }
  }
);

export const fetchMediaItems = createAsyncThunk(
  'media/fetchItems',
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await mediaAPI.getMediaByCategory(category);
      return { category, items: response.data.items };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch media items');
    }
  }
);

export const fetchMediaDetails = createAsyncThunk(
  'media/fetchDetails',
  async ({ category, id }: { category: string; id: string }, { rejectWithValue }) => {
    try {
      const response = await mediaAPI.getMediaDetails(category, id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch media details');
    }
  }
);

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchMediaCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMediaCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchMediaCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch items
      .addCase(fetchMediaItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMediaItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCategory = action.payload.category;
        state.items = action.payload.items;
        state.error = null;
      })
      .addCase(fetchMediaItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch details
      .addCase(fetchMediaDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMediaDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentItem = action.payload;
        state.error = null;
      })
      .addCase(fetchMediaDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentItem, setCurrentCategory, clearError } = mediaSlice.actions;
export default mediaSlice.reducer;
