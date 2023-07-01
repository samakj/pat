/** @format */

import { CANDataType } from '../store/slices/devices/types';

export const dataMap: {
  name: string;
  arbitrationId: CANDataType['arbitration_id'];
  minBit: number;
  maxBit: number;
}[] = [];

export const ignoredData: {
  [arbitrationId: CANDataType['arbitration_id']]: { minBit: number; maxBit: number }[];
} = {};
