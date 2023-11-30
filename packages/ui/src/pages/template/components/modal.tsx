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
import { ChangeEvent, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import { NetworkType } from "../types";
import { useCompact } from "src/hooks";
import { ReactComponent as IconCross } from "src/assets/Cross.svg";
import { Button, IconButton } from "src/components/Button";

type PopUpBoxProps = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  onConfirm: (name: string, type: NetworkType) => void;
  templateId: string;
  type: NetworkType;
};

export default function PopUpBox({
  isOpen,
  setIsOpen,
  onConfirm,
  templateId,
  type,
}: PopUpBoxProps) {
  const [inputText, setInputText] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const compact = useCompact();
  const initialFocusRef = useRef(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog
      initialFocus={initialFocusRef}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center ">
        <Dialog.Panel
          style={{
            marginLeft: compact ? "" : "286px",
          }}
          className="w-full max-w-3xl rounded-xl bg-larch-dark_2 border-dark-700 border-4"
        >
          <Dialog.Title className="text-white font-rubik pb-4 flex justify-between text-3xl p-6 font-bold">
            Create Network
            <IconButton
              className="bg-larch-dark_3 rounded-xl"
              onClick={() => setIsOpen(false)}
              icon={<IconCross className="w-10 h-10" />}
            />
          </Dialog.Title>
          <div className="w-full flex justify-center">
            <div className="h-1 w-full bg-brand-gray" />
          </div>
          <div className="flex flex-col gap-6 p-6">
            <div className="grid gap-3">
              <div className="flex flex-row text-xl gap-6">
                <div className="text-white font-rubik min-w-[175px] font-bold">
                  Network name
                </div>
                <div className="text-white font-rubik flex gap-3 flex-1">
                  :
                  <input
                    ref={initialFocusRef}
                    autoFocus
                    className="flex-grow bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md px-2"
                    onChange={handleChange}
                    value={inputText}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault();
                        onConfirm(inputText, type)
                      }
                    }}
                    onBlur={() => submitButtonRef.current && submitButtonRef.current.focus()}
                  />
                </div>
              </div>
              <div className="flex flex-row text-xl  gap-6">
                <div className="text-white font-rubik min-w-[175px] font-bold">
                  Template ID
                </div>
                <div className="text-white font-rubik flex gap-3 flex-1">
                  : <p>{templateId}</p>
                </div>
              </div>
              <div className="flex flex-row text-xl gap-6">
                <div className="text-white font-rubik min-w-[175px] font-bold">
                  Network Creation type
                </div>
                <div className="text-white font-rubik  flex-1">: {type}</div>
              </div>
            </div>
            <div className="grid gap-6">
              <Button
                onClick={() => onConfirm(inputText, type)}
                ref={submitButtonRef}
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
