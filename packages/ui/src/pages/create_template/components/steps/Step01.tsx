import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "src/components/Button";
import { useCreateTemplate } from "src/store/CreateTemplate";
import { notify } from "src/utils/notifications";
import { getTemplateData } from "src/utils/api";
import { decodeBase64 } from "src/utils/encoding";
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuList,
  DropdownMenuItem,
} from "src/components/DropdownMenu";
import { ReactComponent as IconArrowDown } from "src/assets/ArrowDown.svg";

export interface Step01Props {
  onNextStep: () => void;
  onPreviousStep: () => void;
}

const Step01: FC<Step01Props> = ({ onNextStep, onPreviousStep }) => {
  const { state } = useLocation();
  const {
    settings,
    setSettings,
    setRelayChain,
    setNodeList,
    setParaChainList,
    setHRMPList,
    setTestConfig,
    setTemplateId,
    templateId,
  } = useCreateTemplate();

  const [isProviderOpen, toggleProviderOpen] = useState<boolean>(false);

  const providers = [
    { label: "Podman", value: "podman" },
    { label: "Kubernetes", value: "kubernetes" },
    { label: "Native", value: "native" },
  ];

  const handler = (name: string, value: boolean) => {
    if (name === "bootNode") {
      setSettings({ ...settings, isBootNode: value });
    } else {
      setSettings({ ...settings, polkadotIntrospector: value });
    }
  };

  const updateStore = (comp: string, data: any, additionalInfo?: any) => {
    switch (comp) {
      case "settings": {
        const obj = {
          isBootNode: false,
          polkadotIntrospector: false,
          provider: data.networkProvider,
          networkName: data.name,
        };
        setSettings(obj);
        break;
      }
      case "relayChain": {
        const obj = {
          default_image: data.default_image,
          chain: data.chain,
          default_command: data.default_command,
          default_args: data.default_args,
        };
        setRelayChain(obj);
        setNodeList(data.nodes);
        break;
      }
      case "parachains": {
        setParaChainList(data);
        break;
      }
      case "hrmp": {
        setHRMPList(data);
        break;
      }
      case "testConfig": {
        const obj = {
          editorValue: data,
          networkName: additionalInfo,
        };
        setTestConfig(obj);
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (state && state.templateId) {
      setTemplateId(state.templateId);
      getTemplateData(state.templateId)
        .then((response) => {
          if (response && response.result) {
            const configContent = decodeBase64(response.result.configContent);
            const testContent = decodeBase64(response.result.testContent);
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { parachains, relaychain, hrmp_channels } =
              JSON.parse(configContent);
            updateStore("settings", response.result);
            updateStore("relayChain", relaychain);
            updateStore("parachains", parachains);
            if (hrmp_channels) updateStore("hrmp", hrmp_channels);
            updateStore("testConfig", testContent, response.result.name);
          }
        })
        .catch((err) => {
          console.log(err);
          notify("error", "Failed to get network data.");
        });
    } else if (templateId === null) {
      setTemplateId("");
      setSettings({
        isBootNode: false,
        polkadotIntrospector: false,
        provider: "podman",
        networkName: "",
      });
      setRelayChain({
        default_image: "",
        chain: "",
        default_command: "",
        default_args: [],
      });
      setNodeList([]);
      setParaChainList([
        {
          id: "",
          add_to_genesis: false,
          collator: {
            name: "",
            image: "",
            command: "",
            args: [],
          },
        },
      ]);
      setHRMPList([]);
      setTestConfig({
        editorValue: "",
      });
    }
  }, [state]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow px-5 overflow-auto">
        <div className="text-white p-4 flex items-center justify-between md:justify-start gap-x-6">
          <span className="pt-1 font-semibold">Template name:</span>
          <input
            className="flex-grow bg-larch-dark_2 focus:bg-larch-dark max-w-[300px] focus:ring-larch-dark border-dark-700 border-2 rounded-md"
            type="text"
            name="template_name"
            onChange={(e) =>
              setSettings({
                ...settings,
                networkName: e.target.value,
              })
            }
            value={settings.networkName}
          />
        </div>
        <div className="p-4 flex flex-col md:flex-row gap-x-12 gap-y-4">
          <div className="flex gap-x-6 items-center justify-between">
            <span className="text-white font-semibold">Add a boot node</span>
            <div className="border-dark-700 border-2 p-1 rounded-md gap-1 flex">
              <Button
                size={"medium"}
                className={`text-white focus:ring-0 py-2 px-3 leading-4 rounded-sm ${settings.isBootNode ? "bg-brand-gradient" : "bg-transparent"
                  }`}
                onClick={() => handler("bootNode", true)}
              >
                Yes
              </Button>
              <Button
                size={"medium"}
                className={`text-white focus:ring-0 py-2 px-3 leading-4 rounded-sm ${settings.isBootNode ? "bg-transparent" : "bg-larch-dark_3"
                  }`}
                onClick={() => handler("bootNode", false)}
              >
                No
              </Button>
            </div>
          </div>
          <div className="flex gap-x-6 items-center justify-between">
            <span className="text-white font-semibold">
              Polkadot Introspector
            </span>
            <div className="border-dark-700 border-2 p-1 rounded-md gap-1 flex">
              <Button
                size={"medium"}
                className={`text-white focus:ring-0 py-2 px-3 leading-4 rounded-sm ${settings.polkadotIntrospector
                  ? "bg-brand-gradient"
                  : "bg-transparent"
                  }`}
                onClick={() => handler("polkadotIntrospector", true)}
              >
                Yes
              </Button>
              <Button
                size={"medium"}
                className={`text-white focus:ring-0 py-2 px-3 leading-4 rounded-sm ${settings.polkadotIntrospector
                  ? "bg-transparent"
                  : "bg-larch-dark_3"
                  }`}
                onClick={() => handler("polkadotIntrospector", false)}
              >
                No
              </Button>
            </div>
          </div>
        </div>
        <div className="text-white p-4 flex items-center justify-between md:justify-start gap-x-6">
          <span className="font-semibold">Provider</span>
          <DropdownMenu className="relative text-white gap-3 ">
            <DropdownMenuButton
              as={Button}
              size={'medium'}
              className="bg-larch-dark_2 border-2 justify-between border-dark-700 min-w-[200px]"
              iconRight={<IconArrowDown className="w-7 h-7" />}
              onClick={() => toggleProviderOpen((prev) => !prev)}
            >
              {settings.provider}
            </DropdownMenuButton>
            <DropdownMenuList
              className="bg-larch-dark_2 text-white border-4 border-dark-700 z-dropdown min-w-[200px]"
              direction="left"
              isOpen={isProviderOpen}
            >
              {providers.map((provider, index) => {
                return (
                  <div
                    className={`${settings.provider === provider.value
                      ? "bg-larch-pink hover:bg-larch-pink"
                      : "hover:bg-larch-dark_2"
                      } text-white flex gap-3 py-2 px-4 cursor-pointer`}
                    key={index}
                    onClick={() => {
                      setSettings({
                        ...settings,
                        provider: provider.value,
                      });
                    }}
                  >
                    <div className="flex-grow text-start">{provider.label}</div>
                    <input
                      type="checkbox"
                      className={`${settings.provider === provider.value ? "" : "opacity-0"
                        } bg-larch-dark_2 border-dark-700 border-2 checked:border-larch-pink checked:bg-transparent focus:checked:bg-transparent hover:checked:bg-transparent rounded w-5 h-5`}
                      checked={settings.provider === provider.value}
                      onClick={() => {
                        setSettings({
                          ...settings,
                          provider: provider.value,
                        });
                      }}
                    />
                  </div>
                );
              })}
            </DropdownMenuList>
          </DropdownMenu>
        </div>
      </div>

      <div className="border-b-2 border-dark-700 mt-5" />
      <div className="flex justify-end p-5 gap-4">
        <Button
          className="bg-larch-dark_2 hover:bg-larch-dark_3"
          onClick={onPreviousStep}
        >
          Cancel
        </Button>
        <Button className="bg-larch-pink" onClick={onNextStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step01;
