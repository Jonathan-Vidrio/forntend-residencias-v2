'use client';

import { useUiStore } from '@/store';
import Link from 'next/link';

interface Props {
  title: string;
  value: string;
  href?: string;
  message?: string;
  canAccess?: boolean;
}

export const RowDetail = ({ title, value, href, message, canAccess }: Props) => {
  const { showLoading } = useUiStore(state => state);

  return (
    <div className='flex flex-col'>
      <>
        <strong>{title}</strong>

        {href && canAccess ? (
          <Link href={href} className={`w-auto hover:underline ${message ? 'text-red-500' : 'text-blue-500'}`} onClick={showLoading}>
            {value}
          </Link>
        ) : (
          <span>{value}</span>
        )}

        {message && <small className='text-red-500'>{message}</small>}
      </>
    </div>
  );
};
