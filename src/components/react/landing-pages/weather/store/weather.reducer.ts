import type { PayloadAction } from '@reduxjs/toolkit';
import type { IWeatherState } from './weather.store';
import type { Location } from '../types';

export const weatherReducers = {
  setAPIKey(state: IWeatherState, action: PayloadAction<string>) {
    state.apiKey = action.payload;
  },
  setSelectedCity(state: IWeatherState, action: PayloadAction<Location | null>) {
    state.selectedCity = action.payload;
  },
};
