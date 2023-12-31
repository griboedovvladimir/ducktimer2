import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Route, Routes } from 'react-router-dom';

import { ROUTE_CONSTANTS } from '../../CONSTANTS';
import { Login } from '../../pages/Login';
import { Main } from '../../pages/Main/Main';

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
  ];

  const renderRoutes = (routeElements: any[]) => {
    return routeElements.map((route) => {
      const { path, component } = route;

      return <Route key={path} path={path} element={component} />;
    });
  };

  return <Routes>{renderRoutes(routes)}</Routes>;
};
