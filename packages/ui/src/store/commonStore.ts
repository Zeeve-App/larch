/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
import { create } from 'zustand';

// Filter Submission Start
interface NetworkFilterSubmitStore {
  isFilterSubmit: boolean;
  setIsFilterSubmit: (value: boolean) => void;
}

export const useFilterSubmit = create<NetworkFilterSubmitStore>((set) => ({
  isFilterSubmit: false,
  setIsFilterSubmit: (value: boolean) => {
    set(() => ({ isFilterSubmit: value }));
  },
}));
// Filter Submission End
