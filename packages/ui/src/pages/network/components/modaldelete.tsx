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
import { ReactComponent as IconCross } from "src/assets/Cross.svg";
import { Button, IconButton } from 'src/components/Button';

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
        <Dialog.Panel className='w-full max-w-3xl rounded-xl bg-larch-dark_2 border-dark-700 border-4 p-6'>
          <Dialog.Title className="text-white font-rubik pb-4 flex justify-between text-2xl p-6 font-bold">
            <h1> Do you want to delete the network: <br/> '{name}'</h1>
            <IconButton
              className="bg-larch-dark_3 rounded-xl"
              onClick={() => setIsOpen(false)}
              icon={<IconCross className="w-10 h-10" />}
            />
          </Dialog.Title>
          <Dialog.Description />
          <div className="w-full flex justify-center">
            <div className="h-1 w-full bg-brand-gray" />
          </div>
          <div className="flex flex-col gap-6 p-6">
            <div className="grid gap-6">
              <Button
                ref={completeButtonRef}
                onClick={() => onConfirm(name)}
                className="bg-larch-pink p-3"
              >
                Confirm
              </Button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
