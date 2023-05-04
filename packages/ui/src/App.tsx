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