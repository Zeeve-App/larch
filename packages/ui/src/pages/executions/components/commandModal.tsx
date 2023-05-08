/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { getRunData } from "../../../utils/api";
import { notify } from "../../../utils/notifications";
import { IconButton } from "src/components/Button";
import { ReactComponent as IconCross } from "src/assets/Cross.svg";
import { useCompact } from "src/hooks";

type CommandModalProps = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  runId: string;
};

export default function CommandModal({
  isOpen,
  setIsOpen,
  runId,
}: CommandModalProps) {
  const [command, setCommand] = useState("");
  const [networkName, setNetworkName] = useState("");
  const [operation, setOperation] = useState("");
  useEffect(() => {
    getRunData(runId)
      .then((response) => response.result)
      .then((info) => {
        setCommand(info.command);
        setNetworkName(info.relatedId);
        setOperation(info.intention);
      })
      .catch(() => {
        notify("error", "Failed to fetch run command");
        setIsOpen(false);
      });
  }, []);

  const compact = useCompact();

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 bg-larch-dark bg-opacity-80"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel
          style={{
            marginLeft: compact ? "" : "286px",
          }}
          className="w-[70%] h-[80%] 2xl:h-auto 2xl:w-1/2 rounded-xl bg-larch-dark_2 border-dark-700 border-4"
        >
          <Dialog.Title className="text-white font-rubik pb-4 flex justify-between text-3xl p-6 font-bold">
            <h1>Execution Command Info</h1>
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
            <div className="grid gap-2">
              <div className="flex flex-row text-xl gap-6">
                <div className="text-white font-rubik min-w-[175px] font-bold">
                  Execution ID
                </div>
                <div className="text-white font-rubik  flex-1">: {runId}</div>
              </div>
              <div className="flex flex-row text-xl  gap-6">
                <div className="text-white font-rubik min-w-[175px] font-bold">
                  Network Name
                </div>
                <div className="text-white font-rubik  flex-1">
                  : {networkName}
                </div>
              </div>
              <div className="flex flex-row text-xl gap-6">
                <div className="text-white font-rubik min-w-[175px] font-bold">
                  Operation
                </div>
                <div className="text-white font-rubik  flex-1">
                  : {operation}
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="flex flex-col gap-3">
                <div className="text-white font-rubik text-start text-xl font-semibold">
                  Command :
                </div>
                <div className="flex flex-row">
                  <code className="text-white font-rubik bg-brand-gray flex-1 rounded-md p-6">
                    {command}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
