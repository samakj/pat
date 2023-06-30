/** @format */

import { useEffect, useRef } from 'react';
import { Dispatch, useDispatch } from '../..';
import { Url } from '../../../utils/url';
import { CANDataType, CANDataWebsocketPropsType } from './types';
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
  windowedMessages: CANDataType[];

  onOpen?: (event: Event, websocket: WebSocket | null) => void;
  onMessage?: (event: MessageEvent<string>, data: CANDataType, websocket: WebSocket | null) => void;
  onError?: (event: Event, websocket: WebSocket | null) => void;
  onClose?: (event: CloseEvent, websocket: WebSocket | null) => void;

  buffer: CANDataType[];
  bufferClearInterval?: ReturnType<typeof setInterval>;

  constructor(options: CANDataWebsocketPropsType) {
    this.startTime = new Date();
    this.lastMessage = new Date();
    this.messageCount = 0;
    this.windowedMessages = [];

    this.dispatch = options.dispatch;
    this.onOpen = options.onOpen;
    this.onMessage = options.onMessage;
    this.onError = options.onError;
    this.onClose = options.onClose;

    this.buffer = [];
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

      const data = JSON.parse(event.data);

      let index = 0;
      for (const message of this.windowedMessages || []) {
        if (+new Date() - +new Date(message.timestamp) > MESSAGE_WINDOW_PERIOD) {
          break;
        }
        index += 1;
      }

      this.windowedMessages = [...(this.windowedMessages?.slice(index) || []), data];

      this.onMessage?.(event, data, this.socket as WebSocket);
    };

    this.bufferClearInterval = setInterval(this.clearBuffer, BUFFER_FLUSH_PERIOD);
  };

  clearBuffer = () => {
    if (this.buffer.length) this.dispatch(CANSlice.actions.setCANData(this.buffer));
    this.buffer = [];

    this.dispatch(CANSlice.actions.setStartTime(this.startTime.toISOString()));
    this.dispatch(CANSlice.actions.setLastMessage(this.lastMessage.toISOString()));
    this.dispatch(CANSlice.actions.setMessageCount(this.messageCount));
    this.dispatch(CANSlice.actions.setWindowedMessageCount(this.windowedMessages.length));
  };

  disconnect = () => {
    if (this.socket) {
      this.socket.close();
      this.socket = undefined;
    }
    clearInterval(this.bufferClearInterval);
  };
}

export const useCANDataWebsocket = (callbacks: Omit<CANDataWebsocketPropsType, 'dispatch'>) => {
  const dispatch = useDispatch();
  const websocket = useRef<CANDataWebsocket>();

  useEffect(() => {
    websocket.current = new CANDataWebsocket({ dispatch, ...callbacks });
    websocket.current.connect();
    return () => websocket.current?.disconnect();
  }, [dispatch, callbacks]);

  return { websocket };
};
