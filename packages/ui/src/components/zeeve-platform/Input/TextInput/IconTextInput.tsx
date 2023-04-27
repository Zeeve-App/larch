import React, { forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const styles = cva(
  'rounded-lg transition ease-in-out duration-300 border hover:ring-transparent focus:ring-cyan-600 active:ring-cyan-600 hover:ring-4 font-medium tracking-wide',
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

interface IconTextInputProps
  extends Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'disabled' | 'size'
  >,
  VariantProps<typeof styles> {
  type: 'text' | 'password' | 'email' | 'number' | 'url';
  error?: string;
  success?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const IconTextInput = forwardRef<HTMLInputElement, IconTextInputProps>(
  ({
    type, className, disabled, error, success, size, iconLeft, iconRight, ...props
  }, ref) => (
    <div className='transparent relative flex flex-col'>
      <div className='flex flex-row items-center'>
        {iconLeft && <div className='absolute left-0 z-10'>{iconLeft}</div>}
        <input
          className={`w-full px-4  ${error && 'border-rose-500'} ${success && 'border-green-500'}
                        ${iconLeft && 'pl-8'}
                        ${iconRight && 'pr-8'}
                        ${styles({ className, disabled, size })}
                        `}
          type={type}
          {...props}
          ref={ref}
          disabled={disabled as boolean}
        />
        {iconRight && <div className='absolute right-0 z-10'>{iconRight}</div>}
      </div>

      {error && <span className='p-2 text-rose-500'>{error}</span>}
      {success && <span className='p-2 text-green-500'>{success}</span>}
    </div>
  ),
);

IconTextInput.displayName = 'IconTextInput';
export { type IconTextInputProps, IconTextInput };
