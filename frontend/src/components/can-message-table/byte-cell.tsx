/** @format */

import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { BitPropsType, ByteCellPropsType } from './types';
import { useSelector } from '../../store';

export const Bit: React.FunctionComponent<BitPropsType> = ({
  arbitrationId,
  bitNo,
  checkIgnored,
}) => {
  const prevBit = useRef<string>();
  const isIgnored = useMemo(() => false, [checkIgnored, bitNo]);
  const bit = useSelector((state) =>
    isIgnored ? '-' : state.can.messages?.[arbitrationId]?.data[bitNo]
  );
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    if (bit !== prevBit.current) {
      prevBit.current = bit;
      setStyle({ color: 'red', fontWeight: 'bold' });
      const timeout = setTimeout(() => setStyle({}), 500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [bit, setStyle]);

  if (!bit) return null;
  return <span style={style}>{bit}</span>;
};

export const Byte: React.FunctionComponent<ByteCellPropsType> = ({ arbitrationId, byteNo }) => (
  <td>
    <Bit arbitrationId={arbitrationId} bitNo={8 * byteNo + 0} checkIgnored />
    <Bit arbitrationId={arbitrationId} bitNo={8 * byteNo + 1} checkIgnored />
    <Bit arbitrationId={arbitrationId} bitNo={8 * byteNo + 2} checkIgnored />
    <Bit arbitrationId={arbitrationId} bitNo={8 * byteNo + 3} checkIgnored />
    <Bit arbitrationId={arbitrationId} bitNo={8 * byteNo + 4} checkIgnored />
    <Bit arbitrationId={arbitrationId} bitNo={8 * byteNo + 5} checkIgnored />
    <Bit arbitrationId={arbitrationId} bitNo={8 * byteNo + 6} checkIgnored />
    <Bit arbitrationId={arbitrationId} bitNo={8 * byteNo + 7} checkIgnored />
  </td>
);
