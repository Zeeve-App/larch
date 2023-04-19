import { create } from 'zustand';

export interface TemplateFilterInput {
  label: string;
  key: string | number;
  inputValue?: string;
  isSearchOpen: boolean;
}

interface TemplateFilterInputStore {
  templateFilterData: TemplateFilterInput[];
  setTemplateFilterData: (data: TemplateFilterInput[]) => void;
}

export const useTemplateFilterStore = create<TemplateFilterInputStore>((set) => ({
  templateFilterData: [
    {
      label: 'ID',
      key: 'id',
      isSearchOpen: false,
    },
    {
      label: 'Template Name',
      key: 'name',
      isSearchOpen: false,
    },
    {
      label: 'Provider',
      key: 'provider',
      isSearchOpen: false,
    },
    {
      label: 'Network Directory',
      key: 'status',
      isSearchOpen: false,
    },
    {
      label: 'Created On',
      key: 'createdAt',
      isSearchOpen: false,
    },
  ],
  setTemplateFilterData: (templateFilterData: TemplateFilterInput[]) => {
    set(() => ({ templateFilterData }));
  },
}));
