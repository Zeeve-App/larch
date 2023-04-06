import React from 'react';
import IconImage from "../assets/Search.svg";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Link } from 'react-router-dom';




export function DslEdit() {

  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    console.log('value:', value);
  }, []);
  return (
    <div className='p-6 gap-6 flex-col flex'>
      <div className='h-12 w-[1138px] flex'>
        <div className='w-[350px] h-12 bg-black border-2 border-border rounded flex '>
          {/* <h3 className='text-white font-rubik text-base m-2.5'>Search... search </h3>
         */}
          <form className="flex w-full justify-between px-4  ">
            <input className="form-control text-white focus:outline-none w-full bg-black me-2 font-rubik text-base " placeholder="Search..." />
            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
            <img className="w-6 h-6  m-2.5  " src={IconImage} alt="" />

          </form>
          {/* <img className="w-4 h-4 m-2.5 " src= {IconImage} alt=""/> */}

        </div>

      </div>
      <div className=" ">
        <table className="text-white border-2 border-border font-rubik w-full rounded">
          <thead className='bg-create-button'>
            <tr className=' border-b-2 border-border'>
              <th className='px-6 py-3  text-left' scope="col">Template Name</th>
              <th className='px-6 py-3  text-left' scope="col">Description </th>
              <th className='px-6 py-3' scope="col">Created On </th>
              <th className='px-6 py-3 w-56.25' scope="col">Action</th>

            </tr>
          </thead>
          <tbody>
            
            <tr className=' border-b-2 border-border'>
              <td className='px-6 py-3 w-56.25'>@twitter</td>
              <td className='px-6 py-3 w-56.25'>@twitter</td>
              <td className='px-6 py-3 w-56.25 text-center'>@twitter</td>
              <td className='px-6 py-3 w-56.25 text-center'>
                <button className='border-border border-2 rounded px-2 bg-create-button mr-2'>edit</button>
                <Link to="/template/createNetwork/setting">
                  <button className='border-border border-2 rounded px-2 bg-create-button mr-2'>Create</button>
                </Link>
                <button className='border-border border-2 rounded px-2 bg-create-button text-white mr-2 hover:bg-yellow hover:text-black'>Duplicate</button>
                <button className='border-border border-2 rounded px-2 bg-create-button mr-2 hover:bg-red hover:text-black'>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>



  );
}
export default DslEdit;