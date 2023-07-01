/** @format */

import React from 'react';

export const ParsedDataTable: React.FunctionComponent = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th colSpan={8}>Data</th>
        </tr>
      </thead>
      <tbody style={{ fontFamily: 'monospace' }}>
        {/* {<ParsedDataRow key={index} {...mapping} />} */}
      </tbody>
    </table>
  );
};
