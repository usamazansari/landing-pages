import type { PayloadAction } from '@reduxjs/toolkit';
import type { IWeatherState } from './weather.store';

export const weatherReducers = {
  setAPIKey(state: IWeatherState, action: PayloadAction<string>) {
    state.apiKey = action.payload;
  },
};
