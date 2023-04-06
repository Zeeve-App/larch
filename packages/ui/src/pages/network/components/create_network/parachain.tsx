import React, { SyntheticEvent } from 'react';
import { useEffect } from 'react';
import NavBar from './navbar';
import IconUp from "./assets/upload.svg";
import { Input } from 'postcss';
import { Link } from 'react-router-dom';


export function CreateParachain() {

  useEffect(() => {
    onload
    console.log('create relay netwrok page load')

  }, [])
  return (
    <div className=' flex-col flex'>
      <NavBar pageSlug='parachain_config' />
      <div className='w-[750px] h-[560px]'>
        <div className='text-white pl-4 py-4 font-rubik flex flex-col gap-y-3'>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3'>ID</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <input className='bg-black text-white border-2 rounded border-border py-1.5 px-2 flex flex-row'></input>
            </div>

            <span className='pt-3'>Add to</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <div className='w-max border-border border-2 gap-x-3 rounded py-0.5 px-0.5 '>
              <button className=' text-white px-3 py-1 border-border border-2 rounded'>Genesis</button>
              <button className='text-white px-2 py-1 rounded border-border border-2 '>Runtime</button>
            </div>
            </div>
          </div>
         
          <div className='text-white py-4 font-rubik flex flex-row gap-3'>
            <label className=''>Enable Cumulus</label>
            <input type="checkbox" className='bg-black ' />
          </div>

          <div className='text-white  py-4 font-rubik flex flex-col gap-y-3'>
            <span >WASM file(Create/Edit)</span>
            <div className='w-max h-max border-border flex flex-col items-center py-12 px-12 rounded border-2 '>
              <div>
                <img className="w-6 h-6  m-2.5  " src={IconUp} alt="" />
              </div>
              <div>
                <h3 className='font-rubik'>Select from Template or upload from spec files</h3>
              </div>
            </div>
            <div className='flex flex-row gap-x-4'>
              <span className='pt-3'>Command to Genrate WASM</span>
              <div className='flex flex-row items-start py-1.5 px-4'>
                <input className='bg-black border-border border-2 rounded py-1 px-2 w-[250px]'></input>
              </div>
            </div>
          </div>
          <div className='text-white  py-4 font-rubik flex flex-col gap-y-1 pt-2'>
            <div className='flex flex-row gap-x-4'>
              <span className='pt-3 font-rubik'>State file</span>
              <div className='flex flex-row items-start py-1.5 px-4'>
              </div>              
            </div>
          </div>
        </div>
      </div>
      <div className='h-18 gap-x-6 px-6  w-full border-b-2 flex flex-row border-border'></div>
      <div className='flex justify-end py-4 gap-x-4'>
      <Link to="/template/createNetwork/relaychain"><button className='text-white border-border border-2 rounded py-2 px-4 bg-gray'>Back</button></Link>
      <Link to="/template/createNetwork/collator"><button className='text-white border-border border-2 rounded py-2 px-4 bg-gray'>Next</button></Link>
      </div>

    </div>

  );

}
export default CreateParachain;
