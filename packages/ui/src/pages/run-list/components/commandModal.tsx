/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { getRunData } from '../../../utils/api';
import { notify } from '../../../utils/notifications';

type CommandModalProps = {
  isOpen: boolean,
  setIsOpen: (state: boolean) => void,
  runId: string,
};

export default function CommandModal({
  isOpen, setIsOpen, runId,
}: CommandModalProps) {
  const [command, setCommand] = useState('');
  const [networkName, setNetworkName] = useState('');
  const [operation, setOperation] = useState('');
  useEffect(() => {
    getRunData(runId)
      .then((response) => (response.result))
      .then((info) => {
        setCommand(info.command);
        setNetworkName(info.relatedId);
        setOperation(info.intention);
      })
      .catch(() => {
        notify('error', 'Failed to fetch run command');
        setIsOpen(false);
      });
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className='relative z-50'
    >
      <div className='fixed inset-0 bg-black/80' aria-hidden='true' />
      <div className='fixed inset-0 flex items-center justify-center '>
        <Dialog.Panel className='bg-black w-full max-w-3xl rounded bg-create-button border-brand-gray border-4 p-4'>
          <Dialog.Title className=' text-white font-rubik pb-4 text-center font-bold'>Run Command Info</Dialog.Title>
          <Dialog.Description />
          <div className='w-full flex justify-center'>
            <div className='h-0.5 w-10/12 bg-brand-gray mb-4 px-5' />
          </div>
          <div className='flex flex-col gap-y-4'>

            <div className='flex flex-row'>
              <div className='text-white font-rubik text-base w-2/12'>Run ID</div>
              <div className='text-white pr-2'>:</div>
              <div className='text-white font-rubik text-base flex-1'>{runId}</div>
            </div>
            <div className='flex flex-row'>
              <div className='text-white font-rubik text-base w-2/12'>Network Name</div>
              <div className='text-white pr-2'>:</div>
              <div className='text-white font-rubik text-base flex-1'>{networkName}</div>
            </div>
            <div className='flex flex-row'>
              <div className='text-white font-rubik text-base w-2/12'>Operation</div>
              <div className='text-white pr-2'>:</div>
              <div className='text-white font-rubik text-base flex-1'>{operation}</div>
            </div>
            <div className='flex flex-row'>
              <div className='text-white font-rubik text-base w-2/12'>Command</div>
              <div className='text-white pr-2'>:</div>
              <code className='text-white font-rubik bg-brand-gray flex-1 rounded-md p-1'>{command}</code>
            </div>
            <div className='flex flex-row gap-x-2 justify-end'>
              <button
                type='button'
                className='border-2 border-border rounded-lg py-1.5 px-2 bg-red-500 hover:bg-violet-700  text-white font-bold'
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
