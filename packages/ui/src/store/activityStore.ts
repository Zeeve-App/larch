import { create } from 'zustand';

// Activity Filter Input Store Start
export interface ActivityFilterInput {
  label: string;
  key: string | number;
  inputValue?: string;
  isSearchOpen: boolean;
}

interface ActivityFilterInputStore {
  activityFilterData: ActivityFilterInput[];
  setActivityFilterData: (data: ActivityFilterInput[]) => void;
}

export const useActivityFilterStore = create<ActivityFilterInputStore>((set) => ({
  activityFilterData: [
    {
      label: 'ID',
      key: 'id',
      isSearchOpen: false,
    },
    {
      label: 'Operation Details',
      key: 'operationDetail',
      isSearchOpen: false,
    },
    {
      label: 'Date',
      key: 'createdAt',
      isSearchOpen: false,
    },
    {
      label: 'Operation',
      key: 'operation',
      isSearchOpen: false,
    },
  ],
  setActivityFilterData: (activityFilterData: ActivityFilterInput[]) => {
    set(() => ({ activityFilterData }));
  },
}));

// Activity Filter Input Store End