/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import create from 'zustand';

// Activity Filter Input Store Start
interface ActivityFilterInput {
  label: string;
  value: string | number;
  inputValue: string;
  isSearchOpen: boolean;
}

interface ActivityFilterInputStore {
  activityFilterData: ActivityFilterInput[];
  setActivityFilterData: (data: ActivityFilterInput[]) => void;
}

export const useActivityFilterStore = create<ActivityFilterInputStore>((set) => ({
  activityFilterData: [{
    label: '',
    value: '',
    inputValue: '',
    isSearchOpen: false,
  }],
  setActivityFilterData: (activityFilterData: ActivityFilterInput[]) => {
    set(() => ({ activityFilterData }));
  },
}));

// Activity Filter Input Store End
