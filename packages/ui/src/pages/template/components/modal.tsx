/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import { ChangeEvent, useState } from 'react';
import { Dialog } from '@headlessui/react';

type PopUpBoxProps = {
  isOpen: boolean,
  setIsOpen: (state: boolean) => void,
  onConfirm: (name: string) => void,
  templateId: string,
};

export default function PopUpBox({
  isOpen, setIsOpen, onConfirm, templateId,
}: PopUpBoxProps) {
  const [inputText, setInputText] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className='relative z-50'
    >
      <div className='fixed inset-0 bg-black/80' aria-hidden='true' />
      <div className='fixed inset-0 flex items-center justify-center '>
        <Dialog.Panel className='w-full max-w-lg rounded bg-create-button border-border border-4 p-4'>
          <Dialog.Title className=' text-white font-rubik pb-4 text-center font-bold'>Create Network</Dialog.Title>
          <Dialog.Description />
          <div className='w-full flex justify-center'>
            <div className='h-0.5 w-10/12 bg-grey mb-4 px-5' />
          </div>
          <div className='flex flex-col gap-y-4'>
            <div className='flex flex-row'>
              <div className='text-white font-rubik text-base w-3/12'>Network name</div>
              <div className='text-white pr-2'>:</div>
              <input className=' border-border border-2 rounded bg-create-button text-white font-rubik flex-1' onChange={handleChange} value={inputText} />
            </div>
            <div className='flex flex-row'>
              <div className='text-white font-rubik text-base w-3/12'>Template ID</div>
              <div className='text-white pr-2'>:</div>
              <div className='text-white font-rubik text-base flex-1'>{templateId}</div>
            </div>
            <div className='flex flex-row gap-x-2 justify-between'>
              <button className='border-2 border-border rounded-lg py-1.5 px-2 bg-green hover:bg-dark-green text-white font-bold' onClick={() => onConfirm(inputText)}>Confirm</button>
              <button className='border-2 border-border rounded-lg py-1.5 px-2 bg-red-500 hover:bg-violet-700  text-white font-bold ' onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
