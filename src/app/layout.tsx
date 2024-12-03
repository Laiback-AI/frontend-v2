'use client';

import '../styles/global.css';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect } from 'react';
import { initializeCsrf } from '../services/auth/cookiesService';
import Header from '../components/common/Header';
import { useAuthStore } from '../state/stores/authStore';
import { getCookie } from '../api/auth/cookies';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
    const setUserId = useAuthStore((state) => state.setUserId);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                // Initialize CSRF token
                await initializeCsrf();
                console.log('App initialized with CSRF token');

                // Retrieve userId from cookies or localStorage
                const userId = getCookie('userId') || localStorage.getItem('userId');
                if (userId) {
                    setUserId(userId);
                    setAuthenticated(true);
                    console.log('User authenticated:', { userId });
                } else {
                    console.log('No authenticated user found.');
                }
            } catch (error) {
                console.error('Failed to initialize app:', error);
            }
        };

        initializeApp();
    }, [setAuthenticated, setUserId]);

    return (
        <html lang="en">
            <body>
                <NextUIProvider>
                    <NextThemesProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <div className="min-h-screen flex flex-col">
                            <Header />
                            <main className="flex-grow">{children}</main>
                        </div>
                    </NextThemesProvider>
                </NextUIProvider>
            </body>
        </html>
    );
}
