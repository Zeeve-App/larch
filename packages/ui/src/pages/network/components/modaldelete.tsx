/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import { Dialog } from '@headlessui/react';
import { useRef } from 'react';

type DeletePopUpBoxProps = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  onConfirm: (name: string) => void;
  name: string;
};

export default function DeletePopUpBox({
  isOpen,
  setIsOpen,
  onConfirm,
  name,
}: DeletePopUpBoxProps) {
  const completeButtonRef = useRef(null);
  return (
    <Dialog
      initialFocus={completeButtonRef}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className='relative z-50'
    >
      <div className='fixed inset-0 bg-black/80' aria-hidden='true' />
      <div className='fixed inset-0 flex items-center justify-center '>
        <Dialog.Panel className='w-full max-w-lg rounded bg-create-button border-border border-4 p-6'>
          <Dialog.Description />
          <div className='flex flex-col gap-y-6'>
            <div className='flex flex-row'>
              <div className='text-white font-rubik text-base flex-1 text-center'>
                Do you want to delete '
                {name}
                '
              </div>
            </div>
            <div className='flex flex-row justify-between'>
              <button
                ref={completeButtonRef}
                className='border-2 border-border rounded-lg py-1.5 px-2 bg-green hover:bg-dark-green text-white font-bold'
                onClick={() => onConfirm(name)}
              >
                Confirm
              </button>
              <button
                className='border-2 border-border rounded-lg py-1.5 px-2 bg-red-500 hover:bg-violet-700  text-white font-bold '
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
