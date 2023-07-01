/** @format */

import React from 'react';
import { WrapperElement } from './elements';
import { useSelector } from '../../store';

export const CANWebsocketMeta: React.FunctionComponent = () => {
  const startTime = useSelector((state) => state.can.websocket?.startTime);
  const lastMessage = useSelector((state) => state.can.websocket?.lastMessage);
  const messageCount = useSelector((state) => state.can.websocket?.messageCount || 0);
  const windowedMessageCount = useSelector(
    (state) => state.can.websocket?.windowedMessageCount || 0
  );

  return (
    <WrapperElement>
      <span>
        Start Time:{' '}
        {startTime
          ? new Date(startTime).toLocaleTimeString(undefined, {
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              fractionalSecondDigits: 3,
            } as Intl.DateTimeFormatOptions)
          : '-'}
      </span>
      <span>Message Count: {messageCount ? messageCount.toLocaleString() : '-'}</span>
      <span>
        Last Message:{' '}
        {lastMessage
          ? new Date(lastMessage).toLocaleTimeString(undefined, {
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              fractionalSecondDigits: 3,
            } as Intl.DateTimeFormatOptions)
          : '-'}
      </span>
      <span>
        Message Rate: {windowedMessageCount ? windowedMessageCount.toLocaleString() : 0}/s
      </span>
    </WrapperElement>
  );
};
