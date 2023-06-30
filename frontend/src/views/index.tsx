/** @format */

import React from 'react';
import { useCANDataWebsocket } from '../store/slices/devices/websocket';
import { useSelector } from '../store';
import { CANDataType } from '../store/slices/devices/types';

export const Index: React.FunctionComponent = () => {
  useCANDataWebsocket({});
  const data = useSelector((state) => state.can.data);
  const websocket = useSelector((state) => state.can.websocket);

  return (
    <div>
      <div>Start Time: {websocket?.startTime || '-'}</div>
      <div>Last Message: {websocket?.lastMessage || '-'}</div>
      <div>Message Count: {websocket?.messageCount || 0}</div>
      <div>
        Rate:{' '}
        {websocket?.windowedMessageCount?.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        }) || 0}
        /s
      </div>
      <table>
        <thead>
          <tr>
            <th>Arbitation Id</th>
            <th>Timestamp</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody style={{ fontFamily: 'monospace' }}>
          {Object.values(
            data || {
              '-': {
                arbitration_id: '--------',
                timestamp: '------------------',
                data: '----------------------------------------------------------------',
              },
            }
          )
            ?.sort((messageA: CANDataType, messageB: CANDataType) => {
              if (messageA.arbitration_id < messageB.arbitration_id) return -1;
              if (messageA.arbitration_id > messageB.arbitration_id) return 1;
              return 0;
            })
            .map((message: CANDataType) => (
              <tr key={message.arbitration_id}>
                <td>{message.arbitration_id}</td>
                <td>{message.timestamp}</td>
                <td>{message.data}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
