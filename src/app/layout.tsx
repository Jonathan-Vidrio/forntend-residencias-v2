import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ModalTemplate } from '@/core';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SisGOSA',
  description: 'Sistema para la Gestión de Operaciones de Servicios Automotrices - Diversity Global Inc.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='es'>
      <body className={`${inter.className}`}>
        <ModalTemplate />
        {children}
      </body>
    </html>
  );
}
