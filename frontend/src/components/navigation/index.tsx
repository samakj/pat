/** @format */

import React from 'react';
import { navigationConfig } from '../../configs/navigation';
import { NavItemElement, NavLinkElement, NavLinkText, NavListElement } from './elements';

export const Navigation: React.FunctionComponent = () => {
  return (
    <nav>
      <NavListElement>
        {Object.entries(navigationConfig).map(([key, navItem]) => (
          <NavItemElement key={key}>
            <NavLinkElement to={navItem.path}>
              {navItem.icon}
              <NavLinkText>{navItem.name}</NavLinkText>
            </NavLinkElement>
          </NavItemElement>
        ))}
      </NavListElement>
    </nav>
  );
};
