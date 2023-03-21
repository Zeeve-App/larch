/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Logo from "./assets/logo.svg";
import IconPlus from "./assets/plus.svg";
import IconNotify from "./assets/notification.svg";
import IconImage from "./assets/image.svg";



export function Header() {

  
return (
<nav className="flex items-center h-20 w-360 flex-row items-center bg-black  box-border gap-176.5 border-b top-0 left-0 divide-solid	border-border ">
  <div className="flex items-left p-0 flex-col gap-2.5 w-64 h-20 border-r box-border border-solid border-r-border flex-none grow-0 order-0 justify-center ">
      <span className='flex p-0 items-center flex-col gap-2 w-23.25 h-8.25 flex-none grow-0 order-0'> <img src={Logo} alt=""/></span>
  </div>
  

    <div className="h-full flex w-full flex-row	flex-wrap	content-center  items-center pr-6 justify-end gap-4">
      <div className='item-center '>
      <button className="bg-create-button text-white font-rubik flex  border-2 border-border rounded h-10 px-4 items-center">
        <span>Create</span> 
        <img  className="w-6 h-6" src= {IconPlus} alt=""/>
      </button>
      </div>
      <div className='flex items-center	p-2.5  bg-create-button border-border rounded'>
          <img  className="w-6 h-6 content-center" src= {IconNotify} alt=""/>
      </div>
      <div className='flex items-center	p-1 bg-create-button border-border rounded'>
          <img className="content-center " src= {IconImage} alt=""/>
      </div>
    </div>
</nav>
  
);
}
export default Header;