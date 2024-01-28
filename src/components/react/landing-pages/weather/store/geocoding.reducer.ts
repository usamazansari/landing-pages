import type { PayloadAction } from '@reduxjs/toolkit';
import type { IGeoCodingState } from './geocoding.store';

export const geoCodingReducers = {
  setAPIKey(state: IGeoCodingState, action: PayloadAction<string>) {
    state.apiKey = action.payload;
  },
};
