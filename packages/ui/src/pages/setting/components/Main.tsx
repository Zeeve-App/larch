import React from 'react';
import IconImage from "../assets/Search.svg";


export function Setting() {
   return (
      <div className='p-6 gap-6 flex-col flex'>
         <div className='h-12 w-[1138px] flex'>
            <div className='w-[350px] h-12 bg-black border-2 border-border rounded flex '>
               <form className="flex w-full justify-between px-4  ">
                  <input className="form-control text-white focus:outline-none w-full bg-black me-2 font-rubik text-base " placeholder="Search..." />
                  <img className="w-6 h-6  m-2.5  " src={IconImage} alt="" />
               </form>
            </div>
         </div>
         <div className=" ">
            <div className='flex flex-row gap-x-4'>
               <span className='pt-3 text-white'>Name</span>
               <div className='flex flex-row items-start py-1.5 px-4'>
                  <input className='bg-black border-border border-2 rounded py-1 px-2 w-[250px]'></input>
               </div>
            </div>
            <div className='flex flex-row gap-x-4'>
               <span className='pt-3 text-white'>Endpoint</span>
               <div className='flex flex-row items-start py-1.5 px-4'>
                  <input className='bg-black border-border border-2 rounded py-1 px-2 w-[250px]'></input>
               </div>
            </div>
         </div>
      </div>


   );
}
export default Setting;