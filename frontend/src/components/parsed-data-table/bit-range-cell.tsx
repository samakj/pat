/** @format */

import React from 'react';
import { BitRangeCellPropsType } from './types';
import { Bit } from '../can-maessage-bit';

export const BitRangeCell: React.FunctionComponent<BitRangeCellPropsType> = ({
  arbitrationId,
  minBit,
  maxBit,
}) => (
  <td>
    {Array(maxBit - minBit)
      .fill(null)
      .map((_, index) => (
        <Bit key={index} arbitrationId={arbitrationId} bitNo={index + minBit} />
      ))}
  </td>
);
