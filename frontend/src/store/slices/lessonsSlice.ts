import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { lessonsAPI } from '../../services/api';

export interface Lesson {
  id: string;
  title: string;
  level: number;
  language: 'fr' | 'de';
  dialogue?: string;
  grammarTips?: string;
  vocabulary?: Array<{
    word: string;
    translation: string;
    pronunciation: string;
  }>;
  completed: boolean;
  score?: number;
  lastViewedAt?: string;
}

interface LessonsState {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: LessonsState = {
  lessons: [],
  currentLesson: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchLessons = createAsyncThunk(
  'lessons/fetchLessons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await lessonsAPI.getLessons();
      return response.data.lessons;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch lessons');
    }
  }
);

export const fetchLessonDetails = createAsyncThunk(
  'lessons/fetchLessonDetails',
  async (lessonId: string, { rejectWithValue }) => {
    try {
      const response = await lessonsAPI.getLessonDetails(lessonId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch lesson details');
    }
  }
);

export const updateLessonProgress = createAsyncThunk(
  'lessons/updateProgress',
  async ({ lessonId, progress }: { lessonId: string; progress: { completed?: boolean; score?: number; timeSpent?: number } }, { rejectWithValue }) => {
    try {
      const response = await lessonsAPI.updateProgress(lessonId, progress);
      return { lessonId, progress: response.data.progress };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update progress');
    }
  }
);

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    clearCurrentLesson: (state) => {
      state.currentLesson = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch lessons
      .addCase(fetchLessons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lessons = action.payload;
        state.error = null;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch lesson details
      .addCase(fetchLessonDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLessonDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentLesson = action.payload;
        state.error = null;
      })
      .addCase(fetchLessonDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update progress
      .addCase(updateLessonProgress.fulfilled, (state, action) => {
        const { lessonId, progress } = action.payload;
        const lessonIndex = state.lessons.findIndex(lesson => lesson.id === lessonId);
        if (lessonIndex !== -1) {
          state.lessons[lessonIndex] = {
            ...state.lessons[lessonIndex],
            completed: progress.completed,
            score: progress.score,
            lastViewedAt: progress.lastViewedAt,
          };
        }
      });
  },
});

export const { clearCurrentLesson, clearError } = lessonsSlice.actions;
export default lessonsSlice.reducer;
