import React, { forwardRef, MutableRefObject, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion, HTMLMotionProps } from 'framer-motion';
import useOnClickOutside from '@/hooks/useOnClickOutside';

interface DropdownMenuProps extends HTMLMotionProps<'div'> {
  onClose: () => void;
}

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (props, ref) => {
    const {
      children, className, onClose, ...rest
    } = props;

    const localRef = useRef(null);
    const dropdownMenuRef = ref || localRef;
    useOnClickOutside(
      dropdownMenuRef as MutableRefObject<HTMLDivElement>,
      onClose,
    );

    return (
      <motion.div
        className={twMerge('relative', className)}
        ref={dropdownMenuRef}
        {...rest}
      >
        {children}
      </motion.div>
    );
  },
);

export { type DropdownMenuProps, DropdownMenu };
