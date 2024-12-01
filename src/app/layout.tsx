"use client";

import '../styles/global.css';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from '../components/common/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
            </div>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
