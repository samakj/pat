/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { EqualityFn, useDispatch as _useDispatch, useSelector as _useSelector } from 'react-redux';
import { isClient } from '../utils';
import { CANSlice } from './slices/can/slice';

export const store = configureStore({
  reducer: { [CANSlice.name]: CANSlice.reducer },
  preloadedState: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export const useDispatch = () => _useDispatch<Dispatch>();
export const useSelector = <Selected = unknown>(
  selector: (state: RootState) => Selected,
  equalityFn?: EqualityFn<Selected> | undefined
) =>
  isClient() ? _useSelector<RootState, Selected>(selector, equalityFn) : selector(store.getState());
