import React, { forwardRef } from 'react';
import { IconXMark } from 'zeeve-icons/Essential/Linear';
import { IconButton, IconButtonProps } from '@/components/zeeve/Button';
import { RemoveProperties, RequiredProperties } from '@/core';

type CloseButtonProps = RequiredProperties<
RemoveProperties<IconButtonProps, 'icon' | 'size' | 'loading'>,
'onClick'
>;

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  (props, ref) => {
    const { onClick, ...rest } = props;

    return (
      <IconButton
        icon={<IconXMark />}
        size='content'
        variant='outline'
        colorScheme='dark'
        onClick={onClick}
        ref={ref}
        {...rest}
      />
    );
  },
);

export { type CloseButtonProps, CloseButton };
