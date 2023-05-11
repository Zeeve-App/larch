/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

import { cva, VariantProps } from 'class-variance-authority';
import { HTMLMotionProps, motion, MotionProps } from 'framer-motion';
import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const styles = cva(
  'rounded-lg flex justify-center items-center shadow-none outline-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-1 transition ease-in-out duration-300 border border-transparent hover:bg-opacity-90 focus:bg-opacity-90 font-medium shrink-0',
  {
    variants: {
      colorScheme: {
        blue: 'bg-brand-blue text-white',
        dark: 'bg-brand-dark text-white',
      },
      variant: {
        ghost: 'bg-white hover:bg-white focus:bg-white border-brand-outline',
        outline: 'border-current bg-transparent focus:bg-transparent',
      },
      size: {
        small: 'text-sm w-9 h-9',
        medium: 'text-base w-10 h-10',
        large: 'text-lg w-12 h-12',
        content: 'text-sm h-max w-max p-0.5',
      },
      rounded: {
        true: 'rounded-full',
      },
      disabled: {
        true: 'cursor-not-allowed bg-opacity-50 hover:bg-opacity-50 focus:bg-opacity-50 hover:shadow-none focus:shadow-none text-opacity-50',
      },
    },
    compoundVariants: [
      {
        colorScheme: 'dark',
        variant: ['outline', 'ghost'],
        size: ['small', 'medium', 'large', 'content'],
        className: 'text-brand-dark',
      },
      {
        colorScheme: 'blue',
        variant: ['outline', 'ghost'],
        size: ['small', 'medium', 'large', 'content'],
        className: 'text-brand-blue',
      },
    ],
    defaultVariants: {
      colorScheme: 'blue',
      size: 'medium',
    },
  },
);

const iconButtonMotionProps: MotionProps = {
  whileTap: {
    scale: 0.9,
  },
  whileHover: {
    scale: 1.05,
  },
};

interface IconButtonProps extends Omit<HTMLMotionProps<'button'>, 'disabled'>, VariantProps<typeof styles> {
  loading?: boolean;
  icon: React.ReactElement;
  applyDefaultAnimation?: boolean;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const {
    colorScheme,
    variant,
    size,
    rounded,
    disabled,
    loading = false,
    icon,
    className,
    applyDefaultAnimation = false,
    ...rest
  } = props;

  return (
    <motion.button
      className={twMerge(styles({
        colorScheme, variant, size, rounded, disabled, className,
      }))}
      ref={ref}
      {...(applyDefaultAnimation ? iconButtonMotionProps : {})}
      {...rest}
    >
      {loading ? <>...</> : <>{icon}</>}
    </motion.button>
  );
});

export { type IconButtonProps, IconButton };
