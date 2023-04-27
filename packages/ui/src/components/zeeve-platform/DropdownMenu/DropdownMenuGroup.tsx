import React, { forwardRef } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface DropdownMenuGroupProps extends HTMLMotionProps<'div'> {}

const DropdownMenuGroup = forwardRef<HTMLDivElement, DropdownMenuGroupProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <motion.div className={twMerge('flex flex-col', className)} ref={ref} {...rest}>
      {children}
    </motion.div>
  );
});

export { type DropdownMenuGroupProps, DropdownMenuGroup };
