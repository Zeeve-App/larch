/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import Ansi from '@cocalc/ansi-to-react';
import { Dialog } from '@headlessui/react';
import { decodeBase64 } from '../../../utils/encoding';
import { getRunData } from '../../../utils/api';
import { notify } from '../../../utils/notifications';

type StandardOutputModalProps = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  runId: string;
};

export default function standardOutputModal({
  isOpen,
  setIsOpen,
  runId,
}: StandardOutputModalProps) {
  const [standardOutput, setStandardOutput] = useState<string>('');
  const [standardError, setStandardError] = useState<string>('');
  const [networkName, setNetworkName] = useState<string>('');
  const [operation, setOperation] = useState<string>('');

  const callApi = () => {
    getRunData(runId)
      .then((response) => response.result)
      .then((info) => {
        setStandardOutput(info.stdOutput ? decodeBase64(info.stdOutput) : '');
        setStandardError(info.stdError ? decodeBase64(info.stdError) : '');
        setNetworkName(info.relatedId);
        setOperation(info.intention);
      })
      .catch(() => {
        notify('error', 'Failed to fetch run standard output');
        setIsOpen(false);
      });
  };

  useEffect(() => {
    callApi();
    const interval = setInterval(callApi, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className='relative z-50'
    >
      <div className='fixed inset-0 bg-black/80' aria-hidden='true' />
      <div className='fixed inset-0 flex items-center justify-center'>
        <Dialog.Panel className='w-full w-min-1/2 max-w-fit rounded bg-create-button border-border border-4 p-4'>
          <Dialog.Title className='text-white font-rubik pb-4 text-center font-bold'>
            Output
          </Dialog.Title>
          <Dialog.Description />
          <div className='w-full flex justify-center'>
            <div className='h-0.5 w-10/12 bg-grey mb-4 px-5' />
          </div>
          <div className='flex flex-col gap-y-4'>
            <div className='flex flex-row'>
              <div className='text-white font-rubik text-base w-2/12'>
                Run ID
              </div>
              <div className='text-white pr-2'>:</div>
              <div className='text-white font-rubik text-base flex-1'>
                {runId}
              </div>
            </div>
            <div className='flex flex-row'>
              <div className="text-white font-rubik text-base w-2/12">
                Network Name
              </div>
              <div className='text-white pr-2'>:</div>
              <div className='text-white font-rubik text-base flex-1'>
                {networkName}
              </div>
            </div>
            <div className='flex flex-row'>
              <div className='text-white font-rubik text-base w-2/12'>
                Operation
              </div>
              <div className='text-white pr-2'>:</div>
              <div className='text-white font-rubik text-base flex-1'>
                {operation}
              </div>
            </div>
            <div className='text-white font-rubik text-center font-semibold'>
              Standard Output
            </div>
            <div className='flex flex-row'>
              <pre className='text-white font-rubik flex-1 bg-grey rounded-md p-1 overflow-y-auto min-h-min max-h-96 px-2'>
                <Ansi className=''>{standardOutput}</Ansi>
              </pre>
            </div>
            <div className='text-white font-rubik text-center font-semibold'>
              Standard Error
            </div>
            <div className='flex flex-row'>
              <pre className='text-white font-rubik flex-1 bg-grey rounded-md p-1 overflow-y-auto min-h-min max-h-96 px-2'>
                <Ansi className=''>{standardError}</Ansi>
              </pre>
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
