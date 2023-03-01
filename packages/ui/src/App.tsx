import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes , Link} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Network from './pages/Network';


function App() {
  return (
  <BrowserRouter>
    <div>
    <nav>
        <Link to="/dashboard">Dashboard</Link><br></br>
        <Link to="/network">Network</Link>
        <ul>
          <li>
          <Link to="/network/list">List</Link>
          <li>
          <Link to="/network/create">Create</Link>
          </li>
          </li>
        </ul>
        <Link to="/template">Template</Link><br></br>
        <ul>
          <li>
          <Link to="/template/list">List</Link>
          <li>
          <Link to="/template/create">Create</Link>
          </li>
          </li>
        </ul>
        <Link to="/activity">Activity</Link><br></br>
        <Link to="/docs">Docs</Link><br></br>
        <Link to="/contact">Contact</Link><br></br>
        <ul>
          <li>
          <Link to="#">Email</Link>
          <li>
          <Link to="#">Support</Link>
          </li>
          </li>
        </ul>

    </nav>
    <Routes>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/network' element={<Network/>} />
        <Route path='/network/list' element={<Network/>} />
        <Route path='/network/create' element={<Network/>} />
        <Route path='/template' element={<Network/>} />
        <Route path='/template/list' element={<Network/>} />
        <Route path='/template/create' element={<Network/>} />
        <Route path='/activity' element={<Network/>} />
        <Route path='/docs' element={<Network/>} />
        <Route path='/contact' element={<Network/>} />


    </Routes>
    </div>
  </BrowserRouter>

  );
}
export default App;
