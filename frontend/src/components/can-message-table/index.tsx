/** @format */

import React from 'react';
import { CANMessageType } from '../../store/slices/devices/types';
import { DataRow } from './data-row';
import { useSelector } from '../../store';
import { CANMessageTablePropsType } from './types';

export const CANMessageTable: React.FunctionComponent<CANMessageTablePropsType> = ({
  whitelist,
  blacklist,
}) => {
  const arbitrationIds = useSelector(
    (state): CANMessageType['arbitration_id'][] =>
      Object.values(state.can.messages || {})
        .filter((message: CANMessageType) => {
          if (whitelist?.size && !whitelist.has(message.arbitration_id)) return false;
          if (blacklist?.size && blacklist.has(message.arbitration_id)) return false;
          return true;
        })
        .sort((messageA: CANMessageType, messageB: CANMessageType) => {
          if (messageA.arbitration_id < messageB.arbitration_id) return -1;
          if (messageA.arbitration_id > messageB.arbitration_id) return 1;
          return 0;
        })
        .map((message: CANMessageType) => message.arbitration_id),
    (before, after) => {
      if (before.length != after.length) return false;
      for (const index in before) {
        if (before[index] != after[index]) return false;
      }
      return true;
    }
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Arbitation Id</th>
          <th>Timestamp</th>
          <th colSpan={8}>Data</th>
        </tr>
      </thead>
      <tbody style={{ fontFamily: 'monospace' }}>
        {arbitrationIds.map((arbitrationId: CANMessageType['arbitration_id']) => (
          <DataRow arbitrationId={arbitrationId} key={arbitrationId} />
        ))}
      </tbody>
    </table>
  );
};
