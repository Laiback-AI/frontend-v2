"use client";

import '../styles/global.css';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { usePathname } from 'next/navigation';
import { NextUIProvider } from '@nextui-org/react';
import { Textarea } from '@nextui-org/react';

// Mock API calls in development mode
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  import('../mocks/browser')
    .then(({ worker }) => {
      worker.start();
    })
    .catch((err) => console.error('Failed to start the worker:', err));
}

// Main layout component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en" className="light">
      <body>
        <NextUIProvider>
          <main className="text-foreground bg-background">
            {children}
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}
