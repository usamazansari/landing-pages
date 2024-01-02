import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { weatherReducer } from './weather.slice';
import { weatherApi } from './weather.api';
import type { Location } from '../types';

export interface IWeatherState {
  apiKey: string;
  selectedCity: Location | null;
}

export const combinedReducers = combineReducers({
  weather: weatherReducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
});

export const store = configureStore({
  reducer: combinedReducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof combinedReducers>;
export type AppDispatch = typeof store.dispatch;
