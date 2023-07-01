/** @format */

import React from 'react';
import { useCANDataWebsocket } from '../store/slices/devices/websocket';
import { CANMessageTable } from '../components/can-message-table';
import { ParsedDataTable } from '../components/parsed-data-table';
import { CANWebsocketMeta } from '../components/can-websocket-meta';

export const Index: React.FunctionComponent = () => {
  useCANDataWebsocket({});

  return (
    <div>
      <CANWebsocketMeta />
      <hr />
      <ParsedDataTable />
      <hr />
      <CANMessageTable />
    </div>
  );
};
