import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { HTMLMotionProps, motion } from 'framer-motion';
import { RemoveProperties } from '@/core';
import { RadioInputLabel, RadioInputLabelProps } from './RadioInputLabel';

const styles = cva('m-1 text-teal-600 cursor-pointer', {
  variants: {
    disabled: {
      true: 'cursor-not-allowed opacity-50 hover:shadow-none focus:shadow-none',
    },
  },
});

interface RadioInputProps
  extends RemoveProperties<HTMLMotionProps<'input'>, 'id'> {
  id: string;
  label?: string;
  labelHTMLProps?: RadioInputLabelProps;
}

const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  (props, ref) => {
    const {
      className,
      disabled = false,
      id,
      label,
      labelHTMLProps,
      ...rest
    } = props;

    return (
      <>
        <motion.input
          className={styles({ className, disabled })}
          type='radio'
          disabled={disabled as boolean}
          id={id}
          ref={ref}
          {...rest}
        />
        {label && (
          <RadioInputLabel
            {...labelHTMLProps}
            disabled={disabled}
            htmlFor={labelHTMLProps?.htmlFor || id}
          >
            {label}
          </RadioInputLabel>
        )}
      </>
    );
  },
);

export { type RadioInputProps, RadioInput };
