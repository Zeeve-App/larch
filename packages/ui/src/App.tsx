import { useRoutes, RouteObject } from 'react-router-dom';
import './App.css';
import MainLayout from './components/layout/Mainlayout';
import Dashboard from './pages/dashboard/page';
import Network from './pages/network/components/network_content';
import CreateNetwork from './pages/network/components/create_network/create_network';
import CreateRelaychain from './pages/network/components/create_network/relaychain';
import CreateParachain from './pages/network/components/create_network/parachain';
import CreateCollator from './pages/network/components/create_network/collator';
import CreateHrmp from './pages/network/components/create_network/hrmp';
import Activity from './pages/activity/page';
import Template from './pages/template/components/config';
import Setting from './pages/setting/page';
import DslEdit from './pages/dsl_edit/components/Main';

const routes: RouteObject[] = [

  {
    element: <MainLayout />,
    children: [

      {
        path: ('/'),
        element: <Dashboard />,
      },
      {
        path: ('/dashboard'),
        element: <Dashboard />,
      },
      {
        path: ('/network'),
        element: <Network />,

      },
      {
        path: ('/template/createNetwork/setting'),
        element: <CreateNetwork />,
      },
      {
        path: ('/template/createNetwork/relaychain'),
        element: <CreateRelaychain />,
      },
      {
        path: ('/template/createNetwork/parachain'),
        element: <CreateParachain />,
      },
      {
        path: ('/template/createNetwork/collator'),
        element: <CreateCollator />,
      },
      {
        path: ('/template/createNetwork/hrmp'),
        element: <CreateHrmp />,
      },

      {
        path: ('/setting'),
        element: <Setting />,
      },

      {
        path: ('/dsledit'),
        element: <DslEdit />,
      },

      {
        path: ('/activity'),
        element: <Activity />,
      },

      {
        path: ('/template'),
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
