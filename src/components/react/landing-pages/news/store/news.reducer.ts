import type { PayloadAction } from '@reduxjs/toolkit';
import type { INewsState } from './news.store';

export const newsReducers = {
  setAPIKey(state: INewsState, action: PayloadAction<string>) {
    state.apiKey = action.payload;
  },
  setSelectedCategory(state: INewsState, action: PayloadAction<string>) {
    state.selectedCategory = action.payload;
  },
  setRelatedPopularCategories(state: INewsState, action: PayloadAction<string[]>) {
    state.relatedPopularCategories = action.payload;
  },
  setShouldRefetch(state: INewsState, action: PayloadAction<boolean>) {
    state.shouldRefetch = action.payload;
  },
};
