import React, { forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { HTMLMotionProps, motion, MotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const styles = cva(
  'rounded-lg flex justify-center items-center shadow-none outline-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-1 transition ease-in-out duration-300 border border-transparent font-medium tracking-wide hover:bg-opacity-90 focus:bg-opacity-90 gap-1',
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
        small: 'text-sm h-9',
        medium: 'text-base h-10',
        large: 'text-lg h-12',
      },
      fullWidth: {
        true: 'w-full',
      },
      disabled: {
        true: 'cursor-not-allowed bg-opacity-50 hover:bg-opacity-50 focus:bg-opacity-50 hover:shadow-none focus:shadow-none text-opacity-50',
      },
    },
    compoundVariants: [
      {
        colorScheme: ['blue', 'dark'],
        size: ['small', 'medium'],
        className: 'px-4 py-2',
      },
      {
        colorScheme: ['blue', 'dark'],
        size: 'large',
        className: 'px-6 py-4',
      },
      {
        colorScheme: 'blue',
        variant: ['outline', 'ghost'],
        size: ['small', 'medium', 'large'],
        className: 'text-brand-blue',
      },
      {
        colorScheme: 'dark',
        variant: ['outline', 'ghost'],
        size: ['small', 'medium', 'large'],
        className: 'text-brand-dark',
      },
    ],
    defaultVariants: {
      colorScheme: 'blue',
      size: 'medium',
    },
  },
);

const buttonMotionProps: MotionProps = {
  whileTap: {
    scale: 0.9,
  },
  whileHover: {
    scale: 1.05,
  },
};

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'disabled'>, VariantProps<typeof styles> {
  loading?: boolean;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  applyDefaultAnimation?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    colorScheme,
    variant,
    size,
    fullWidth,
    disabled,
    loading = false,
    children,
    className,
    iconLeft,
    iconRight,
    applyDefaultAnimation = false,
    ...rest
  } = props;

  return (
    <motion.button
      className={twMerge(styles({
        colorScheme, variant, size, fullWidth, disabled, className,
      }))}
      ref={ref}
      {...(applyDefaultAnimation ? buttonMotionProps : {})}
      {...rest}
    >
      {loading ? (
        <>...</>
      ) : (
        <>
          {iconLeft && iconLeft}
          {children}
          {iconRight && iconRight}
        </>
      )}
    </motion.button>
  );
});

export { type ButtonProps, Button };
