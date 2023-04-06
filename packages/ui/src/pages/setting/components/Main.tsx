import React from 'react';
import IconImage from "../assets/Search.svg";


export function Setting() {
return (
  <div className='p-6 gap-6 flex-col flex'>
   <div className='h-12 w-[1138px] flex'>
      <div className='w-[350px] h-12 bg-black border-2 border-border rounded flex '>
         {/* <h3 className='text-white font-rubik text-base m-2.5'>Search... search </h3>
         */}
         <form className="flex w-full justify-between px-4  ">
        <input className="form-control text-white focus:outline-none w-full bg-black me-2 font-rubik text-base "  placeholder="Search..." />
        {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
        <img className="w-6 h-6  m-2.5  " src= {IconImage} alt=""/>
        
          </form>
         {/* <img className="w-4 h-4 m-2.5 " src= {IconImage} alt=""/> */}
        
      </div>
     
     </div>
     
   </div>

   
);
}
export default Setting;