"use client";

import '../styles/global.css';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { usePathname } from 'next/navigation';
import { NextUIProvider } from '@nextui-org/react';
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  import('../mocks/browser')
    .then(({ worker }) => {
      worker.start();
    })
    .catch((err) => console.error('Failed to start the worker:', err));
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <div className="layout">
            {pathname !== '/login' && <Header />}
            <main className="content">{children}</main>
            {pathname !== '/login' && <Footer />}
          </div>
        </NextUIProvider>
      </body>
    </html>
  );
}
