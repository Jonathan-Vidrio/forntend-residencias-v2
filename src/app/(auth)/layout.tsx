import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SisGOSA - Sign In',
  description: 'Automotive Service Operations Management System - Diversity Global Inc.',
};

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-grow bg-gray-200 flex flex-col justify-center'>
        <section className='mx-[10%]'>{children}</section>
      </main>
    </div>
  );
}
