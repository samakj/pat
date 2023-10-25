/** @format */

import { useEffect, useRef } from 'react';
import { Dispatch, useDispatch } from '../..';
import { Url } from '../../../utils/url';
import { CANMessageType, CANWebsocketPropsType, CANMessagesStateType } from './types';
import { CANSlice } from './slice';

export const MESSAGE_WINDOW_PERIOD = 1000;
export const BUFFER_FLUSH_PERIOD = 100;

export const DevicesWebsocketUrl = new Url(`/v0/can/ws`);

export class CANDataWebsocket {
  dispatch: Dispatch;
  socket?: WebSocket;

  startTime: Date;
  lastMessage: Date;
  messageCount: number;
  windowedMessages: CANMessageType[];

  onOpen?: (event: Event, websocket: WebSocket | null) => void;
  onMessage?: (
    event: MessageEvent<string>,
    data: CANMessageType,
    websocket: WebSocket | null
  ) => void;
  onError?: (event: Event, websocket: WebSocket | null) => void;
  onClose?: (event: CloseEvent, websocket: WebSocket | null) => void;

  buffer: CANMessagesStateType;
  bufferClearInterval?: ReturnType<typeof setInterval>;

  constructor(options: CANWebsocketPropsType) {
    this.startTime = new Date();
    this.lastMessage = new Date();
    this.messageCount = 0;
    this.windowedMessages = [];

    this.dispatch = options.dispatch;
    this.onOpen = options.onOpen;
    this.onMessage = options.onMessage;
    this.onError = options.onError;
    this.onClose = options.onClose;

    this.buffer = {};
  }

  connect = () => {
    this.socket = new WebSocket(`ws://${location.hostname}:9000${DevicesWebsocketUrl.build()}`);

    this.socket.onopen = (event) => {
      const now = new Date();
      this.startTime = now;
      this.lastMessage = now;
      this.messageCount = 0;
      this.windowedMessages = [];

      this.onOpen?.(event, this.socket as WebSocket);
    };

    this.socket.onerror = (event) => this.onError?.(event, this.socket as WebSocket);

    this.socket.onclose = (event) => this.onClose?.(event, this.socket as WebSocket);

    this.socket.onmessage = (event: MessageEvent<string>) => {
      const now = new Date();
      this.messageCount = (this.messageCount || 0) + 1;
      this.lastMessage = now;

      const message = JSON.parse(event.data);

      // Floats are converted to string for json safety on backend
      message.timestamp = parseFloat(message.timestamp);

      let index = 0;
      for (const message of this.windowedMessages || []) {
        if (+new Date() - +new Date(message.timestamp) < MESSAGE_WINDOW_PERIOD) {
          break;
        }
        index += 1;
      }

      this.windowedMessages = [...(this.windowedMessages?.slice(index) || []), message];
      this.buffer[message] = message;

      this.onMessage?.(event, message, this.socket as WebSocket);
    };

    this.bufferClearInterval = setInterval(this.clearBuffer, BUFFER_FLUSH_PERIOD);
  };

  clearBuffer = () => {
    this.dispatch(
      CANSlice.actions.setCANWebsocketData({
        messages: this.buffer,
        startTime: this.startTime.toISOString(),
        lastMessage: this.lastMessage.toISOString(),
        messageCount: this.messageCount,
        windowedMessageCount: this.windowedMessages.length,
      })
    );
    this.buffer = {};
  };

  disconnect = () => {
    if (this.socket) {
      this.socket.close();
      this.socket = undefined;
    }
    clearInterval(this.bufferClearInterval);
  };
}

export const useCANDataWebsocket = (callbacks: Omit<CANWebsocketPropsType, 'dispatch'>) => {
  const dispatch = useDispatch();
  const websocket = useRef<CANDataWebsocket>();

  useEffect(() => {
    websocket.current = new CANDataWebsocket({
      dispatch,
      onOpen: callbacks.onOpen,
      onMessage: callbacks.onMessage,
      onError: callbacks.onError,
      onClose: callbacks.onClose,
    });
    websocket.current.connect();
    return () => websocket.current?.disconnect();
  }, [dispatch, callbacks.onOpen, callbacks.onMessage, callbacks.onError, callbacks.onClose]);

  return { websocket };
};
