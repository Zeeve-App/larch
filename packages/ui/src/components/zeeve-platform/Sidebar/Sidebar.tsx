import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion, HTMLMotionProps } from 'framer-motion';

interface SidebarProps extends HTMLMotionProps<'aside'> {}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <motion.aside
      className={twMerge(
        'scrollbar-hide flex h-screen min-h-screen w-[80vw] flex-col overflow-y-auto text-white transition-all duration-300 md:w-72',
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </motion.aside>
  );
});

export { type SidebarProps, Sidebar };
