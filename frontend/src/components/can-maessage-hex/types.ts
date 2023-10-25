/** @format */

import { CANMessageType } from '../../store/slices/can/types';

export interface HexPropsType {
  arbitrationId: CANMessageType['arbitration_id'];
  bits: [from: number, to: number];
}
