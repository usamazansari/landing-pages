import { createSlice } from '@reduxjs/toolkit';
import { weatherReducers } from './weather.reducer';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: { weatherAPIKey: '', geoCodingAPIKey: '', selectedCity: null },
  reducers: { ...weatherReducers },
});
