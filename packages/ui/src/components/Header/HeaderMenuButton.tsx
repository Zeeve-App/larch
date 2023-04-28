import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  IconButton,
  IconButtonProps,
} from 'src/components/Button';

interface HeaderMenuButtonProps extends IconButtonProps {}

const HeaderMenuButton = forwardRef<HTMLButtonElement, HeaderMenuButtonProps>(
  (props, ref) => {
    const { icon, className, ...rest } = props;

    return (
      <IconButton
        colorScheme='dark'
        variant='ghost'
        className={twMerge('', className)}
        icon={icon}
        ref={ref}
        {...rest}
      />
    );
  },
);

export { HeaderMenuButton, type HeaderMenuButtonProps };
