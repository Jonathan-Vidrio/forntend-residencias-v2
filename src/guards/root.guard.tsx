'use client';

import { Spinner } from '@/core';
import { useAuthStore, useUiStore } from '@/store';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function RootGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore(state => state);
  const { isLoading } = useUiStore(state => state);

  return (
    <section className='h-full w-full relative'>
      {isLoading && (
        <>
          <div className='absolute inset-0 z-20 bg-gray-50'></div>
          <div className='absolute inset-0 z-20 flex justify-center items-center'>
            <Spinner />
          </div>
        </>
      )}

      <div className={`${isLoading ? 'pointer-events-none' : ''} h-full`}>{children}</div>
    </section>
  );
}
