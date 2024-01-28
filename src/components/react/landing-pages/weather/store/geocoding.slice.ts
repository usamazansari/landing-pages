import { createSlice } from '@reduxjs/toolkit';
import { geoCodingReducers } from './geocoding.reducer';

export const geoCodingSlice = createSlice({
  name: 'geocoding',
  initialState: { apiKey: '' },
  reducers: { ...geoCodingReducers },
});
