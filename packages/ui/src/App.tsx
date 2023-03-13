import React from 'react';
import './App.css'
import Header from './components/header'
import Menu from './components/main_menu'
import DashContent from './pages/dashboard/components/dashboard_content'


function App() {
  return (
   <>
      <Header/>

    <div className='flex flex-row gap-0 bg-black'>
        <Menu />
        <DashContent/>
    </div>
   
    </>
 
  );
}

export default App
