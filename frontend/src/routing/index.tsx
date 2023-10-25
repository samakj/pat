/** @format */

import React from 'react';
import { BrowserRouter, Routes as RoutesWrapper, Route, Navigate } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { RouterPropsType } from './types';

import { PageStructure } from '../components/page-structure';
import { Index } from '../views/index';
import { CAN } from '../views/can';

export const ContextualRouter: React.FunctionComponent<RouterPropsType> = ({
  location,
  children,
}) =>
  location ? (
    <StaticRouter location={location}>{children}</StaticRouter>
  ) : (
    <BrowserRouter>{children}</BrowserRouter>
  );

export const Routes: React.FunctionComponent = () => {
  return (
    <PageStructure>
      <RoutesWrapper>
        <Route path="/" element={<Index />} />
        <Route path="/can" element={<CAN />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </RoutesWrapper>
    </PageStructure>
  );
};

export const Router: React.FunctionComponent<RouterPropsType> = ({ location }) => {
  return location ? (
    <StaticRouter location={location}>
      <Routes />
    </StaticRouter>
  ) : (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};
