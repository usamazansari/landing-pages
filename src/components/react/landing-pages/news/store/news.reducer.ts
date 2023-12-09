import type { PayloadAction } from '@reduxjs/toolkit';
import type { INewsState } from './news.store';

export const newsReducers = {
  setAPIKey(state: INewsState, action: PayloadAction<{ apiKey: string }>) {
    state.apiKey = action.payload.apiKey;
  },
  setCategory(state: INewsState, action: PayloadAction<{ category: string }>) {
    state.category = action.payload.category;
  },
};
