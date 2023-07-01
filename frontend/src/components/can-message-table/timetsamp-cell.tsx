/** @format */

import React from 'react';
import { TimestampCellPropsType } from './types';
import { useSelector } from '../../store';

export const TimestampCell: React.FunctionComponent<TimestampCellPropsType> = ({
  arbitrationId,
}) => {
  const timestamp = useSelector((state) => state.can.messages?.[arbitrationId]?.timestamp);
  return <td>{timestamp ? new Date(timestamp).toISOString() : '-'}</td>;
};
