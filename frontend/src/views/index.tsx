/** @format */

import React, { useEffect, useState } from 'react';
import { useCANDataWebsocket } from '../store/slices/devices/websocket';

export const Index: React.FunctionComponent = () => {
  const [, setTrigger] = useState(+new Date());
  const { meta } = useCANDataWebsocket({});

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
    </div>
  );
};
