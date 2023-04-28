import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderNavGroupProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const HeaderNavGroup = forwardRef<HTMLDivElement, HeaderNavGroupProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div
      className={twMerge('flex h-full items-center gap-x-2 px-2 md:gap-x-4 md:px-4 lg:px-8', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});

export { type HeaderNavGroupProps, HeaderNavGroup };
