import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderLogoContainerProps
  extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
  > {}

const HeaderLogoContainer = forwardRef<
HTMLDivElement,
HeaderLogoContainerProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div
      className={twMerge(
        'flex md:hidden h-full items-center justify-start gap-x-2 px-2 md:w-72 lg:gap-x-4 lg:px-8',
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});

export { type HeaderLogoContainerProps, HeaderLogoContainer };
