/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import { ChangeEvent, useState } from 'react';
import { Dialog } from '@headlessui/react';

type PopUpBoxProps = {
  visible: boolean,
  onConfirm: (name: string) => void,

};

export default function PopUpBox({ visible, onConfirm }: PopUpBoxProps) {
  if (!visible) return null;

  const [isOpen, setIsOpen] = useState(visible);
  const [inputText, setInputText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(visible)}
      className='relative z-50'
    >
      <div className='fixed inset-0 bg-black/80' aria-hidden='true' />
      <div className='fixed inset-0 flex items-center justify-center '>
        <Dialog.Panel className='w-full max-w-sm rounded bg-create-button border-border border-4 p-8'>
          <Dialog.Title className=' text-white font-rubik pb-4 text-center'>Create Network</Dialog.Title>
          <Dialog.Description />
          <div className='flex flex-col gap-y-4'>
            <div className='flex flex-row gap-x-2'>
              <span className='text-white font-rubik text-base'>Network Name</span>
              <input className=' border-border border-2 rounded bg-create-button text-white font-rubik' onChange={handleChange} value={inputText} />
            </div>
            <div className='flex flex-row gap-x-2 justify-between'>
              <button className='border-2 border-border rounded py-1.5 px-2 bg-red hover:md-blue-200 text-white font-bold' onClick={() => onConfirm(inputText)}>Confirm</button>
              <button className='border-2 border-border rounded py-1.5 px-2 bg-green hover:bg-dark-green  text-white font-bold ' onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
