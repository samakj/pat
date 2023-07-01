/** @format */

import React from 'react';
import { ByteCellPropsType } from './types';
import { Bit } from '../can-maessage-bit';

export const ByteCell: React.FunctionComponent<ByteCellPropsType> = ({ arbitrationId, byteNo }) => (
  <td>
    <Bit arbitrationId={arbitrationId} bitNo={8 * byteNo + 0} checkIgnored />
    <Bit arbitrationId={arbitrationId} bitNo={8 * byteNo + 1} checkIgnored />
    <Bit arbitrationId={arbitrationId} bitNo={8 * byteNo + 2} checkIgnored />
    <Bit arbitrationId={arbitrationId} bitNo={8 * byteNo + 3} checkIgnored />
    <Bit arbitrationId={arbitrationId} bitNo={8 * byteNo + 4} checkIgnored />
    <Bit arbitrationId={arbitrationId} bitNo={8 * byteNo + 5} checkIgnored />
    <Bit arbitrationId={arbitrationId} bitNo={8 * byteNo + 6} checkIgnored />
    <Bit arbitrationId={arbitrationId} bitNo={8 * byteNo + 7} checkIgnored />
  </td>
);
