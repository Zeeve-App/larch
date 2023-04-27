import React, { forwardRef } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { RemoveProperties } from '@/core';

const styles = cva(
  'flex w-max items-center justify-center rounded py-0 px-2.5 text-[10px] font-medium leading-4 border border-transparent',
  {
    variants: {
      colorScheme: {
        blue: 'bg-brand-blue text-white',
        green: 'bg-brand-green text-white',
        red: 'bg-brand-red text-white',
        gray: 'bg-brand-gray text-white',
        dark: 'bg-brand-dark text-white',
        light: 'bg-brand-light text-brand-dark',
        gradient:
          'bg-gradient-to-r from-brand-teal to-brand-cyan text-white border-none',
      },
      variant: {
        outline: 'border-current bg-transparent',
      },
    },
    compoundVariants: [
      {
        colorScheme: 'blue',
        variant: 'outline',
        className: 'text-brand-blue',
      },
      {
        colorScheme: 'green',
        variant: 'outline',
        className: 'text-brand-green',
      },
      {
        colorScheme: 'red',
        variant: 'outline',
        className: 'text-brand-red',
      },
      {
        colorScheme: 'gray',
        variant: 'outline',
        className: 'text-brand-gray',
      },
      {
        colorScheme: 'dark',
        variant: 'outline',
        className: 'text-brand-dark',
      },
      {
        colorScheme: 'light',
        variant: 'outline',
        className: 'border-brand-outline',
      },
    ],
    defaultVariants: {
      colorScheme: 'blue',
    },
  },
);

type BadgeVariantProps = VariantProps<typeof styles>;

interface BadgeProps
  extends RemoveProperties<HTMLMotionProps<'div'>, 'children'>,
  BadgeVariantProps {
  title: string;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  const {
    title, colorScheme, variant, className, ...rest
  } = props;

  return (
    <motion.div
      className={twMerge(styles({ colorScheme, variant, className }))}
      ref={ref}
      {...rest}
    >
      {title}
    </motion.div>
  );
});

export { type BadgeProps, Badge };
