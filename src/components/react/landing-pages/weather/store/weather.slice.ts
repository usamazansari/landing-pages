import { createSlice } from '@reduxjs/toolkit';
import type { IWeatherState } from './weather.store';
import { weatherReducers } from './weather.reducer';

const initialState: IWeatherState = {
  apiKey: '',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    ...weatherReducers,
  },
});

export const { setAPIKey } = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;
