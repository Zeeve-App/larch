import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { HTMLMotionProps, motion } from 'framer-motion';

interface SidebarItemListProps extends HTMLMotionProps<'nav'> {}

const SidebarItemList = forwardRef<HTMLDivElement, SidebarItemListProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <motion.nav className={twMerge('flex flex-col', className)} ref={ref} {...rest}>
      {children}
    </motion.nav>
  );
});

export { type SidebarItemListProps, SidebarItemList };
