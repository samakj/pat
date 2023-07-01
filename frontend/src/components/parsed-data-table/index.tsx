/** @format */

import React from 'react';
import { MappingType } from '../../store/slices/devices/types';
import { useSelector } from '../../store';
import { ParsedDataRow } from './parsed-data-row';

export const ParsedDataTable: React.FunctionComponent = () => {
  const names = useSelector(
    (state): MappingType['name'][] =>
      Object.values(state.can.mappings || {})
        .sort((mappingA: MappingType, mappingB: MappingType) => {
          if (mappingA.name < mappingB.name) return -1;
          if (mappingA.name > mappingB.name) return 1;
          return 0;
        })
        .map((mapping: MappingType) => mapping.name),
    (before, after) => {
      if (before.length != after.length) return false;
      for (const index in before) {
        if (before[index] != after[index]) return false;
      }
      return true;
    }
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th colSpan={8}>Data</th>
        </tr>
      </thead>
      <tbody style={{ fontFamily: 'monospace' }}>
        {names.map((name) => (
          <ParsedDataRow key={name} name={name} />
        ))}
      </tbody>
    </table>
  );
};
