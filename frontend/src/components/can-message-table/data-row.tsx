/** @format */

import React from 'react';
import { DataRowPropsType } from './types';
import { ArbitrationIdCell } from './arbitration-id-cell';
import { ByteCell } from './byte-cell';
import { TimestampCell } from './timetsamp-cell';

export const DataRow: React.FunctionComponent<DataRowPropsType> = ({ arbitrationId }) => (
  <tr>
    <ArbitrationIdCell arbitrationId={arbitrationId} />
    <TimestampCell arbitrationId={arbitrationId} />
    <ByteCell arbitrationId={arbitrationId} byteNo={0} />
    <ByteCell arbitrationId={arbitrationId} byteNo={1} />
    <ByteCell arbitrationId={arbitrationId} byteNo={2} />
    <ByteCell arbitrationId={arbitrationId} byteNo={3} />
    <ByteCell arbitrationId={arbitrationId} byteNo={4} />
    <ByteCell arbitrationId={arbitrationId} byteNo={5} />
    <ByteCell arbitrationId={arbitrationId} byteNo={6} />
    <ByteCell arbitrationId={arbitrationId} byteNo={7} />
  </tr>
);
