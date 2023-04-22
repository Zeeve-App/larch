import React, { useState } from "react";
import { Link } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import NavBar from "./navbar";
import myTheme from "./theme";
import {
  useTestConfigStore,
  useSettingsStore,
  useRelayChainStore,
  useNodeListStore,
  useParaChainListStore,
  useHRMPStore,
} from "../../../store/createNetworkStore";
import PopUpBox from "./modal";
import { notify } from "../../../utils/notifications";
import { createTemplateNetwork } from "../../../utils/api";

export function TestConfig() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const testConfigData = useTestConfigStore((state) => state.testConfigData);
  const setTestConfigData = useTestConfigStore(
    (state) => state.setTestConfigData
  );
  const settingsData = useSettingsStore((state) => state.settingsData);
  const relayChainData = useRelayChainStore((state) => state.relayChainData);
  const nodesList = useNodeListStore((state) => state.nodesList);
  const paraChainList = useParaChainListStore((state) => state.paraChainList);
  const hrmpData = useHRMPStore((state) => state.hrmpData);

  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    setTestConfigData({ ...testConfigData, editorValue: value });
  }, []);

  const configContentPrepare = (): string => {
    const data = {
      relaychain: {
        default_image: relayChainData.default_image,
        default_command: relayChainData.default_command,
        default_args: relayChainData.default_args,
        chain: relayChainData.chain,
        nodes: nodesList,
      },
      parachain: paraChainList,
      hrmp_channels: {
        sender: hrmpData.sender,
        recipient: hrmpData.recipient,
        max_capacity: hrmpData.maxCapability,
        max_message_size: hrmpData.maxMsgSize,
      },
    };
    return btoa(JSON.stringify(data));
  };

  const testContentPrepare = (): string =>
    btoa(JSON.stringify(testConfigData.editorValue));

  const onNetworkCreate = (value: string) => {
    setTestConfigData({ ...testConfigData, networkName: value });
    setIsOpen(false);
    const payload = {
      name: value,
      configFilename: `${value}-config.json`,
      configContent: configContentPrepare(),
      networkDirectory: settingsData.networkDirectory,
      networkProvider: settingsData.provider,
      testFilename: `${value}-test-config.zndsl`,
      testContent: testContentPrepare(),
    };
    createTemplateNetwork(payload)
      .then((response) => {
        console.log("response", response);
      })
      .then(() => {
        setIsOpen(false);
        notify("success", "Network created successfully");
      })
      .catch(() => {
        notify("error", "Failed to create network");
      });
  };

  return (
    <div className=" flex-col flex">
      <NavBar pageSlug="hrmp" />
      <div className="w-[750px]">
        <div className="text-white pl-4 py-4 font-rubik flex flex-col gap-y-3">
          <div className="text-white  py-4 font-rubik flex flex-col gap-y-4">
            <div className="border-border border-2 rounded">
              <CodeMirror
                value=""
                height="200px"
                theme={myTheme}
                placeholder="Enter here you text..."
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}
              />
              <div className="h-[50px] border-t-2 border-border">
                {" "}
                <div className="flex justify-end py-1.5 px-1.5 gap-x-3">
                  <button
                    type="button"
                    className="text-white border-border border-2 rounded py-1 px-4 bg-gray hover:bg-grad"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-18 gap-x-6 px-6  w-full border-b-2 flex flex-row border-border" />
      <div className="flex justify-end py-4 gap-x-4">
        <Link to="/template/createNetwork/parachain">
          <button
            type="button"
            className="text-white border-border border-2 rounded py-2 px-4 bg-gray"
          >
            Back
          </button>
        </Link>
        <button
          type="button"
          className="text-white border-border border-2 rounded py-2 px-4 bg-gray"
          onClick={() => setIsOpen(true)}
        >
          Save
        </button>
      </div>
      <PopUpBox
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={onNetworkCreate}
      />
    </div>
  );
}
export default TestConfig;
