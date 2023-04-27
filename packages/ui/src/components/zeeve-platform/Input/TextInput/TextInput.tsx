import React, { forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const styles = cva(
  'rounded-lg transition ease-in-out duration-300 border hover:ring-transparent focus:ring-cyan-600 active:ring-cyan-600 hover:ring-4 font-medium tracking-wide px-3 py-2',
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed opacity-50 hover:shadow-none focus:shadow-none',
      },
      size: {
        small: 'h-8 text-sm',
        medium: 'h-10 text-base',
        large: 'h-14 text-xl',
      },
    },
  },
);

interface TextInputProps
  extends Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'disabled' | 'size'
  >,
  VariantProps<typeof styles> {
  type: 'text' | 'password' | 'email' | 'number' | 'url';
  error?: string;
  success?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({
    type, className, disabled, error, success, size, ...props
  }, ref) => (
    <div className='transparent flex flex-col'>
      <input
        className={` ${error && 'border-rose-500'} ${success && 'border-green-500'} ${styles({
          className,
          disabled,
          size,
        })}`}
        type={type}
        {...props}
        ref={ref}
        disabled={disabled as boolean}
      />

      {error && <span className='p-2 text-rose-500'>{error}</span>}
      {success && <span className='p-2 text-green-500'>{success}</span>}
    </div>
  ),
);

TextInput.displayName = 'TextInput';
export { type TextInputProps, TextInput };
