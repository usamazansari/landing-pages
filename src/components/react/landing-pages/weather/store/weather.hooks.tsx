import { useDispatch, type TypedUseSelectorHook, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './weather.store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
