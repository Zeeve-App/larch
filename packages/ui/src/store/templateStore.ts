/* eslint-disable linebreak-style */
import { create } from 'zustand';

// Template List Filter Input Store Start
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
      key: 'templateName',
      isSearchOpen: false,
    },
    {
      label: 'Provider',
      key: 'provider',
      isSearchOpen: false,
    },
    {
      label: 'Networok Directory',
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

// Template List Filter Input Store End
