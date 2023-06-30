/** @format */

import React from 'react';
import { MdHomeFilled } from 'react-icons/md';

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
};
