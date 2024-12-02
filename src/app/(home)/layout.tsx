import { RootGuard } from '@/guards/root.guard';
import { cookies } from 'next/headers';
import { decrypt } from '../lib/session/session';
import { User } from '@/interfaces';
import { VerticalNavbar } from '@/core';
import { Suspense } from 'react';

/**
 * Renders the Home Layout.
 *
 * This layout includes a vertical navigation bar and wraps child components in a scrollable content area.
 *
 * @async
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered inside the layout.
 * @returns {Promise<JSX.Element>} The home layout component.
 */
export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const session = (await cookies()).get('session')?.value as string;
  const payload = await decrypt(session);
  const { user, permissions } = payload as { user: User; permissions: string[] };

  return (
    <div className='flex flex-col min-h-screen'>
      <section className='flex flex-row flex-grow'>
        <Suspense fallback={null}>
          <VerticalNavbar userDetails={user} permissions={permissions} className='z-20 max-h-screen sticky top-0' />
        </Suspense>
        {/* Contenido con scroll */}
        <RootGuard>
          <div className='bg-gray-50 flex-grow min-h-screen overflow-y-auto p-10'>{children}</div>
        </RootGuard>
      </section>
    </div>
  );
}
