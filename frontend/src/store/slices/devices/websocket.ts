/** @format */

import { createAction } from '@reduxjs/toolkit';
import { useEffect, useRef } from 'react';
import { useDispatch } from '../..';
import { Url } from '../../../utils/url';
import { CANDataType, CANDataWebsocketMetaType, UseCANDataWebsocketPropsType } from './types';
import { CANSlice } from './slice';

export const MESSAGE_WINDOW_PERIOD = 1000;
export const BUFFER_FLUSH_PERIOD = 100;

export const DevicesWebsocketUrl = new Url(`/v0/can/ws`);

export const useCANDataWebsocket = ({
  onOpen,
  onMessage,
  onClose,
  onError,
}: UseCANDataWebsocketPropsType) => {
  const dispatch = useDispatch();
  const websocket = useRef<WebSocket | null>(null);
  const meta = useRef<CANDataWebsocketMetaType>({});
  const buffer = useRef<CANDataType[]>([]);

  useEffect(() => {
    websocket.current = new WebSocket(
      `ws://${location.hostname}:9000${DevicesWebsocketUrl.build()}`
    );
    websocket.current.onopen = (event) => {
      const now = new Date();
      meta.current.startTime = now;
      meta.current.lastMessage = now;
      meta.current.messageCount = 0;
      meta.current.windowedMessages = [];

      onOpen?.(event, websocket.current);
    };
    websocket.current.onerror = (event) => onError?.(event, websocket.current);
    websocket.current.onclose = (event) => onClose?.(event, websocket.current);
    websocket.current.onmessage = (event: MessageEvent<string>) => {
      const now = new Date();
      meta.current.messageCount = (meta.current.messageCount || 0) + 1;
      meta.current.lastMessage = now;

      const data = JSON.parse(event.data);

      let index = 0;
      for (const message of meta.current.windowedMessages || []) {
        if (+new Date() - +new Date(message.timestamp) > MESSAGE_WINDOW_PERIOD) {
          break;
        }
        index += 1;
      }

      meta.current.windowedMessages = [
        ...(meta.current.windowedMessages?.slice(index) || []),
        data,
      ];

      onMessage?.(event, data, websocket.current);
    };

    return () => websocket.current?.close();
  }, [dispatch, onOpen, onMessage, onError, onClose]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (buffer.current.length) {
        dispatch(CANSlice.actions.setCANData(buffer.current));
        buffer.current = [];
      }
    }, BUFFER_FLUSH_PERIOD);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return { websocket, meta: meta.current };
};
