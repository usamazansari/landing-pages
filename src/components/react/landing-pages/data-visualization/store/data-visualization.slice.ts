import { createSlice } from '@reduxjs/toolkit';
import type { IDataVisualizationState } from './data-visualization.store';
import { dataVisualizationReducers } from './data-visualization.reducer';

const initialState: IDataVisualizationState = {};

const dataVisualizationSlice = createSlice({
  name: 'dataVisualization',
  initialState,
  reducers: {
    ...dataVisualizationReducers,
  },
});

// export const {} = dataVisualizationSlice.actions;
export const dataVisualizationReducer = dataVisualizationSlice.reducer;
