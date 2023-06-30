/** @format */

import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { useCANDataWebsocket } from '../store/slices/devices/websocket';
import { useSelector } from '../store';
import { CANDataType } from '../store/slices/devices/types';
import { dataMap } from './config';

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
export const ArbitrationId: React.FunctionComponent<{
  arbitrationId: CANDataType['arbitration_id'];
}> = ({ arbitrationId }) => {
  return <td>{arbitrationId}</td>;
};
export const Timestamp: React.FunctionComponent<{
  arbitrationId: CANDataType['arbitration_id'];
}> = ({ arbitrationId }) => {
  const timestamp = useSelector((state) => state.can.data?.[arbitrationId]?.timestamp);
  return <td>{timestamp ? new Date(timestamp).toISOString() : '-'}</td>;
};
export const Bit: React.FunctionComponent<{
  arbitrationId: CANDataType['arbitration_id'];
  byteNo: number;
  bitNo: number;
}> = ({ arbitrationId, byteNo, bitNo }) => {
  const prevBit = useRef<string>();
  const bit = useSelector((state) => state.can.data?.[arbitrationId]?.data[8 * byteNo + bitNo]);
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    if (bit !== prevBit.current) {
      prevBit.current = bit;
      setStyle({ color: 'red', fontWeight: 'bold' });
      const timeout = setTimeout(() => setStyle({}), 100);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [bit, setStyle]);

  if (!bit) return null;
  return <span style={style}>{bit}</span>;
};
export const Byte: React.FunctionComponent<{
  arbitrationId: CANDataType['arbitration_id'];
  byteNo: number;
}> = ({ arbitrationId, byteNo }) => (
  <td>
    <Bit arbitrationId={arbitrationId} byteNo={byteNo} bitNo={0} />
    <Bit arbitrationId={arbitrationId} byteNo={byteNo} bitNo={1} />
    <Bit arbitrationId={arbitrationId} byteNo={byteNo} bitNo={2} />
    <Bit arbitrationId={arbitrationId} byteNo={byteNo} bitNo={3} />
    <Bit arbitrationId={arbitrationId} byteNo={byteNo} bitNo={4} />
    <Bit arbitrationId={arbitrationId} byteNo={byteNo} bitNo={5} />
    <Bit arbitrationId={arbitrationId} byteNo={byteNo} bitNo={6} />
    <Bit arbitrationId={arbitrationId} byteNo={byteNo} bitNo={7} />
  </td>
);

export const DataRow: React.FunctionComponent<{ arbitrationId: CANDataType['arbitration_id'] }> = ({
  arbitrationId,
}) => (
  <tr>
    <ArbitrationId arbitrationId={arbitrationId} />
    <Timestamp arbitrationId={arbitrationId} />
    <Byte arbitrationId={arbitrationId} byteNo={0} />
    <Byte arbitrationId={arbitrationId} byteNo={1} />
    <Byte arbitrationId={arbitrationId} byteNo={2} />
    <Byte arbitrationId={arbitrationId} byteNo={3} />
    <Byte arbitrationId={arbitrationId} byteNo={4} />
    <Byte arbitrationId={arbitrationId} byteNo={5} />
    <Byte arbitrationId={arbitrationId} byteNo={6} />
    <Byte arbitrationId={arbitrationId} byteNo={7} />
  </tr>
);

export const MappedDataRow: React.FunctionComponent<{
  name: string;
  arbitrationId: CANDataType['arbitration_id'];
  minBit: number;
  maxBit: number;
}> = ({ name, arbitrationId, minBit, maxBit }) => (
  <tr>
    <Name name={name} />
    <td>
      {Array(maxBit - minBit)
        .fill(null)
        .map((_, index) => (
          <Bit
            key={index}
            arbitrationId={arbitrationId}
            byteNo={Math.floor((index + minBit) / 8)}
            bitNo={(index + minBit) % 8}
          />
        ))}
    </td>
  </tr>
);

export const Index: React.FunctionComponent = () => {
  useCANDataWebsocket({});
  const arbitrationIds = useSelector(
    (state): CANDataType['arbitration_id'][] =>
      Object.values(state.can.data || {})
        .sort((messageA: CANDataType, messageB: CANDataType) => {
          if (messageA.arbitration_id < messageB.arbitration_id) return -1;
          if (messageA.arbitration_id > messageB.arbitration_id) return 1;
          return 0;
        })
        .map((message: CANDataType) => message.arbitration_id),
    (before, after) => {
      if (before.length != after.length) return false;
      for (const index in before) {
        if (before[index] != after[index]) return false;
      }
      return true;
    }
  );

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
      <table>
        <thead>
          <tr>
            <th>Arbitation Id</th>
            <th>Timestamp</th>
            <th colSpan={8}>Data</th>
          </tr>
        </thead>
        <tbody style={{ fontFamily: 'monospace' }}>
          {arbitrationIds.map((arbitrationId: CANDataType['arbitration_id']) => (
            <DataRow arbitrationId={arbitrationId} key={arbitrationId} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
