import { create } from "zustand";

export interface Settings {
    isBootNode: boolean;
    polkadotIntrospector: boolean;
    provider: string;
    networkName: string;
}

export interface RelayChain {
    default_image: string;
    chain: string;
    default_command: string;
    default_args: string[];
}

export interface NodeInfo {
    name: string;
    validator: boolean;
    image?: string;
    args?: string[];
}

export type Collator = {
    name: string;
    image: string;
    command: string;
    args: string[];
};

export type Parachain = {
    id: string;
    add_to_genesis: boolean;
    collator: Collator;
};

export interface HRMP {
    sender: string;
    recipient: string;
    max_capacity: number;
    max_message_size: number;
}

interface TestConfig {
    editorValue: string;
}

export interface CreateTemplate {
    templateId: string | null;
    settings: Settings;
    relayChain: RelayChain;
    nodeList: NodeInfo[];
    paraChainList: Parachain[];
    HRMPList: HRMP[];
    testConfig: TestConfig;
    setTemplateId: (templateId: string) => void;
    setSettings: (settings: Settings) => void;
    setRelayChain: (chain: RelayChain) => void;
    setNodeList: (list: NodeInfo[]) => void;
    setParaChainList: (list: Parachain[]) => void;
    setHRMPList: (hrmp: HRMP[]) => void;
    setTestConfig: (config: TestConfig) => void;
}

export const useCreateTemplate = create<CreateTemplate>((set) => ({
    templateId: null,
    settings: {
        isBootNode: false,
        polkadotIntrospector: false,
        provider: "",
        networkName: "",
    },
    relayChain: {
        default_image: "docker.io/parity/polkadot:latest",
        chain: "rococo-local",
        default_command: "polkadot",
        default_args: ["-lparachain=debug"],
    },
    nodeList: [
        {
            name: "",
            validator: false,
            image: "",
            args: [""],
        },
    ],
    paraChainList: [],
    HRMPList: [],
    testConfig: {
        editorValue: "",
    },
    setTemplateId: (templateId: string | null) => {
        set((state) => {
            return {
                ...state,
                templateId,
            };
        });
    },
    setSettings: (settings: Settings) => {
        set((state) => {
            return {
                ...state,
                settings,
            };
        });
    },
    setRelayChain: (relayChain: RelayChain) => {
        set((state) => {
            return {
                ...state,
                relayChain,
            };
        });
    },
    setNodeList: (nodeList: NodeInfo[]) => {
        set((state) => {
            return {
                ...state,
                nodeList,
            };
        });
    },
    setHRMPList: (HRMPList: HRMP[]) => {
        set((state) => {
            return {
                ...state,
                HRMPList,
            };
        });
    },
    setParaChainList: (paraChainList: Parachain[]) => {
        set((state) => {
            return {
                ...state,
                paraChainList,
            };
        });
    },
    setTestConfig: (testConfig: TestConfig) => {
        set((state) => {
            return {
                ...state,
                testConfig
            }
        })
    }
}));
