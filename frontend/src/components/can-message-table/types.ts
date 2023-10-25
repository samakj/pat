/** @format */

import { CANMessageType } from '../../store/slices/can/types';

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

export interface CANMessageTablePropsType {
  whitelist?: Set<CANMessageType['arbitration_id']>;
  blacklist?: Set<CANMessageType['arbitration_id']>;
}
