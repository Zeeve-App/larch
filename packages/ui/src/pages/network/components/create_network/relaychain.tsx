import React, { SyntheticEvent } from 'react';
import { useEffect } from 'react';
import NavBar from './navbar';
import IconUp from "./assets/upload.svg";
import { Link } from 'react-router-dom';

export function CreateRelaychain() {

  useEffect(() => {
    onload
    console.log('create relay netwrok page load')

  }, [])

  return (
    <div className=' flex-col flex'>
      <NavBar pageSlug='relaychain_config' />
      <div className='w-[750px] h-[560px]'>
        <div className='text-white pl-4 py-4 font-rubik flex flex-col gap-y-5'>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3'>Select Image</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <select className='bg-black text-white border-2 rounded border-border py-1.5 px-2 flex flex-row'>
                <option className='text-white '>Select</option>
                <option className='text-white '>option 2</option>
                <option className='text-white '>option 3</option>
                <option className='text-white '> option 4 </option>
                <option className='text-white '> option 5 </option>
              </select>
            </div>
          </div>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3'>Select Chain</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <select className='bg-black text-white border-2 rounded border-border py-1.5 px-2 flex flex-row'>
                <option className='text-white '>Select</option>
                <option className='text-white '>option 2</option>
                <option className='text-white '>option 3</option>
                <option className='text-white '> option 4 </option>
                <option className='text-white '> option 5 </option>
              </select>
            </div>
          </div>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3'>Command</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <input className='bg-black border-border border-2 rounded w-[250px]'></input>
            </div>
          </div>
        </div>
        <div className='text-white pl-4 py-4 font-rubik gap-3'>
          <span >Spec file(Create/Edit)</span>
          <div className='w-max h-max border-border flex flex-col items-center py-12 px-12 rounded border-2'>
            <div>
              <img className="w-6 h-6  m-2.5  " src={IconUp} alt="" />
            </div>
            <div>
              <h3 className='font-rubik'>Select from Template or upload from spec files</h3>
            </div>
          </div>
        </div>

        <div className='text-white pl-4 py-4 font-rubik flex flex-col gap-y-4 pt-3'>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3 font-rubik'>Default Overide</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <select className='bg-black text-white border-2 rounded border-border py-1.5 px-2 flex flex-row'>
                <option className='text-white '>Select</option>
                <option className='text-white '>option 2</option>
                <option className='text-white '>option 3</option>
                <option className='text-white '> option 4 </option>
                <option className='text-white '> option 5 </option>
              </select>
            </div>
            <div className="bg-black border-border border-2 rounded w-max h-max py-1.5 px-4 mt-1">
              <h4>String</h4>
            </div>
          </div>
        </div>
      </div>
      <div className='h-18 gap-x-6 px-6  w-full border-b-2 flex flex-row border-border'></div>
      <div className='flex justify-end py-4 gap-x-4'>
      <Link to="/template/createNetwork/setting"><button className='text-white border-border border-2 rounded py-2 px-4 bg-gray'>Back</button></Link>
      <Link to="/template/createNetwork/parachain"> <button className='text-white border-border border-2 rounded py-2 px-4 bg-gray'>Next</button></Link>
      </div>

    </div>

  );

}
export default CreateRelaychain;
