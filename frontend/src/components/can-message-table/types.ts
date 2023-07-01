/** @format */

import { CANMessageType } from '../../store/slices/devices/types';

export interface BitPropsType {
  arbitrationId: CANMessageType['arbitration_id'];
  bitNo: number;
  checkIgnored?: boolean;
}

export interface ByteCellPropsType {
  arbitrationId: CANMessageType['arbitration_id'];
  byteNo: number;
}

export interface TimestampCellPropsType {
  arbitrationId: CANMessageType['arbitration_id'];
}

export interface ArbitrationIdCellPropsType {
  arbitrationId: CANMessageType['arbitration_id'];
}

export interface DataRowPropsType {
  arbitrationId: CANMessageType['arbitration_id'];
}
