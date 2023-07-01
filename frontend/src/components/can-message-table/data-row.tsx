/** @format */

import React from 'react';
import { DataRowPropsType } from './types';
import { ArbitrationId } from './arbitration-id-cell';
import { Byte } from './byte-cell';
import { Timestamp } from './timetsamp-cell';

export const DataRow: React.FunctionComponent<DataRowPropsType> = ({ arbitrationId }) => (
  <tr>
    <ArbitrationId arbitrationId={arbitrationId} />
    <Timestamp arbitrationId={arbitrationId} />
    <Byte arbitrationId={arbitrationId} byteNo={0} />
    <Byte arbitrationId={arbitrationId} byteNo={1} />
    <Byte arbitrationId={arbitrationId} byteNo={2} />
    <Byte arbitrationId={arbitrationId} byteNo={3} />
    <Byte arbitrationId={arbitrationId} byteNo={4} />
    <Byte arbitrationId={arbitrationId} byteNo={5} />
    <Byte arbitrationId={arbitrationId} byteNo={6} />
    <Byte arbitrationId={arbitrationId} byteNo={7} />
  </tr>
);
