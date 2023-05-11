/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

import { useRoutes, RouteObject, Navigate } from 'react-router-dom';
import './App.css';
import MainLayout from './components/layout/Mainlayout';
import Dashboard from './pages/dashboard/page';
import Network from './pages/network/page';
import Activity from './pages/activity/page';
import Template from './pages/template/page';
import RunList from './pages/executions/page';
import Documentation from './pages/documentation/page';

import CreateTemplate from 'src/pages/create_template'

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/dashboard' replace />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/documentation',
        element: <Documentation />,
      },
      {
        path: '/network',
        element: <Network />,
      },
      {
        path: '/templates/createNetwork',
        element: <CreateTemplate />
      },
      {
        path: '/executions',
        element: <RunList />,
      },

      {
        path: '/activity',
        element: <Activity />,
      },

      {
        path: '/templates',
        element: <Template />,
      },
    ],
  },
];

const App = () => {
  const element = useRoutes(routes);
  return element;
};

export default App;