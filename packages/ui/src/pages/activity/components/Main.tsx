import React from 'react';
import IconImage from "../assets/Search.svg";
import { useEffect, useState } from "react";
import Parent from './Parent';

export function Activity() {


  return (
    <div className='p-6 gap-6 flex-col flex'>
      <div className='h-12 w-[1138px] flex'>
        <div className='w-[350px] h-12 bg-black border-2 border-border rounded flex '>
          {/* <h3 className='text-white font-rubik text-base m-2.5'>Search... search </h3>
         */}
          <form className="flex w-full justify-between px-4  ">
            <input className="form-control text-white focus:outline-none w-full bg-black me-2 font-rubik text-base " placeholder="Search..." />
            <img className="w-6 h-6  m-2.5  " src={IconImage} alt="" />

          </form>
          {/* <img className="w-4 h-4 m-2.5 " src= {IconImage} alt=""/> */}

        </div>
        <div className="h-full flex w-full flex-wrap	content-center  item-center justify-end gap-4">
          <div className='item-center'>
            <div className="bg-create-button gap-2 text-white font-rubik flex flex-row border-2 border-border rounded h-10  items-center">
              <div className='border-r-2 flex flex-row items-start py-1.5 px-4 border-border h-full'>Week</div>
              <span className='border-r-2 flex flex-row items-start py-1.5 px-4 border-border h-full'>Month</span>
              <span className='border-r-2 flex flex-row items-start py-1.5 px-4 border-border h-full'>Year</span>
            </div>
          </div>
        

        </div>
      </div>
      <Parent/>
      
    </div>



  );
}
export default Activity;