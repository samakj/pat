/** @format */

import React from 'react';
import { ParsedDataRowPropsType } from './types';
import { NameCell } from './name-cell';
import { BitRangeCell } from './bit-range-cell';

export const MappedDataRow: React.FunctionComponent<ParsedDataRowPropsType> = ({
  name,
  arbitrationId,
  minBit,
  maxBit,
}) => (
  <tr>
    <NameCell name={name} />
    <BitRangeCell arbitrationId={arbitrationId} minBit={minBit} maxBit={maxBit} />
  </tr>
);
