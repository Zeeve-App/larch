import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { HTMLMotionProps, motion } from 'framer-motion';
import { RemoveProperties } from 'src/core';

interface SidebarLogoProps
  extends RemoveProperties<HTMLMotionProps<'img'>, 'src'> {
  src: string;
  href: string;
  anchorHTMLProps?: RemoveProperties<HTMLMotionProps<'a'>, 'href'>;
}

const SidebarLogo = forwardRef<HTMLImageElement, SidebarLogoProps>(
  (props, ref) => {
    const {
      className, src, href, anchorHTMLProps, ...rest
    } = props;

    return (
      <motion.a
        {...anchorHTMLProps}
        className={twMerge(
          'sticky top-0 z-[2] flex h-20 flex-col w-full items-center justify-center border-b border-dark-700 bg-larch-dark md:w-72',
          anchorHTMLProps?.className,
        )}
        href={href}
      >
        <motion.img
          src={src}
          alt='Zeeve Logo'
          className={twMerge('', className)}
          ref={ref}
          {...rest}
        />
      </motion.a>
    );
  },
);

export { type SidebarLogoProps, SidebarLogo };
