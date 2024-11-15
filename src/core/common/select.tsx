import React, { forwardRef } from 'react';

interface Props {
  label: string;
  value?: string;
  options: { key: string; value: string }[];
  color?: string;
  disabled?: boolean;
  className?: string;
  withSelectAnOption?: boolean;
  [key: string]: any;
}

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, value, options, color, disabled = false, withSelectAnOption = true, className, ...otherProps }, ref) => {
    return (
      <div className={`flex flex-col ${className}`}>
        <label className='mb-1 font-semibold text-sm'>{label}</label>
        <select
          ref={ref}
          disabled={disabled}
          value={value || ''}
          className={`h-[50px] border bg-white ${
            color ? `border-[${color}]` : 'border-gray-400'
          } focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md px-3`}
          {...otherProps}
        >
          {withSelectAnOption && (
            <option value='' disabled>
              Select an option
            </option>
          )}
          {options.map((option: { key: string; value: string }) => (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = 'Select';
