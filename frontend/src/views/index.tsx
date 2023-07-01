/** @format */

import React, { useCallback, useMemo, useState } from 'react';
import { useCANDataWebsocket } from '../store/slices/devices/websocket';
import { CANMessageTable } from '../components/can-message-table';
import { ParsedDataTable } from '../components/parsed-data-table';
import { CANWebsocketMeta } from '../components/can-websocket-meta';

export const Index: React.FunctionComponent = () => {
  useCANDataWebsocket({});
  const [whitelistInputValue, setWhitelistInputValue] = useState('');
  const [blacklistInputValue, setBlacklistInputValue] = useState('');

  const toIntListString = useCallback(
    (str: string) => str.replace(/[^\d,\s]/g, '').replace(/[\s]/g, ' '),
    []
  );

  const whitelist = useMemo(
    () =>
      new Set(
        whitelistInputValue
          .replace(' ', '')
          .split(',')
          .map((value) => parseInt(value))
          .filter((value) => !isNaN(value))
      ),
    [whitelistInputValue]
  );
  const blacklist = useMemo(
    () =>
      new Set(
        blacklistInputValue
          .replace(' ', '')
          .split(',')
          .map((value) => parseInt(value))
          .filter((value) => !isNaN(value))
      ),
    [blacklistInputValue]
  );

  return (
    <div>
      <CANWebsocketMeta />
      <hr />
      <ParsedDataTable />
      <hr />
      <input
        value={whitelistInputValue}
        onChange={(event) => setWhitelistInputValue(toIntListString(event.currentTarget.value))}
        placeholder="Whitelist"
      />
      <input
        value={blacklistInputValue}
        onChange={(event) => setBlacklistInputValue(toIntListString(event.currentTarget.value))}
        placeholder="Blacklist"
      />
      <CANMessageTable whitelist={whitelist} blacklist={blacklist} />
    </div>
  );
};
