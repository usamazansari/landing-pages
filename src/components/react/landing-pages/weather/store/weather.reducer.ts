import type { PayloadAction } from '@reduxjs/toolkit';
import type { IWeatherState } from './weather.store';
import type { City } from '../types';

export const weatherReducers = {
  setWeatherAPIKey(state: IWeatherState, action: PayloadAction<string>) {
    state.weatherAPIKey = action.payload;
  },
  setGeoCodingAPIKey(state: IWeatherState, action: PayloadAction<string>) {
    state.geoCodingAPIKey = action.payload;
  },
  setSelectedCity(state: IWeatherState, action: PayloadAction<City | null>) {
    state.selectedCity = action.payload;
  },
};
