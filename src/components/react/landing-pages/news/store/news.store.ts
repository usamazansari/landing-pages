import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { newsReducer } from './news.slice';

export interface INewsState {
  category: string;
  language: string;
  apiKey: string;
}

export const combinedReducers = combineReducers({
  news: newsReducer,
});

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

export type RootState = ReturnType<typeof combinedReducers>;
export type AppDispatch = typeof store.dispatch;
