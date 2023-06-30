/** @format */

import React, { useEffect, useState } from 'react';
import { useCANDataWebsocket } from '../store/slices/devices/websocket';
import { useSelector } from '../store';
import { CANDataType } from '../store/slices/devices/types';

export const Index: React.FunctionComponent = () => {
  const [, setTrigger] = useState(+new Date());
  const { meta } = useCANDataWebsocket({});
  const data = useSelector((state) => state.can.data);

  useEffect(() => {
    const interval = setInterval(() => setTrigger(+new Date()), 100);
    return () => {
      clearInterval(interval);
    };
  }, [setTrigger]);

  return (
    <div>
      <div>Start Time: {meta.startTime}</div>
      <div>Last Message: {meta.lastMessage}</div>
      <div>Message Count: {meta.messageCount}</div>
      <div>
        Rate:{' '}
        {((meta.windowedMessages || []).length / 1000).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}
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
        <tbody style={{ font: 'monospace' }}>
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
