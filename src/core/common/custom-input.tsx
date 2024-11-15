import React, { forwardRef } from 'react';

interface Props {
  label: string;
  placeholder?: string;
  color?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  [key: string]: any;
}

export const CustomInput = forwardRef<HTMLInputElement, Props>(
  ({ className, label, placeholder, color, type, disabled = false, ...otherProps }, ref): JSX.Element => {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && <label className='mb-1 font-semibold text-sm'>{label}</label>}

        <input
          ref={ref}
          className={`h-[50px] border ${color ? `border-[${color}]` : 'border-gray-400'} focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md px-3`}
          placeholder={placeholder}
          type={type || 'text'}
          disabled={disabled}
          {...otherProps}
        />
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';
