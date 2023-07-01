/** @format */

import React from 'react';
import { ArbitrationIdCellPropsType } from './types';

export const ArbitrationIdCell: React.FunctionComponent<ArbitrationIdCellPropsType> = ({
  arbitrationId,
}) => {
  return <td>{arbitrationId}</td>;
};
