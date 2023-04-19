import { create } from 'zustand';

export interface ActivityFilterInput {
  label: string;
  key: string | number;
  inputValue?: string;
  isSearchOpen: boolean;
}

interface ActivityFilterInputStore {
  runFilterData: ActivityFilterInput[];
  setRunFilterData: (data: ActivityFilterInput[]) => void;
}

export const useRunFilterStore = create<ActivityFilterInputStore>((set) => ({
  runFilterData: [
    {
      label: 'ID',
      key: 'id',
      isSearchOpen: false,
    },
    {
      label: 'Operation',
      key: 'intention',
      isSearchOpen: false,
    },
    {
      label: 'Network Name',
      key: 'relatedId',
      isSearchOpen: false,
    },
    {
      label: 'Status Code',
      key: 'statusCode',
      isSearchOpen: false,
    },
    {
      label: 'Date',
      key: 'createdAt',
      isSearchOpen: false,
    },
  ],
  setRunFilterData: (runFilterData: ActivityFilterInput[]) => {
    set(() => ({ runFilterData }));
  },
}));
