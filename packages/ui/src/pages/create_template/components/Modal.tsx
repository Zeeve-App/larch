/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import { Dialog } from "@headlessui/react";
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
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center ">
        <Dialog.Panel className="w-full max-w-lg rounded-xl bg-create-button border-dark-700 border-4 p-4">
          <Dialog.Title className=" text-white font-rubik pb-4 text-center font-bold">
            Are you want to create template network?
          </Dialog.Title>
          <Dialog.Description />
          <div className="flex flex-col gap-y-4 mt-5">
            <div className="flex flex-row gap-x-2 justify-between">
              <Button
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
