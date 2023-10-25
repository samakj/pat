/** @format */

import { CANMessageType } from '../../store/slices/can/types';

export interface IntPropsType {
  arbitrationId: CANMessageType['arbitration_id'];
  bits: [from: number, to: number];
}
