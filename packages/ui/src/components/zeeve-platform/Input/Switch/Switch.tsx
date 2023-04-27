import React, { forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { HTMLMotionProps, motion, Variants } from 'framer-motion';
import { RemoveProperties } from '@/core';
import { SwitchContainer, SwitchContainerProps } from './SwitchContainer';

const style = cva(
  'rounded-full checked:bg-none text-white focus:border-none active:border-none border-none checked:border-0 focus:ring-0 focus:ring-offset-0 cursor-pointer',
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed opacity-70 hover:shadow-none focus:shadow-none',
      },
      checked: {
        true: 'shadow-2xl shadow-slate-500',
        false: '',
      },
      size: {
        small: 'w-3 h-3',
        medium: 'w-4 h-4',
        large: 'w-5 h-5',
      },
    },
  },
);

const variants: Variants = {
  checked: (checked: boolean) => {
    if (checked) {
      return {
        translateX: '100%',
      };
    }
    return {
      translateX: '-100%',
    };
  },
};

interface SwitchProps
  extends RemoveProperties<
  HTMLMotionProps<'input'>,
  'type' | 'disabled' | 'checked' | 'size'
  >,
  RemoveProperties<VariantProps<typeof style>, 'checked'> {
  checked: boolean;
  containerProps?: SwitchContainerProps;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const {
    className, size, checked, disabled, containerProps, id, ...rest
  } = props;

  return (
    <SwitchContainer
      checked={checked}
      disabled={disabled}
      size={size}
      htmlFor={id}
      {...containerProps}
    >
      <motion.input
        className={twMerge(style({
          className, disabled, checked, size,
        }))}
        variants={variants}
        animate='checked'
        custom={checked}
        id={id}
        checked={!!checked}
        disabled={!!disabled}
        type='checkbox'
        ref={ref}
        {...rest}
      />
    </SwitchContainer>
  );
});

Switch.defaultProps = {
  checked: false,
  size: 'small',
};

export { Switch, type SwitchProps };
