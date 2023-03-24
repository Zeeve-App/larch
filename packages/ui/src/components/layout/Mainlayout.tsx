/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Header from '../header'
import Menu from '../main_menu'
import { Outlet } from "react-router";






export default function MainLayout(){

    return (
        <>
         <Header/>
         <div className='flex flex-row gap-0 bg-black'>
             <Menu />
             <Outlet/>
            
            
         </div>
       
         </>
      
       );
}
