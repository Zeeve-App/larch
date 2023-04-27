import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderProps
  extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
  > {}

const Header = forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <header
      className={twMerge(
        'flex h-20 w-full items-center justify-between bg-larch-dark',
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </header>
  );
});

export { type HeaderProps, Header };
