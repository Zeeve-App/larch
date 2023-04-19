import { create } from 'zustand';

// Filter Submission Start
export interface NetworkFilterSubmitStore {
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
