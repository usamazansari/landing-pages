import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { geoCodingApi } from './geocoding.api';
import { geoCodingSlice } from './geocoding.slice';

export interface IGeoCodingState {
  apiKey: string;
}

const combinedReducers = combineReducers({
  geoCoding: geoCodingSlice.reducer,
  [geoCodingApi.reducerPath]: geoCodingApi.reducer,
});

const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(geoCodingApi.middleware),
});

const { setAPIKey } = geoCodingSlice.actions;
const useAppDispatch = () => useDispatch<typeof store.dispatch>();
const useAppSelector: TypedUseSelectorHook<ReturnType<typeof combinedReducers>> = useSelector;

export const { useSearchCityQuery, useLazySearchCityQuery } = geoCodingApi;

export { store as geoCodingStore, setAPIKey as setGeocodingAPIKey, useAppDispatch as useGeoCodingAppDispatch, useAppSelector as useGeoCodingAppSelector };
