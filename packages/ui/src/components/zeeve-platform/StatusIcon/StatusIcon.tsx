import React, { forwardRef, SVGProps } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  IconCloseSquare,
  IconInfoSquare,
  IconTickSquare,
  IconWarningSquare,
} from 'zeeve-icons/Essential/Linear';
import { Status } from '../../../types';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

interface StatusIconProps extends SVGProps<SVGSVGElement>, SVGRProps {
  status: Status;
}

const StatusIcon = forwardRef<SVGSVGElement, StatusIconProps>(
  (props: StatusIconProps, ref) => {
    const { status, className, ...rest } = props;

    if (status === 'info') {
      return (
        <IconInfoSquare
          className={twMerge('shrink-0 text-4xl text-brand-cyan', className)}
          ref={ref}
          {...rest}
        />
      );
    }

    if (status === 'warning') {
      return (
        <IconWarningSquare
          className={twMerge('shrink-0 text-4xl text-brand-yellow', className)}
          ref={ref}
          {...rest}
        />
      );
    }

    if (status === 'success') {
      return (
        <IconTickSquare
          className={twMerge('shrink-0 text-4xl text-brand-green', className)}
          ref={ref}
          {...rest}
        />
      );
    }

    return (
      <IconCloseSquare
        className={twMerge('shrink-0 text-4xl text-brand-red', className)}
        ref={ref}
        {...rest}
      />
    );
  },
);

export { type StatusIconProps, StatusIcon };
