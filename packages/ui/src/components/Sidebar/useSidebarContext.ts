import { createContext, useContext } from "react";

export interface SidebarContextProps {
    compact: boolean;
    expanded: boolean;
    toggleExpanded: (value: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextProps | null>(null);

const useSidebar = () => {
    const context = useContext(SidebarContext);

    if (context === null) {
        throw new Error("useSidebar can only be used within the Sidebar component!");
    }
    return context;
};

export { useSidebar };
