/** @format */

import React from 'react';
import { useCANDataWebsocket } from '../store/slices/devices/websocket';
import { useSelector } from '../store';
import { CANMessageTable } from '../components/can-message-table';
import { ParsedDataTable } from '../components/parsed-data-table';

export const StartTime: React.FunctionComponent = () => {
  const startTime = useSelector((state) => state.can.websocket?.startTime);
  return <div>Start Time: {startTime || '-'}</div>;
};
export const LastMessage: React.FunctionComponent = () => {
  const lastMessage = useSelector((state) => state.can.websocket?.lastMessage);
  return <div>Last Message: {lastMessage || '-'}</div>;
};
export const MessageCount: React.FunctionComponent = () => {
  const messageCount = useSelector((state) => state.can.websocket?.messageCount || 0);
  return <div>Message Count: {messageCount || '-'}</div>;
};
export const MessageRate: React.FunctionComponent = () => {
  const windowedMessageCount = useSelector(
    (state) => state.can.websocket?.windowedMessageCount || 0
  );
  return <div>Message Count: {windowedMessageCount}/s</div>;
};

export const Index: React.FunctionComponent = () => {
  useCANDataWebsocket({});

  return (
    <div>
      <StartTime />
      <LastMessage />
      <MessageCount />
      <MessageRate />
      <hr />
      <ParsedDataTable />
      <hr />
      <CANMessageTable />
    </div>
  );
};
