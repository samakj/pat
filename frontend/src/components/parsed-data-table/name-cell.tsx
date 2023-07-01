/** @format */

import React from 'react';
import { NameCellPropsType } from './types';

export const NameCell: React.FunctionComponent<NameCellPropsType> = ({ name }) => {
  return <td>{name}</td>;
};
