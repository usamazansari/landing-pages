import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { newsReducer } from './news.slice';
import { newsApi } from './news.api';

export interface INewsState {
  selectedCategory: string;
  relatedPopularCategories: string[];
  language: string;
  apiKey: string;
  shouldRefetch: boolean;
}

export const combinedReducers = combineReducers({
  news: newsReducer,
  [newsApi.reducerPath]: newsApi.reducer,
});

export const store = configureStore({
  reducer: combinedReducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat(newsApi.middleware),
});

export type RootState = ReturnType<typeof combinedReducers>;
export type AppDispatch = typeof store.dispatch;
