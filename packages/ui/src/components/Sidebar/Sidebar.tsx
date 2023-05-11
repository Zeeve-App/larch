/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { useCompact } from "../../hooks";
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
  const {
    className,
    expanded = false,
    toggleExpanded,
    compact,
    children,
    ...rest
  } = props;

  const isCompact = useCompact(compact);

  // const localRef = useRef(null);
  // const sidebarRef = ref || localRef;
  // useOnClickOutside(sidebarRef as MutableRefObject<HTMLDivElement>, () => toggleExpanded(false));

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
          "scrollbar-hide flex relative h-screen min-h-screen w-4/5 flex-col overflow-y-auto bg-brand-dark text-white md:w-72",
          className
        )}
        variants={motionVariant}
        animate="animate"
        transition={{
          bounce: 0,
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
