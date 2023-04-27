import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { HTMLMotionProps, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { RemoveProperties } from '@/core';
import { CheckboxLabel, CheckboxLabelProps } from './CheckboxLabel';

const style = cva('m-1 rounded text-cyan-500 cursor-pointer', {
  variants: {
    disabled: {
      true: 'cursor-not-allowed opacity-50 hover:shadow-none focus:shadow-none',
    },
  },
});

interface CheckBoxProps
  extends RemoveProperties<HTMLMotionProps<'input'>, 'id'> {
  id: string;
  label?: string;
  labelHTMLProps?: CheckboxLabelProps;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>((props, ref) => {
  const {
    className, disabled, label, labelHTMLProps, id, ...rest
  } = props;

  return (
    <>
      <motion.input
        className={twMerge(style({ className, disabled }))}
        type='checkbox'
        id={id}
        disabled={disabled}
        ref={ref}
        {...rest}
      />
      {label && (
        <CheckboxLabel
          {...labelHTMLProps}
          disabled={disabled}
          htmlFor={labelHTMLProps?.htmlFor || id}
        >
          {label}
        </CheckboxLabel>
      )}
    </>
  );
});

export { type CheckBoxProps, CheckBox };
