/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CANMessagesStateType, CANMessageType, CANSliceType, MappingType } from './types';
import { getMappings } from './thunks';

export const initialState: CANSliceType = {
  requests: {},
  messages: undefined,
  websocket: undefined,
};

export const setCANMessages = (
  state: CANSliceType,
  action: Pick<PayloadAction<CANMessagesStateType>, 'payload'>
) => {
  if (action.payload) {
    state.messages = state.messages || {};
    Object.values(action.payload).forEach((message) => {
      if (state.messages && state.messages[message.arbitration_id]?.data !== message.data) {
        state.messages[message.arbitration_id] = message;
      }
    });
  }
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

export const setCANWebsocketData = (
  state: CANSliceType,
  action: Pick<
    PayloadAction<{
      startTime: string;
      lastMessage: string;
      messageCount: number;
      windowedMessageCount: number;
      messages: CANMessagesStateType;
    }>,
    'payload'
  >
) => {
  if (action.payload) {
    setCANMessages(state, { payload: action.payload.messages });
    setStartTime(state, { payload: action.payload.startTime });
    setLastMessage(state, { payload: action.payload.lastMessage });
    setMessageCount(state, { payload: action.payload.messageCount });
    setWindowedMessageCount(state, { payload: action.payload.windowedMessageCount });
  }
};

export const setMappings = (
  state: CANSliceType,
  action: Pick<PayloadAction<MappingType[]>, 'payload'>
) => {
  if (action.payload) {
    action.payload.forEach((mapping) => {
      state.mappings = state.mappings || {};
      state.mappings[mapping.name] = mapping;
    });
  }
};

export const CANSlice = createSlice({
  name: 'can',
  initialState,
  reducers: {
    setCANMessages,
    setStartTime,
    setLastMessage,
    setMessageCount,
    setWindowedMessageCount,
    setCANWebsocketData,
  },
  extraReducers: (builder) => {
    builder.addCase(getMappings.fulfilled, setMappings);
  },
});
