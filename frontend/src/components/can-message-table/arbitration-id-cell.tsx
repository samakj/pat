/** @format */

import React from 'react';
import { ArbitrationIdCellPropsType } from './types';

export const ArbitrationId: React.FunctionComponent<ArbitrationIdCellPropsType> = ({
  arbitrationId,
}) => {
  return <td>{arbitrationId}</td>;
};
