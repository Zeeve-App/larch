import React, { MutableRefObject, forwardRef, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { useOnClickOutside, useCompact } from "../../hooks";
import { SidebarContext } from "./useSidebarContext";

const motionVariant: Variants = {
  animate: (expanded: boolean) => {
    if (expanded) {
      return {
        x: 0,
      };
    } else
      return {
        x: "-100%",
      };
  },
};

interface SidebarProps extends HTMLMotionProps<"aside"> {
  expanded: boolean;
  toggleExpanded: (value: boolean) => void;
  compact?: boolean;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>((props, ref) => {
  const { className, expanded = false, toggleExpanded, compact, children, ...rest } = props;

  const isCompact = useCompact(compact);

  const localRef = useRef(null);
  const SidebarRef = ref || localRef;
  useOnClickOutside(SidebarRef as MutableRefObject<HTMLDivElement>, () => toggleExpanded(false));

  const isSidebarExpanded = () => {
    if (isCompact) return expanded;
    else return true;
  };

  return (
    <SidebarContext.Provider
      value={{
        compact: isCompact,
        expanded: isSidebarExpanded(),
        toggleExpanded,
      }}
    >
      <motion.aside
        className={twMerge(
          'scrollbar-hide flex relative h-screen min-h-screen w-4/5 flex-col overflow-y-auto bg-brand-dark text-white md:w-72',
          className,
        )}
        variants={motionVariant}
        animate="animate"
        transition={{
          bounce: 0
        }}
        custom={isSidebarExpanded()}
        ref={ref}
        {...rest}
      >
        {children}
      </motion.aside>
    </SidebarContext.Provider>
  );
});

export { type SidebarProps, Sidebar };
