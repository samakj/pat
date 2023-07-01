/** @format */

import React from 'react';
import { ParsedDataRowPropsType } from './types';
import { NameCell } from './name-cell';
import { BitRangeCell } from './bit-range-cell';

export const ParsedDataRow: React.FunctionComponent<ParsedDataRowPropsType> = ({ name }) => (
  <tr>
    <NameCell name={name} />
    <BitRangeCell name={name} />
  </tr>
);
