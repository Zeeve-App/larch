/* eslint-disable linebreak-style */
import { create } from 'zustand';

// Network List Filter Input Store Start
export interface NetworkFilterInput {
  label: string;
  key: string | number;
  inputValue?: string;
  isSearchOpen: boolean;
}

interface NetworkFilterInputStore {
  networkFilterData: NetworkFilterInput[];
  setNetworkFilterData: (data: NetworkFilterInput[]) => void;
}

export const useNetworkFilterStore = create<NetworkFilterInputStore>((set) => ({
  networkFilterData: [
    {
      label: 'Network Name',
      key: 'networkName',
      isSearchOpen: false,
    },
    {
      label: 'Provider',
      key: 'provider',
      isSearchOpen: false,
    },
    {
      label: 'Network Directory',
      key: 'networkDirectory',
      isSearchOpen: false,
    },
    {
      label: 'Created On',
      key: 'createdAt',
      isSearchOpen: false,
    },
    {
      label: 'Status',
      key: 'status',
      isSearchOpen: false,
    },
  ],
  setNetworkFilterData: (networkFilterData: NetworkFilterInput[]) => {
    set(() => ({ networkFilterData }));
  },
}));

// Network List Filter Input Store End