/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import NavBar from './navbar';
import IconUparrow from './assets/up.svg';
import IconDownarrow from './assets/down.svg';
import IconDlt from './assets/dlt.svg';
import IconSave from './assets/duplicate.svg';
import myTheme from './theme';
import { useHRMPStore } from '../../../store/createNetworkStore';

export function CreateHrmp() {
  const hrmpData = useHRMPStore((state) => state.hrmpData);
  const setHrmpData = useHRMPStore((state) => state.setHrmpData);

  const maxCapabilityHandler = (type: string) => {
    if (type === 'increment') {
      setHrmpData({ ...hrmpData, maxCapability: hrmpData.maxCapability + 1 });
    } else {
      setHrmpData({ ...hrmpData, maxCapability: hrmpData.maxCapability - 1 });
    }
  };
  const maxMsgSizeHandler = (type: string) => {
    if (type === 'increment') {
      setHrmpData({ ...hrmpData, maxMsgSize: hrmpData.maxMsgSize + 1 });
    } else {
      setHrmpData({ ...hrmpData, maxMsgSize: hrmpData.maxMsgSize - 1 });
    }
  };
  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    setHrmpData({ ...hrmpData, editorValue: value });
  }, []);
  return (
    <div className=' flex-col flex'>
      <NavBar pageSlug='hrmp' />
      <div className='w-[750px] h-[560px]'>
        <div className='text-white pl-4 py-4 font-rubik flex flex-col gap-y-3'>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3'>Sender</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <input
                type='text'
                className='bg-black border-border border-2 rounded py-1 px-2 w-[250px]'
                value={hrmpData.sender}
                onChange={(e) => setHrmpData({ ...hrmpData, sender: e.target.value })}
              />
            </div>
            <span className='pt-3'>Recipient</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <input
                type='text'
                className='bg-black border-border border-2 rounded py-1 px-2 w-[250px]'
                value={hrmpData.recipient}
                onChange={(e) => setHrmpData({ ...hrmpData, recipient: e.target.value })}
              />
            </div>
          </div>
          <div className='text-white  py-4 font-rubik flex flex-col gap-y-4'>
            <div className='flex flex-col gap-y-4'>
              <div className='flex gap-x-4'>
                <span>Max Cabability</span>
                <div className='bg-black border-border border-2 rounded text-white  flex flex-row gap-x-12'>
                  <span className='py-1.5 px-2'>{hrmpData.maxCapability}</span>
                  <span className='text-white py-1.5 px-1.5'>
                    {' '}
                    <span
                      aria-hidden
                      onClick={() => maxCapabilityHandler('increment')}
                    >
                      <img className='w-3 h-3 ' src={IconUparrow} alt='' />
                    </span>
                    <span>
                      <img
                        className='w-3 h-3 '
                        src={IconDownarrow}
                        alt=''
                        aria-hidden
                        onClick={() => maxCapabilityHandler('decrement')}
                      />
                    </span>
                  </span>
                </div>
              </div>
              <div className='flex gap-x-4'>
                <span>Max message size</span>
                <div className='bg-black border-border border-2 rounded text-white  flex flex-row gap-x-12'>
                  <span className='py-1.5 px-2'>{hrmpData.maxMsgSize}</span>
                  <span className='text-white py-1.5 px-1.5'>
                    {' '}
                    <img
                      className='w-3 h-3 '
                      src={IconUparrow}
                      alt=''
                      aria-hidden
                      onClick={() => maxMsgSizeHandler('increment')}
                    />
                    <img
                      className='w-3 h-3 '
                      src={IconDownarrow}
                      alt=''
                      aria-hidden
                      onClick={() => maxMsgSizeHandler('decrement')}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className='border-border border-2 rounded'>
              <div className='h-[50px] border-b-2 border-border'>
                <div className='flex flex-row gap-x-2 justify-end py-3 px-1.5 '>
                  <img className='w-6 h-6 ' src={IconSave} alt='' />
                  <img className='w-6 h-6 ' src={IconDlt} alt='' />
                </div>
              </div>

              <CodeMirror
                value="console.log('hello world!');"
                height='200px'
                theme={myTheme}
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}
              />
              <div className='h-[50px] border-t-2 border-border'>
                {' '}
                <div className='flex justify-end py-1.5 px-1.5 gap-x-3'>
                  <button className='text-white border-border border-2 rounded py-1 px-4 bg-gray hover:bg-grad'>
                    Cancel
                  </button>
                  <button className='text-white border-border border-2 rounded py-1 px-4 bg-gray'>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='h-18 gap-x-6 px-6  w-full border-b-2 flex flex-row border-border' />
      <div className='flex justify-end py-4 gap-x-4'>
        <Link to='/template/createNetwork/parachain'>
          <button className='text-white border-border border-2 rounded py-2 px-4 bg-gray'>
            Back
          </button>
        </Link>
        <button className='text-white border-border border-2 rounded py-2 px-4 bg-gray'>
          Save
        </button>
      </div>
    </div>
  );
}
export default CreateHrmp;
