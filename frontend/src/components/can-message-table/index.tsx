/** @format */

import React from 'react';
import { CANMessageType } from '../../store/slices/devices/types';
import { DataRow } from './data-row';
import { useSelector } from '../../store';

export const CANMessageTable: React.FunctionComponent = () => {
  const arbitrationIds = useSelector(
    (state): CANMessageType['arbitration_id'][] =>
      Object.values(state.can.messages || {})
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
