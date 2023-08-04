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

/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import { Dialog } from "@headlessui/react";
import { useRef } from "react";
import { Button } from "src/components/Button";

type PopUpBoxProps = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  onConfirm: () => void;
};

export default function PopUpBox({
  isOpen,
  setIsOpen,
  onConfirm,
}: PopUpBoxProps) {
  const completeButtonRef = useRef(null);
  return (
    <Dialog
      initialFocus={completeButtonRef}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center ">
        <Dialog.Panel className="w-full max-w-lg rounded-xl bg-create-button border-dark-700 border-4 p-4">
          <Dialog.Title className=" text-white font-rubik pb-4 text-center font-bold">
            Do you want to save the network template?
          </Dialog.Title>
          <Dialog.Description />
          <div className="flex flex-col gap-y-4 mt-5">
            <div className="flex flex-row gap-x-2 justify-between">
              <Button
                ref={completeButtonRef}
                className="bg-larch-dark_3 hover:bg-larch-pink"
                onClick={onConfirm}
              >
                Confirm
              </Button>
              <Button
                className="bg-larch-dark_3"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
