import { createSlice } from '@reduxjs/toolkit';
import type { INewsState } from './news.store';
import { newsReducers } from './news.reducer';

const initialState: INewsState = {
  selectedCategory: '',
  language: 'en',
  apiKey: '',
  relatedPopularCategories: [],
  shouldRefetch: false,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    ...newsReducers,
  },
});

export const { setSelectedCategory, setAPIKey, setRelatedPopularCategories, setShouldRefetch } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
