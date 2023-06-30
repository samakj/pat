/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CANDataType, CANSliceType } from './types';

export const initialState: CANSliceType = {
  requests: {},
  data: undefined,
};

export const setCANData = (
  state: CANSliceType,
  action: Pick<PayloadAction<CANDataType | CANDataType[]>, 'payload'>
) => {
  state.data = state.data || {};
  if (Array.isArray(action.payload))
    action.payload.forEach((device) => setCANData(state, { payload: device }));
  else state.data[action.payload.arbitration_id] = action.payload;
};

export const CANSlice = createSlice({
  name: 'can',
  initialState,
  reducers: { setCANData },
});
