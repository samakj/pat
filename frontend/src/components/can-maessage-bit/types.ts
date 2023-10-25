/** @format */

import { CANMessageType } from '../../store/slices/can/types';

export interface BitPropsType {
  arbitrationId: CANMessageType['arbitration_id'];
  bitNo: number;
}
