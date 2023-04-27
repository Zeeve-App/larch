import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { HTMLMotionProps, motion } from 'framer-motion';

interface SidebarSectionProps extends HTMLMotionProps<'div'> {}

const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <motion.div className={twMerge('py-6', className)} ref={ref} {...rest}>
      {children}
    </motion.div>
  );
});

export { type SidebarSectionProps, SidebarSection };
