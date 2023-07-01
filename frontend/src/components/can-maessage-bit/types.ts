/** @format */

import { CANMessageType } from '../../store/slices/devices/types';

export interface BitPropsType {
  arbitrationId: CANMessageType['arbitration_id'];
  bitNo: number;
  checkIgnored?: boolean;
}
