import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dataVisualizationReducer } from './data-visualization.slice';
import { dataVisualizationApi } from './data-visualization.api';

export interface IDataVisualizationState {}

export const combinedReducers = combineReducers({
  dataVisualization: dataVisualizationReducer,
  [dataVisualizationApi.reducerPath]: dataVisualizationApi.reducer,
});

export const store = configureStore({
  reducer: combinedReducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat(dataVisualizationApi.middleware),
});

export type RootState = ReturnType<typeof combinedReducers>;
export type AppDispatch = typeof store.dispatch;
