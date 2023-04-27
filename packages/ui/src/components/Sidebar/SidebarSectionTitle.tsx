import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion, HTMLMotionProps } from 'framer-motion';
import { RemoveProperties } from 'src/core';

interface SidebarSectionTitleProps
  extends RemoveProperties<HTMLMotionProps<'h5'>, 'title'> {
  title: string;
}

const SidebarSectionTitle = forwardRef<
HTMLHeadingElement,
SidebarSectionTitleProps
>((props, ref) => {
  const { title, className, ...rest } = props;

  return (
    <motion.h5
      className={twMerge(
        'mb-2 px-5 text-sm font-normal uppercase leading-5 tracking-wide text-gray-400',
        className,
      )}
      ref={ref}
      {...rest}
    >
      {title}
    </motion.h5>
  );
});

export { type SidebarSectionTitleProps, SidebarSectionTitle };
