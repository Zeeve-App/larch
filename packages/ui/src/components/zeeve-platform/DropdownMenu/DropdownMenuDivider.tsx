import React, { forwardRef } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface DropdownMenuDividerProps extends HTMLMotionProps<'hr'> {}

const DropdownMenuDivider = forwardRef<HTMLHRElement, DropdownMenuDividerProps>((props, ref) => {
  const { className, ...rest } = props;
  return <motion.hr className={twMerge('my-2 border-dark-50', className)} ref={ref} {...rest} />;
});

export { type DropdownMenuDividerProps, DropdownMenuDivider };
