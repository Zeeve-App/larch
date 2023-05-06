/* eslint-disable max-len */
import { useEffect, useRef, useState } from "react";
import Ansi from "@cocalc/ansi-to-react";
import { Dialog } from "@headlessui/react";
import { decodeBase64 } from "../../../utils/encoding";
import { getRunData } from "../../../utils/api";
import { notify } from "../../../utils/notifications";
import { IconButton } from "src/components/Button";
import { useCompact } from "src/hooks";
import { ReactComponent as IconCross } from "src/assets/Cross.svg";
import { Switch } from "src/components/Switch";

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
  const [standardOutput, setStandardOutput] = useState<string>("");
  const [standardError, setStandardError] = useState<string>("");
  const [networkName, setNetworkName] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [shouldScrollToBottom, setScrollToBottom] = useState<{
    output: boolean;
    error: boolean;
  }>({
    output: true,
    error: true,
  });

  const outputRef = useRef<HTMLDivElement | null>(null);
  const errorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldScrollToBottom.output)
      outputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
  }, [standardOutput, shouldScrollToBottom.output]);

  useEffect(() => {
    if (shouldScrollToBottom.error)
      errorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
  }, [standardError, shouldScrollToBottom.error]);

  const compact = useCompact();

  const callApi = () => {
    getRunData(runId)
      .then((response) => response.result)
      .then((info) => {
        setStandardOutput(info.stdOutput ? decodeBase64(info.stdOutput) : "");
        setStandardError(info.stdError ? decodeBase64(info.stdError) : "");
        setNetworkName(info.relatedId);
        setOperation(info.intention);
      })
      .catch(() => {
        notify("error", "Failed to fetch run standard output");
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
          className=" w-full w-min-1/2 max-w-fit rounded-xl bg-larch-dark_2 border-dark-700 border-4"
        >
          <Dialog.Title className="text-white font-rubik pb-4 flex justify-between text-3xl p-6 font-bold">
            <h1>Output</h1>
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
              <div className="flex flex-row text-xl">
                <div className="text-white font-rubik  font-bold w-2/12">
                  Execution ID
                </div>
                <div className="text-white pr-2">:</div>
                <div className="text-white font-rubik  flex-1">{runId}</div>
              </div>
              <div className="flex flex-row text-xl">
                <div className="text-white font-rubik font-bold w-2/12">
                  Network Name
                </div>
                <div className="text-white pr-2">:</div>
                <div className="text-white font-rubik  flex-1">
                  {networkName}
                </div>
              </div>
              <div className="flex flex-row text-xl">
                <div className="text-white font-rubik font-bold w-2/12">
                  Operation
                </div>
                <div className="text-white pr-2">:</div>
                <div className="text-white font-rubik  flex-1">{operation}</div>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-white">
                  <div className=" font-rubik text-start text-xl font-semibold">
                    Standard Output
                  </div>
                  <div className="flex gap-3 text-lg items-center">
                    Auto scroll
                    <Switch
                      checked={shouldScrollToBottom.output}
                      onChange={() =>
                        setScrollToBottom((prev) => ({
                          ...prev,
                          output: !prev.output,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-row">
                  <pre className="text-white flex-1 bg-brand-gray rounded-md p-6 overflow-y-auto min-h-[100px] max-h-96">
                    <div ref={outputRef}>
                      <Ansi>{standardOutput}</Ansi>
                    </div>
                  </pre>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-white">
                  <div className=" font-rubik text-start text-xl font-semibold">
                    Standard Error
                  </div>
                  <div className="flex gap-3 text-lg items-center">
                    Auto scroll
                    <Switch
                      checked={shouldScrollToBottom.error}
                      onChange={() =>
                        setScrollToBottom((prev) => ({
                          ...prev,
                          error: !prev.error,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-row">
                  <pre className="text-white font-rubik flex-1 bg-brand-gray rounded-md p-6 overflow-y-auto min-h-[100px] max-h-96">
                    <div ref={errorRef}>
                      <Ansi>{standardError}</Ansi>
                    </div>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
