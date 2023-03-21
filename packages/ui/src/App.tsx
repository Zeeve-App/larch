import React from 'react';
import './App.css'
import MainLayout from './components/layout/Mainlayout'
import Dashboard from './pages/dashboard/components/dashboard_content'
import Network from './pages/network/components/network_content'
import Activity from './pages/activity/components/Main'
import Template from './pages/template/components/Main'
import { useRoutes, RouteObject, Navigate } from "react-router";

const routes: RouteObject[] = [
  
      {
        element: <MainLayout />,
        children: [
          {
            path: ("/dashboard"),
            element: <Dashboard />,
          },
          {
            path: ("/network"),
            element: <Network />,
          },
         
          {
            path: ("/activity"),
            element: <Activity />,
          },

          {
            path: ("/template"),
            element: <Template />,
          },
          
        
        ],
      },
    ]
  

const App = () => {

  const element = useRoutes(routes);
  return element;

}

export default App
