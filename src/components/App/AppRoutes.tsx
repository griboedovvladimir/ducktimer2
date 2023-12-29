import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Route, Routes } from 'react-router-dom';

import { Login } from '../../pages/Login';
import { Main } from '../../pages/Main/Main';

interface IAppRoutes {
  path: string;
  component: React.ReactElement;
}

export const AppRoutes = () => {
  const routes: IAppRoutes[] = [
    {
      path: '/',
      component: <Main />,
    },
    {
      path: '/login',
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
