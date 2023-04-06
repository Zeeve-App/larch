/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import IconNetwork from "./assets/My-Network.svg";
import IconTemp from "./assets/template.svg";
import IconUser from "./assets/User-Editor.svg";
import { Link } from 'react-router-dom';

export default function Dashboard() {

  return (


    <div className='h-full bg-black p-6'>

      <div className="bg-create-button flex flex-col gap-6 p-6 border-2 border-border  rounded-2xl  border-solid box-border max-w-max	">

        <h3 className='text-white font-rubik text-xl	font-bold'>Explore Dashboard</h3>
        <div className='flex flex-row gap-6 flex-wrap'>
          <div className='flex flex-col gap-6 p-6 rounded-xl border-2 border-border bg-black  max-w-[346px]'>
            <Link to="/network">
            <div className='w-74 h-50.5 p-0 gap-6.25'>
                <div className='w-[68px] h-[68px] items-center flex justify-center mb-6 content-center border-2 border-border rounded-2xl  border-solid '>
                  <img className="w-8 h-8" src={IconNetwork} alt="" />
                </div>
                <h4 className='text-white font-rubik leading-8 font-bold'>Network</h4>
                <span className='text-gradiant font-rubik leading-8 '>Number: (5/100)</span>
                <p className='text-white font-rubik leading-8'>Amet minim mollit non deserunt ullamco est sit aliqua dolor.</p>
            </div>
            </Link>
          </div>
       

        <div className='flex flex-col gap-6 p-6 rounded-2xl border-2 border-border bg-black max-w-[350px] space-y-4'>
          <Link to="/template">
          <div className='w-74 h-50.5 p-0 gap-6.25'>
            <div className='w-[68px] h-[68px] items-center flex justify-center mb-6 content-center  border-2 border-border rounded-2xl  border-solid'>
              <img className="w-8 h-8" src={IconTemp} alt="" />
            </div>
            <h4 className='text-white font-rubik leading-8 font-bold'>Template</h4>
            <span className='text-gradiant font-rubik leading-8'>Number: (5/100)</span>
            <p className='text-white font-rubik leading-8'>Amet minim mollit non deserunt ullamco est sit aliqua dolor.</p>
          </div>
          </Link>
        </div>

        <div className='flex flex-col gap-6 p-6 rounded-2xl border-2 border-border bg-black max-w-[350px]'>
        <Link to="/dsledit">
          <div className='w-74 h-50.5 p-0 gap-6.25 gap-y-1	'>
            <div className='w-[68px] h-[68px] items-center flex justify-center content-center border-2  border-border mb-6 rounded-2xl  border-solid'>
              <img className="w-8 h-8 " src={IconUser} alt="" />
            </div>
            <h4 className='text-white font-rubik leading-8 font-bold'>DSL Edit</h4>
            <span className='text-gradiant font-rubik leading-8'>Number: (5/100)</span>
            <p className='text-white font-rubik leading-8'>Amet minim mollit non deserunt ullamco est sit aliqua dolor.</p>
          </div>
          </Link>
        </div>
      </div>
    </div>

</div >
    
);
}
