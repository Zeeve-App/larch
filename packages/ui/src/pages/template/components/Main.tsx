import React from 'react';
import IconImage from "../assets/Search.svg";





export function Template() {
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
      <div className="h-full flex w-full flex-wrap	content-center  item-center justify-end gap-4">
      <div className='item-center'>
      <div className="bg-create-button gap-2 text-white font-rubik flex flex-row border-2 border-border rounded h-10  items-center">
        <div className='border-r-2 flex flex-row items-start py-1.5 px-4 border-border h-full'>
      
            <select className='bg-create-button'>
            <option className='text-black bg-white'>Filter By</option>
            <option className='text-black bg-white'>option 2</option>
            <option className='text-black bg-white'>option 3</option>
            <option className='text-black bg-white'> option 4 </option>
            <option className='text-black bg-white'> option 5 </option>
          </select></div> 
         
      </div>
      </div>
     
     </div>
     </div>
     <div className=" ">
     <table className="text-white border-2 border-border font-rubik w-full rounded">
      <thead className='bg-create-button'>
      <tr className=' border-b-2 border-border'>
         <th className='px-6 py-3 w-56.25' scope="col">Template Name</th>
         <th className='px-6 py-3' scope="col">Type</th>
         <th className='px-6 py-3' scope="col">Created On </th>
         <th className='px-6 py-3' scope="col">Created By</th>
         <th className='px-6 py-3' scope="col">Action</th>

      </tr>
      </thead>
  <tbody>
    <tr className=' border-b-2 border-border rounded '> 
      <td className='px-6 py-3 w-56.25 text-center	'>Mark</td>
      <td className='px-6 py-3 w-56.25 text-center	'>Otto</td>
      <td className='px-6 py-3 w-56.25 text-center	'>@mdo</td>
      <td className='px-6 py-3 w-56.25 text-center	'>@twitter</td>
   
    </tr>
    <tr className=' border-b-2 border-border'>
      <td className='px-6 py-3 w-56.25 text-center	'>Jacob</td>
      <td className='px-6 py-3 w-56.25 text-center	'>Thornton</td>
      <td className='px-6 py-3 w-56.25 text-center	'>@fat</td>
      <td className='px-6 py-3 w-56.25 text-center	'>@twitter</td>
     
    </tr>
    <tr className=' border-b-2 border-border'>
      <td className='px-6 py-3 w-56.25 text-center	'>@twitter</td>
      <td className='px-6 py-3 w-56.25 text-center	'>@twitter</td>
      <td className='px-6 py-3 w-56.25 text-center	'>@twitter</td>
      <td className='px-6 py-3 w-56.25 text-center	'>@twitter</td>
     

    </tr>
  </tbody>
  </table>
   </div>
   </div>


   
);
}
export default Template;