import React, { SyntheticEvent, createContext } from 'react';
import { useEffect } from 'react';
import NavBar from './navbar';
import IconUparrow from "./assets/up.svg";
import IconDownarrow from "./assets/down.svg";
import IconDlt from "./assets/dlt.svg";
import IconSave from "./assets/duplicate.svg";
import { Input } from 'postcss';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import myTheme from './theme';
import { getStatistics } from './linecount'





export function CreateHrmp() {

  interface Statistics {
    lineCount: number;

    length: number;


  }

  const [counter, setCounter] = useState(1);
  const [counter1, setCounter1] = useState(2);


  //increase counter
  const increase = () => {
    setCounter(count => count + 1);
  };
  const increase1 = () => {
    setCounter1(count => count + 1)
  };

  //decrease counter
  const decrease = () => {
    setCounter(count => count - 1);

  };
  const decrease1 = () => {
    setCounter1(count => count - 1)

  };

  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    console.log('value:', value);
  }, []);

  return (
    <div className=' flex-col flex'>
      <NavBar pageSlug='hrmp' />
      <div className='w-[750px] h-[560px]'>

        <div className='text-white pl-4 py-4 font-rubik flex flex-col gap-y-3'>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3'>Sender</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <input className='bg-black border-border border-2 rounded py-1 px-2 w-[250px]'></input>
            </div>
            <span className='pt-3'>Recipient</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <input className='bg-black border-border border-2 rounded py-1 px-2 w-[250px]'></input>
            </div>
          </div>
          <div className='text-white  py-4 font-rubik flex flex-col gap-y-4'>
            <div className='flex flex-col gap-y-4'>
              <div className='flex gap-x-4'>
                <span>Max Cabability</span>
                <div className="bg-black border-border border-2 rounded text-white  flex flex-row gap-x-12">
                  <span className='py-1.5 px-2'>{counter}</span>
                  <span className='text-white py-1.5 px-1.5'> <span onClick={increase}><img className="w-3 h-3 " src={IconUparrow} alt="" /></span><span><img className="w-3 h-3 " src={IconDownarrow} alt="" onClick={decrease} /></span></span>
                </div>
              </div>
              <div className='flex gap-x-4'>
                <span>Max message size</span>
                <div className="bg-black border-border border-2 rounded text-white  flex flex-row gap-x-12">
                  <span className='py-1.5 px-2'>{counter1}</span>
                  <span className='text-white py-1.5 px-1.5'> <img className="w-3 h-3 " src={IconUparrow} alt="" onClick={increase1} /><img className="w-3 h-3 " src={IconDownarrow} alt="" onClick={decrease1} /></span>

                </div>
              </div>
            </div>
            <div className='border-border border-2 rounded'>
              <div className='h-[50px] border-b-2 border-border'><div className='flex flex-row gap-x-2 justify-end py-3 px-1.5 '><img className="w-6 h-6 " src={IconSave} alt="" /><img className="w-6 h-6 " src={IconDlt} alt="" /></div></div>

              <CodeMirror
                value="console.log('hello world!');"
                height="200px"
                theme={myTheme}
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}
              />
              <div className='h-[50px] border-t-2 border-border'> <div className='flex justify-end py-1.5 px-1.5 gap-x-3'>
                <button className='text-white border-border border-2 rounded py-1 px-4 bg-gray hover:bg-grad'>Cancel</button>
                <button className='text-white border-border border-2 rounded py-1 px-4 bg-gray'>Save</button>
              </div></div>
            </div>
          </div>
        </div>
      </div>
      <div className='h-18 gap-x-6 px-6  w-full border-b-2 flex flex-row border-border'></div>
      <div className='flex justify-end py-4 gap-x-4'>
        <Link to="/template/createNetwork/collator"><button className='text-white border-border border-2 rounded py-2 px-4 bg-gray'>Back</button></Link>
        <button className='text-white border-border border-2 rounded py-2 px-4 bg-gray'>Save</button>
      </div>


    </div>

  );

}
export default CreateHrmp;
