import { AddButton } from '@/core';

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {children}

      <AddButton className='fixed bottom-10 right-10' />
    </section>
  );
}
