/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CANDataType, CANSliceType } from './types';

export const initialState: CANSliceType = {
  requests: {},
  data: undefined,
  websocket: undefined,
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

export const setStartTime = (
  state: CANSliceType,
  action: Pick<PayloadAction<string>, 'payload'>
) => {
  if (action.payload) state.websocket = { ...(state.websocket || {}), startTime: action.payload };
};

export const setLastMessage = (
  state: CANSliceType,
  action: Pick<PayloadAction<string>, 'payload'>
) => {
  if (action.payload) state.websocket = { ...(state.websocket || {}), lastMessage: action.payload };
};

export const setMessageCount = (
  state: CANSliceType,
  action: Pick<PayloadAction<number>, 'payload'>
) => {
  if (action.payload)
    state.websocket = { ...(state.websocket || {}), messageCount: action.payload };
};

export const setWindowedMessageCount = (
  state: CANSliceType,
  action: Pick<PayloadAction<number>, 'payload'>
) => {
  if (action.payload)
    state.websocket = { ...(state.websocket || {}), windowedMessageCount: action.payload };
};

export const CANSlice = createSlice({
  name: 'can',
  initialState,
  reducers: { setCANData, setStartTime, setLastMessage, setMessageCount, setWindowedMessageCount },
});
