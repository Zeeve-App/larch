/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
import { create } from 'zustand';

// Setting data store start
export interface Settings {
  isBootNode: boolean;
  polkadotIntrospector: boolean;
  provider: string;
  networkDirectory: string;
}
interface SettingsStore {
  settingsData: Settings;
  setSettings: (data: Settings) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settingsData: {
    isBootNode: false,
    polkadotIntrospector: false,
    provider: '',
    networkDirectory: '',
  },
  setSettings: (value: Settings) => {
    set(() => ({ settingsData: value }));
  },
}));
// Setting data store end

// Relaychain data store Start
interface RelayChain {
  default_image: string;
  chain: string;
  default_command: string;
  default_args: string[];
}
interface RelayChainStore {
  relayChainData: RelayChain;
  setRelayChainData: (data: RelayChain) => void;
}

export const useRelayChainStore = create<RelayChainStore>((set) => ({
  relayChainData: {
    default_image: 'docker.io/parity/polkadot:latest',
    chain: 'rococo-local',
    default_command: 'polkadot',
    default_args: ['-lparachain=debug'],
  },
  setRelayChainData: (data: RelayChain) => {
    set(() => ({ relayChainData: data }));
  },
}));
// Relaychain data store end

// Node list store Start
export interface NodeInfo {
  name: string;
  validator: boolean;
  image?: string;
  args?: string[];
}
interface NodeListStore {
  nodesList: NodeInfo[];
  setNodesList: (data: NodeInfo[]) => void;
}

export const useNodeListStore = create<NodeListStore>((set) => ({
  nodesList: [
    {
      name: '',
      validator: false,
      image: '',
      args: [''],
    },
  ],
  setNodesList: (data: NodeInfo[]) => {
    set(() => ({ nodesList: data }));
  },
}));
// Node list store Start

// Parachain list store Start
export type Collator = {
  name: string;
  image: string;
  command: string;
  args: string[];
};

export type Parachain = {
  id: string;
  addToGenesis: boolean;
  collator: Collator;
};

interface ParaChainListStore {
  paraChainList: Parachain[];
  setParaChainList: (data: Parachain[]) => void;
}

export const useParaChainListStore = create<ParaChainListStore>((set) => ({
  paraChainList: [],
  setParaChainList: (data: Parachain[]) => {
    console.log("data", data);
    set(() => ({ paraChainList: data }));
  },
}));
// Parachain list store Start

// HRMP data store start
export interface HRMP {
  sender: string;
  recipient: string;
  maxCapability: number;
  maxMsgSize: number;
  isShowFilds: boolean;
}
interface HRMPStore {
  hrmpData: HRMP;
  setHrmpData: (data: HRMP) => void;
}

export const useHRMPStore = create<HRMPStore>((set) => ({
  hrmpData: {
    sender: '',
    recipient: '',
    maxCapability: 0,
    maxMsgSize: 0,
    isShowFilds: false,
  },
  setHrmpData: (value: HRMP) => {
    set(() => ({ hrmpData: value }));
  },
}));
// HRMP data store end

// Test config data store start
interface TestConfig {
  editorValue: string;
  networkName: string;
}
interface TestConfigStore {
  testConfigData: TestConfig;
  setTestConfigData: (data: TestConfig) => void;
}

export const useTestConfigStore = create<TestConfigStore>((set) => ({
  testConfigData: {
    editorValue: '',
    networkName: '',
  },
  setTestConfigData: (value: TestConfig) => {
    set(() => ({ testConfigData: value }));
  },
}));
// Test config data store end

interface TemplateIdStore {
  templateId: string;
  setTemplateId: (data: string) => void;
}

export const useTemplateIdStore = create<TemplateIdStore>((set) => ({
  templateId: '',
  setTemplateId: (value: string) => {
    set(() => ({ templateId: value }));
  },
}));
