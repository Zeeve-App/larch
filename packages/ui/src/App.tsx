import React from 'react';
import { useEffect } from 'react';
import './App.css'
import MainLayout from './components/layout/Mainlayout'
import Dashboard from './pages/dashboard/components/dashboard_content'
import Network from './pages/network/components/network_content'
import CreateNetwork from './pages/network/components/create_network/create_network'
import CreateRelaychain from './pages/network/components/create_network/relaychain'
import CreateParachain from './pages/network/components/create_network/parachain'
import CreateCollator from './pages/network/components/create_network/collator'
import CreateHrmp from './pages/network/components/create_network/hrmp'
import Activity from './pages/activity/components/Main'
import Template from './pages/template/components/config'
import Setting from './pages/setting/components/Main'
import DslEdit from './pages/dsl_edit/components/Main'
import { useRoutes, RouteObject, Navigate } from "react-router";

const idb = window.indexedDB
const createCollectionsInIndexDB = () => {
  if (!idb) {

    console.log("THis window is react app window");
  }
  console.log(idb)
  const req = idb.open('test-db1', 1);

  req.onerror = (event) => {
    console.log("error", event)
    console.log("handling error")
  };

  req.onupgradeneeded = (event) => {
    const db = req.result
    if (!db.objectStoreNames.contains("userdata")) {
      db.createObjectStore("usedata", {
        keyPath: "id",
      });
    }
  }

  req.onsuccess = () => {
    console.log("successfully created")

  }
}


const routes: RouteObject[] = [

  {
    element: <MainLayout />,
    children: [

      {
        path: ("/"),
        element: <Dashboard />,
      },
      {
        path: ("/dashboard"),
        element: <Dashboard />,
      },
      {
        path: ("/network"),
        element: <Network />,

      },
      {
        path: ("/template/createNetwork/setting"),
        element: <CreateNetwork />,
      },
      {
        path: ("/template/createNetwork/relaychain"),
        element: <CreateRelaychain />,
      },
      {
        path: ("/template/createNetwork/parachain"),
        element: <CreateParachain />,
      },
      {
        path: ("/template/createNetwork/collator"),
        element: <CreateCollator />,
      },
      {
        path: ("/template/createNetwork/hrmp"),
        element: <CreateHrmp />,
      },

      {
        path: ("/setting"),
        element: <Setting />,
      },

      {
        path: ("/dsledit"),
        element: <DslEdit />,
      },

      {
        path: ("/activity"),
        element: <Activity />,
      },

      {
        path: ("/template/configuration"),
        element: <Template />,
      },

    ],
  },
]


const App = () => {

  useEffect(() => {
    createCollectionsInIndexDB()

  }, [])

  const element = useRoutes(routes);
  return element;

}

export default App
