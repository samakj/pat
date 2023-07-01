/** @format */

import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { BitPropsType } from './types';
import { useSelector } from '../../store';

export const Bit: React.FunctionComponent<BitPropsType> = ({ arbitrationId, bitNo }) => {
  const prevBit = useRef<string>();
  const bit = useSelector((state) => state.can.messages?.[arbitrationId]?.data[bitNo]);
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
