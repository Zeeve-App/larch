import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "src/components/Button";
import { useCreateTemplate } from "src/store/CreateTemplate";
import { notify } from "src/utils/notifications";
import { getTemplateData } from "src/utils/api";
import { decodeBase64 } from "src/utils/encoding";

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
                        console.log(configContent);
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
                provider: "",
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
        <div>
            <div className="px-5 md:w-1/2">
                <div className="p-4 flex flex-col md:flex-row gap-x-12 gap-y-4">
                    <div className="flex gap-x-8 items-center justify-between">
                        <span className="text-white font-semibold">Add a boot node</span>
                        <div className="border-dark-700 border-2 rounded-xl p-1 flex">
                            <Button
                                className={`text-white focus:ring-0 rounded-md ${settings.isBootNode ? "bg-grad" : "bg-transparent"
                                    }`}
                                onClick={() => handler("bootNode", true)}
                            >
                                Yes
                            </Button>
                            <Button
                                className={`text-white focus:ring-0 rounded-md ${settings.isBootNode ? "bg-transparent" : "bg-grad"
                                    }`}
                                onClick={() => handler("bootNode", false)}
                            >
                                No
                            </Button>
                        </div>
                    </div>
                    <div className="flex gap-x-8 items-center justify-between">
                        <span className="text-white font-semibold">
                            Polkadot Introspector
                        </span>
                        <div className="border-dark-700 border-2 rounded-xl p-1 flex">
                            <Button
                                className={`text-white focus:ring-0 rounded-md ${settings.polkadotIntrospector ? "bg-grad" : "bg-transparent"
                                    }`}
                                onClick={() => handler("polkadotIntrospector", true)}
                            >
                                Yes
                            </Button>
                            <Button
                                className={`text-white focus:ring-0 rounded-md ${settings.polkadotIntrospector ? "bg-transparent" : "bg-grad"
                                    }`}
                                onClick={() => handler("polkadotIntrospector", false)}
                            >
                                No
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="text-white p-4 flex items-center justify-between md:justify-start gap-x-12">
                    <span className="font-semibold">Provider</span>
                    <select
                        className="bg-larch-dark_2 text-white border-2 rounded-md border-dark-700"
                        onChange={(e) =>
                            setSettings({ ...settings, provider: e.target.value })
                        }
                        value={settings.provider}
                    >
                        <option disabled value="">
                            Select
                        </option>
                        {providers.map((item, index) => (
                            <option key={`provider-${index.toString()}`} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="text-white p-4 flex items-center justify-between md:justify-start gap-x-12">
                    <span className="pt-1 font-semibold min-w-[10rem]">Template name:</span>
                    <input
                        className="flex-grow bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
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
