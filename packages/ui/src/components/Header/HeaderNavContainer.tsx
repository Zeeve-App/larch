import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderNavContainerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const HeaderNavContainer = forwardRef<HTMLDivElement, HeaderNavContainerProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div className={twMerge('flex h-full flex-row items-center px-2 lg:px-8', className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});
export { type HeaderNavContainerProps, HeaderNavContainer };
