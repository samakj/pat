/** @format */

import React from 'react';
import { MdHomeFilled, MdExtension } from 'react-icons/md';

export const navigationConfig: {
  [key: string]: {
    path: string;
    icon?: React.ReactNode;
    name: string;
    scopes?: string[];
  };
} = {
  '/': {
    path: '/',
    icon: <MdHomeFilled />,
    name: 'Home',
  },
  '/can': {
    path: '/can',
    icon: <MdExtension />,
    name: 'CAN',
  },
};
