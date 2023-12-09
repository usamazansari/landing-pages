import { createSlice } from '@reduxjs/toolkit';
import type { INewsState } from './news.store';
import { newsReducers } from './news.reducer';

const initialState: INewsState = {
  category: '',
  language: 'en',
  apiKey: '',
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    ...newsReducers,
  },
});

export const { setCategory, setAPIKey } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
