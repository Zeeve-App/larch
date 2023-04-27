import { useRoutes, RouteObject, Navigate } from 'react-router-dom';
import './App.css';
import MainLayout from './components/layout/Mainlayout';
import Dashboard from './pages/dashboard/page';
import Network from './pages/network/page';
import CreateNetwork from './pages/create_network/create_network';
import CreateRelayChain from './pages/create_network/components/relaychain';
import CreateParachain from './pages/create_network/components/parachain';
import TestConfig from './pages/create_network/components/testConfig';
import CreateHrmp from './pages/create_network/components/hrmp';
import Activity from './pages/activity/page';
import Template from './pages/template/page';
import Setting from './pages/setting/page';
import RunList from './pages/run-list/page';
import Documentation from './pages/documentation/page';

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
        path: '/template/createNetwork/setting',
        element: <CreateNetwork />,
      },
      {
        path: '/template/createNetwork/relaychain',
        element: <CreateRelayChain />,
      },
      {
        path: '/template/createNetwork/parachain',
        element: <CreateParachain />,
      },
      {
        path: '/template/createNetwork/hrmp',
        element: <CreateHrmp />,
      },
      {
        path: '/template/createNetwork/testconfig',
        element: <TestConfig />,
      },
      {
        path: '/setting',
        element: <Setting />,
      },

      {
        path: '/run-list',
        element: <RunList />,
      },

      {
        path: '/activity',
        element: <Activity />,
      },

      {
        path: '/template',
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
