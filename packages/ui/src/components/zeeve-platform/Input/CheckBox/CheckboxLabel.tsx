import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { motion, HTMLMotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const style = cva('select-none cursor-pointer', {
  variants: {
    disabled: {
      true: 'cursor-not-allowed opacity-50 hover:shadow-none focus:shadow-none',
    },
  },
});

interface CheckboxLabelProps extends HTMLMotionProps<'label'> {
  disabled?: boolean;
}

const CheckboxLabel = forwardRef<HTMLLabelElement, CheckboxLabelProps>((props, ref) => {
  const {
    className, disabled, children, ...rest
  } = props;

  return (
    <motion.label
      className={twMerge(
        style({
          className,
          disabled,
        }),
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </motion.label>
  );
});

export { CheckboxLabel, type CheckboxLabelProps };
