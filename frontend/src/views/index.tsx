/** @format */

import React from 'react';
import { useCANDataWebsocket } from '../store/slices/devices/websocket';

export const Index: React.FunctionComponent = () => {
  useCANDataWebsocket({});
  return <div>Hello</div>;
};
