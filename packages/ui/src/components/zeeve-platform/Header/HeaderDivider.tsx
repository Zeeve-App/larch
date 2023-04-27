import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderDividerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const HeaderDivider = forwardRef<HTMLDivElement, HeaderDividerProps>((props, ref) => {
  const { className, ...rest } = props;
  return <div className={twMerge('h-10 border-l border-dark-50', className)} ref={ref} {...rest} />;
});

export { type HeaderDividerProps, HeaderDivider };
