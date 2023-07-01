/** @format */

import React from 'react';
import { BitRangeCellPropsType } from './types';
import { Bit } from '../can-maessage-bit';
import { useSelector } from '../../store';
import { Hex } from '../can-maessage-hex';
import { Int } from '../can-maessage-int';

export const BitRangeCell: React.FunctionComponent<BitRangeCellPropsType> = ({ name }) => {
  const arbitrationId = useSelector((state) => state.can.mappings?.[name].arbitration_id);
  const format = useSelector((state) => state.can.mappings?.[name].format);
  const bits = useSelector((state) => state.can.mappings?.[name].bits);

  return (
    <td>
      {!bits ? (
        '-'
      ) : !arbitrationId ? (
        '-'.repeat(bits[1] - bits[0])
      ) : format === 'hex' ? (
        <Hex arbitrationId={arbitrationId} bits={bits} />
      ) : format === 'int' ? (
        <Int arbitrationId={arbitrationId} bits={bits} />
      ) : (
        Array(bits[1] - bits[0])
          .fill(null)
          .map((_, index) =>
            arbitrationId ? (
              '-'
            ) : (
              <Bit key={index} arbitrationId={arbitrationId} bitNo={index + bits[0]} />
            )
          )
      )}
    </td>
  );
};
