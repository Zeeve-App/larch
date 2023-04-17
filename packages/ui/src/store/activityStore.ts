/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import create from 'zustand';

// Activity Filter Input Store Start
interface ActivityFilterInput {
  label: string;
  key: string | number;
  inputValue: string;
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
      inputValue: '',
      isSearchOpen: false,
    },
    {
      label: 'Operation Details',
      key: 'operationDetail',
      inputValue: '',
      isSearchOpen: false,
    },
    {
      label: 'Date',
      key: 'date',
      inputValue: '',
      isSearchOpen: false,
    },
    {
      label: 'Opeartion',
      key: 'opeartion',
      inputValue: '',
      isSearchOpen: false,
    },
  ],
  setActivityFilterData: (activityFilterData: ActivityFilterInput[]) => {
    set(() => ({ activityFilterData }));
  },
}));

// Activity Filter Input Store End

// Activity Filter Submission Start
interface ActivityFilterSubmitStore {
  isFilterSubmit: boolean;
  setIsFilterSubmit: (value: boolean) => void;
}

export const useFilterSubmit = create<ActivityFilterSubmitStore>((set) => ({
  isFilterSubmit: false,
  setIsFilterSubmit: (value: boolean) => {
    set(() => ({ isFilterSubmit: value }));
  },
}));
// Activity Filter Submission End
