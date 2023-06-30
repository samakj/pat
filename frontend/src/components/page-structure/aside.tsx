/** @format */

import React from 'react';
import { Navigation } from '../navigation';
import { AsideContentElement, PageAsideElement } from './elements';

export const Aside: React.FunctionComponent = () => {
  return (
    <PageAsideElement>
      <AsideContentElement>
        <Navigation />
      </AsideContentElement>
    </PageAsideElement>
  );
};
