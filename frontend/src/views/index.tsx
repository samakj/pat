/** @format */

import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { useCANDataWebsocket } from '../store/slices/devices/websocket';
import { useSelector } from '../store';
import { CANMessageType } from '../store/slices/devices/types';
import { dataMap, ignoredData } from './config';
import { CANMessageTable } from '../components/can-message-table';

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

export const Name: React.FunctionComponent<{
  name: string;
}> = ({ name }) => {
  return <td>{name}</td>;
};
export const Bit: React.FunctionComponent<{
  arbitrationId: CANMessageType['arbitration_id'];
  bitNo: number;
  checkIgnored?: boolean;
}> = ({ arbitrationId, bitNo, checkIgnored }) => {
  const prevBit = useRef<string>();
  const isIgnored = useMemo(
    () =>
      !checkIgnored &&
      ignoredData[arbitrationId]?.find(({ minBit, maxBit }) => bitNo >= minBit && bitNo < maxBit),
    [checkIgnored, bitNo]
  );
  const bit = useSelector((state) =>
    isIgnored ? '-' : state.can.messages?.[arbitrationId]?.data[bitNo]
  );
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    if (bit !== prevBit.current) {
      prevBit.current = bit;
      setStyle({ color: 'red', fontWeight: 'bold' });
      const timeout = setTimeout(() => setStyle({}), 500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [bit, setStyle]);

  if (!bit) return null;
  return <span style={style}>{bit}</span>;
};

export const MappedDataRow: React.FunctionComponent<{
  name: string;
  arbitrationId: CANMessageType['arbitration_id'];
  minBit: number;
  maxBit: number;
}> = ({ name, arbitrationId, minBit, maxBit }) => (
  <tr>
    <Name name={name} />
    <td>
      {Array(maxBit - minBit)
        .fill(null)
        .map((_, index) => (
          <Bit key={index} arbitrationId={arbitrationId} bitNo={index + minBit} />
        ))}
    </td>
  </tr>
);

export const Index: React.FunctionComponent = () => {
  useCANDataWebsocket({});

  return (
    <div>
      <StartTime />
      <LastMessage />
      <MessageCount />
      <MessageRate />
      <hr />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th colSpan={8}>Data</th>
          </tr>
        </thead>
        <tbody style={{ fontFamily: 'monospace' }}>
          {dataMap.map((mapping, index) => (
            <MappedDataRow key={index} {...mapping} />
          ))}
        </tbody>
      </table>
      <hr />
      <CANMessageTable />
    </div>
  );
};
