/** @format */

import { createAction } from '@reduxjs/toolkit';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from '../..';
import { Url } from '../../../utils/url';
import { CANDataType, UseCANDataWebsocketPropsType } from './types';

export const DevicesWebsocketUrl = new Url(`/v0/can/ws`);

export const CANDataMessageAction = createAction<CANDataType>('createDevice/recieved');

export const useCANDataWebsocket = ({
  onOpen,
  onMessage,
  onClose,
  onError,
}: UseCANDataWebsocketPropsType) => {
  const dispatch = useDispatch();
  const websocket = useRef<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [messageCount, setMessageCount] = useState<number>(0);

  useEffect(() => {
    websocket.current = new WebSocket(
      `ws://${location.hostname}:9000${DevicesWebsocketUrl.build()}`
    );
    websocket.current.onopen = (event) => {
      onOpen?.(event, websocket.current);
      setLastMessage(new Date().toISOString());
      setMessageCount(0);
    };
    websocket.current.onerror = (event) => onError?.(event, websocket.current);
    websocket.current.onclose = (event) => onClose?.(event, websocket.current);
    websocket.current.onmessage = (event: MessageEvent<string>) => {
      setLastMessage(new Date().toISOString());
      const data = JSON.parse(event.data);
      // dispatch(CANDataMessageAction(data))
      onMessage?.(event, data, websocket.current);
    };

    return () => websocket.current?.close();
  }, [dispatch, onOpen, onMessage, onError, onClose, setLastMessage, setMessageCount]);

  return { websocket, lastMessage, messageCount };
};
