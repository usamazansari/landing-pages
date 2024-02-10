import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { weatherApi } from './weather.api';
import { weatherSlice } from './weather.slice';
import type { City } from '../types';

export interface IWeatherState {
  weatherAPIKey: string;
  geoCodingAPIKey: string;
  selectedCity: City | null;
}

const combinedReducers = combineReducers({
  weather: weatherSlice.reducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
});

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(weatherApi.middleware),
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof combinedReducers>> = useSelector;

export const { setWeatherAPIKey, setGeoCodingAPIKey, setSelectedCity } = weatherSlice.actions;
export const { useSearchCityQuery, useLazySearchCityQuery, useGetCountriesListQuery, useLazyGetCountriesListQuery } = weatherApi;
