import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface SidebarDividerProps
  extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHRElement>,
  HTMLHRElement
  > {}

const SidebarDivider = forwardRef<HTMLHRElement, SidebarDividerProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <hr
        className={twMerge('border-dark-700', className)}
        ref={ref}
        {...rest}
      />
    );
  },
);

export { type SidebarDividerProps, SidebarDivider };
