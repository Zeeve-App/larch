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
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import { Dialog } from "@headlessui/react";
import { TemplateDelete } from "../types";
import { useCompact } from "src/hooks";
import { ReactComponent as IconCross } from "src/assets/Cross.svg";
import { Button, IconButton } from "src/components/Button";

type PopUpBoxProps = {
  duplicateTemplateObj: TemplateDelete;
  setDuplicateTemplateObj: (state: TemplateDelete) => void;
  onConfirm: () => void;
};

export default function DuplicateTempPopUpBox({
  duplicateTemplateObj,
  setDuplicateTemplateObj,
  onConfirm,
}: PopUpBoxProps) {
  const compact = useCompact();

  return (
    <Dialog
      open={duplicateTemplateObj.isOpen}
      onClose={() =>
        setDuplicateTemplateObj({ ...duplicateTemplateObj, isOpen: false })
      }
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
            <h1>Duplicate Template</h1>
            <IconButton
              className="bg-larch-dark_3 rounded-xl"
              onClick={() =>
                setDuplicateTemplateObj({
                  ...duplicateTemplateObj,
                  isOpen: false,
                })
              }
              icon={<IconCross className="w-10 h-10" />}
            />
          </Dialog.Title>
          <Dialog.Description />
          <div className="w-full flex justify-center">
            <div className="h-1 w-full bg-brand-gray" />
          </div>
          <div className="flex flex-col gap-6 p-6">
            <div className="grid gap-3">
              <div className="flex flex-row text-xl gap-6">
                <div className="text-white font-rubik min-w-[175px] font-bold">
                  Template name
                </div>
                <div className="text-white font-rubik flex gap-3 flex-1">
                  :
                  <input
                    className="flex-grow bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md px-2"
                    onChange={(e) =>
                      setDuplicateTemplateObj({
                        ...duplicateTemplateObj,
                        templateName: e.target.value,
                      })
                    }
                    value={duplicateTemplateObj.templateName}
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <Button onClick={onConfirm} className="bg-larch-pink p-3">
                Confirm
              </Button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
