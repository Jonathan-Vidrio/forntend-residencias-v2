'use client';

import { on } from 'events';

interface Props {
  className?: string;
  children?: string | React.ReactNode;
  color?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export const CustomButton = ({ className, children, color, disabled: disable, type, onClick }: Props): JSX.Element => {
  return (
    <button
      className={`w-full h-[50px] ${color ? `bg-${color}-500` : 'bg-blue-500'} hover:bg-gray-400 rounded-md px-3 text-white font-semibold flex justify-center items-center ${className}`}
      type={type || 'button'}
      disabled={!!disable}
      onClick={disable && onClick ? undefined : onClick}
    >
      {children}
    </button>
  );
};
