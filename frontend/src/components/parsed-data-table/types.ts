/** @format */

import { CANMessageType } from '../../store/slices/devices/types';

export interface ParsedDataRowPropsType {
  name: string;
  arbitrationId: CANMessageType['arbitration_id'];
  minBit: number;
  maxBit: number;
}

export interface NameCellPropsType {
  name: string;
}
export interface BitRangeCellPropsType {
  arbitrationId: CANMessageType['arbitration_id'];
  minBit: number;
  maxBit: number;
}
