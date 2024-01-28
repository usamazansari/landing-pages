import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { weatherApi } from './weather.api';
import { weatherSlice } from './weather.slice';

export interface IWeatherState {
  apiKey: string;
}

const combinedReducers = combineReducers({
  weather: weatherSlice.reducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
});

const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(weatherApi.middleware),
});

const useAppDispatch = () => useDispatch<typeof store.dispatch>();
const useAppSelector: TypedUseSelectorHook<ReturnType<typeof combinedReducers>> = useSelector;

const { setAPIKey } = weatherSlice.actions;
export const { useGetCurrentForecastQuery, useLazyGetCurrentForecastQuery } = weatherApi;

export { store as weatherStore, setAPIKey as setWeatherAPIKey, useAppDispatch as useWeatherAppDispatch, useAppSelector as useWeatherAppSelector };
