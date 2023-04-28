import { create } from 'zustand';


interface SidebarStore {
    isOpen: boolean;
    setSidebar: (value: boolean) => void;
    toggleSidebar: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    isOpen: false,
    setSidebar: (value: boolean) => {
        set({
            isOpen: value
        })
    },
    toggleSidebar: () => {
        set((state) => {
            return {
                ...state,
                isOpen: !state.isOpen
            }
        })
    }
}));
