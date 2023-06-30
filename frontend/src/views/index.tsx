/** @format */

import React from 'react';
import { useCANDataWebsocket } from '../store/slices/devices/websocket';
import { useSelector } from '../store';
import { CANDataType } from '../store/slices/devices/types';

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

export const Timestamp: React.FunctionComponent<{
  arbitrationId: CANDataType['arbitration_id'];
}> = ({ arbitrationId }) => {
  const timestamp = useSelector((state) => state.can.data?.[arbitrationId]?.timestamp);
  return <td>{timestamp || '-'}</td>;
};
export const ArbitrationId: React.FunctionComponent<{
  arbitrationId: CANDataType['arbitration_id'];
}> = ({ arbitrationId }) => {
  return <td>{arbitrationId}</td>;
};
export const Byte: React.FunctionComponent<{
  arbitrationId: CANDataType['arbitration_id'];
  byteNo: number;
}> = ({ arbitrationId, byteNo }) => {
  const byte = useSelector((state) =>
    state.can.data?.[arbitrationId]?.data.slice(byteNo * 8, (byteNo + 1) * 8)
  );
  return <td>{byte || '-'}</td>;
};

export const DataRow: React.FunctionComponent<{ arbitrationId: CANDataType['arbitration_id'] }> = ({
  arbitrationId,
}) => {
  return (
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
};

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
