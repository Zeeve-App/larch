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

import { createTemplateNetwork, getTemplateData, updateTemplateNetwork } from "src/utils/api";
import { decodeBase64, encodeBase64 } from "src/utils/encoding";
import { notify } from "src/utils/notifications";
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
  command: string;
  args?: string[];
  image?: string;
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

interface Template {
  templateId: string | null,
  settings: Settings,
  relayChain: RelayChain,
  nodeList: NodeInfo[],
  paraChainList: Parachain[],
  HRMPList: HRMP[],
  testConfig: TestConfig,
}

export const DEFAULT_IMAGES = [
  "docker.io/parity/polkadot:latest"
];

export const DEFAULT_PARACHAIN_IMAGES = [
  "docker.io/parity/polkadot-parachain:latest"
]

export const DEFAULT_ARGUMENTS = ["-lparachain=debug"];

export const DEFAULT: Template = {
  templateId: null,
  settings: {
    isBootNode: false,
    polkadotIntrospector: false,
    provider: "podman",
    networkName: "",
  },
  relayChain: {
    default_image: DEFAULT_IMAGES[0],
    chain: "rococo-local",
    default_command: "polkadot",
    default_args: [DEFAULT_ARGUMENTS[0]],
  },
  nodeList: [
    {
      name: "",
      validator: false,
      image: DEFAULT_IMAGES[0],
      args: [DEFAULT_ARGUMENTS[0]],
    },
  ],
  paraChainList: [],
  HRMPList: [],
  testConfig: {
    editorValue: "",
  },
};



export interface CreateTemplate extends Template {
  updateTemplateFromSource: (templateId: string) => Promise<void>;
  updateTemplateOnSource: () => Promise<void>;
  resetTemplate: () => void;
  setTemplateId: (templateId: string | null) => void;
  setSettings: (settings: Settings) => void;
  setRelayChain: (chain: RelayChain) => void;
  setNodeList: (list: NodeInfo[]) => void;
  setParaChainList: (list: Parachain[]) => void;
  setHRMPList: (hrmp: HRMP[]) => void;
  setTestConfig: (config: TestConfig) => void;
}

export const useCreateTemplate = create<CreateTemplate>((set, get) => ({
  templateId: DEFAULT.templateId,
  settings: DEFAULT.settings,
  relayChain: DEFAULT.relayChain,
  nodeList: DEFAULT.nodeList,
  paraChainList: DEFAULT.paraChainList,
  HRMPList: DEFAULT.HRMPList,
  testConfig: DEFAULT.testConfig,
  updateTemplateOnSource: async () => {
    const templateId = get().templateId;
    const payload = {
      name: get().settings.networkName,
      configFilename: `${get().settings.networkName}-config.json`,
      configContent: encodeBase64(JSON.stringify({
        settings: {
          polkadot_introspector: get().settings.polkadotIntrospector,
          bootnode: get().settings.isBootNode
        },
        relaychain: {
          default_image: get().relayChain.default_image,
          default_command: get().relayChain.default_command,
          default_args: get().relayChain.default_args,
          chain: get().relayChain.chain,
          nodes: get().nodeList,
        },
        parachains: get().paraChainList,
        hrmp_channels: get().HRMPList,
      })),
      networkProvider: get().settings.provider,
      testFilename: `${get().settings.networkName}-test-config.zndsl`,
      testContent: encodeBase64(get().testConfig.editorValue),
    };
    try {
      if (templateId) {
        await updateTemplateNetwork(templateId, payload)
        notify("success", "Template updated successfully");
        return;
      }
      await createTemplateNetwork(payload);
      notify("success", "Template created successfully");
    } catch (error) {
      notify("error", `Failed to ${templateId ? "update" : "create"} template`);
      throw error;
    }
  },
  updateTemplateFromSource: async (templateId: string) => {
    try {
      set(() => DEFAULT)
      const response = await getTemplateData(templateId);
      if (!response || !response.result) {
        throw new Error("Error while fetching template info");
      }
      const templateInfo = response.result;
      const configContent = decodeBase64(templateInfo.configContent);
      const testContent = decodeBase64(templateInfo.testContent);
      const { parachains, relaychain, hrmp_channels } =
        JSON.parse(configContent);
      set({
        templateId,
        settings: {
          isBootNode: false,
          polkadotIntrospector: false,
          provider: templateInfo.networkProvider,
          networkName: templateInfo.name,
        },
        relayChain: {
          default_image: relaychain.default_image,
          chain: relaychain.chain,
          default_command: relaychain.default_command,
          default_args: relaychain.default_args,
        },
        nodeList: relaychain.nodes,
        paraChainList: parachains,
        HRMPList: hrmp_channels,
        testConfig: {
          editorValue: testContent
        },
      });
    } catch (err) {
      console.log(err);
      notify("error", "Failed to get network data.");
    }
  },
  resetTemplate: () => { set(() => DEFAULT) },
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
        testConfig,
      };
    });
  },
}));
