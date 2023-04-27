import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  AnimatePresence,
  motion,
  HTMLMotionProps,
  Variants,
} from 'framer-motion';
import { useToggle } from 'src/hooks';

const dropdownItemsMotionVarients: Variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

interface SidebarItemDropdownProps extends HTMLMotionProps<'button'> {
  title: string;
  children: React.ReactElement[];
  iconLeft?: React.ReactElement;
  badge?: React.ReactElement;
  iconDropdownOpened: React.ReactElement;
  iconDropdownClosed: React.ReactElement;
}

const SidebarItemDropdown = forwardRef<
HTMLButtonElement,
SidebarItemDropdownProps
>((props, ref) => {
  const {
    title,
    iconLeft,
    badge,
    iconDropdownOpened,
    iconDropdownClosed,
    children,
    className,
    ...rest
  } = props;

  const { isOpen, handleToggle } = useToggle();

  return (
    <>
      <motion.button
        className={twMerge(
          'flex max-h-14 cursor-pointer items-center justify-start gap-3 py-4 px-6 text-white transition-all duration-200 ease-in-out hover:bg-brand-gradient',
          isOpen && 'bg-brand-gradient',
          className,
        )}
        ref={ref}
        {...rest}
        onClick={handleToggle}
      >
        {iconLeft && iconLeft}
        <span className='flex flex-col gap-y-1 text-base font-normal leading-4'>
          {title}
          {badge && badge}
        </span>
        {isOpen ? (
          <motion.div className='ml-auto'>{iconDropdownOpened}</motion.div>
        ) : (
          <motion.div className='ml-auto'>{iconDropdownClosed}</motion.div>
        )}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='flex flex-col font-medium'
            variants={dropdownItemsMotionVarients}
            initial='hidden'
            animate='visible'
            exit='hidden'
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export { type SidebarItemDropdownProps, SidebarItemDropdown };
