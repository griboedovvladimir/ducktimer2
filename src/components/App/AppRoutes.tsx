import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Route, Routes } from 'react-router-dom';

import { ROUTE_CONSTANTS } from '../../CONSTANTS';
import { Login } from '../../pages/Login';
import { Main } from '../../pages/Main/Main';
import { Registration } from '../../pages/Registration';

interface IAppRoutes {
  path: string;
  component: React.ReactElement;
}

export const AppRoutes = () => {
  const routes: IAppRoutes[] = [
    {
      path: ROUTE_CONSTANTS.ROOT,
      component: <Main />,
    },
    {
      path: ROUTE_CONSTANTS.LOGIN_PAGE,
      component: <Login />,
    },
    {
      path: ROUTE_CONSTANTS.REGISTRATION_PAGE,
      component: <Registration />,
    },
  ];

  const renderRoutes = (routeElements: any[]) => {
    return routeElements.map((route) => {
      const { path, component } = route;

      return <Route key={path} path={path} element={component} />;
    });
  };

  return <Routes>{renderRoutes(routes)}</Routes>;
};
