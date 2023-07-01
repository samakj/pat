/** @format */

import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { useSelector } from '../../store';
import { HexPropsType } from './types';

export const Hex: React.FunctionComponent<HexPropsType> = ({ arbitrationId, bits }) => {
  const prevBitString = useRef<string>();
  const bitString = useSelector((state) =>
    state.can.messages?.[arbitrationId]?.data.slice(...bits)
  );
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    if (bitString !== prevBitString.current) {
      prevBitString.current = bitString;
      setStyle({ color: 'red', fontWeight: 'bold' });
      const timeout = setTimeout(() => setStyle({}), 500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [bitString, setStyle]);

  if (!bitString) return null;
  return <span style={style}>{parseInt(bitString, 2).toString(16)}</span>;
};
