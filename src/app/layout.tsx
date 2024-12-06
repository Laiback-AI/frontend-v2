'use client';

import '../styles/global.css';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import Header from '../ui/common/Header';
import { ErrorModal } from '../features/shared/components/ErrorModal';
import { useErrorStore } from '../features/auth/api/authApi';
import useSessionStore from '../features/auth/stores/sessionStore';
import { getCookie } from '../features/auth/api/cookies';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isOpen, error, hideError } = useErrorStore();
    const [mounted, setMounted] = useState(false);
    const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
    const login = useSessionStore((state) => state.login);

    // Handle initial authentication check only once
    useEffect(() => {
        const checkAuth = async () => {
            // Only check if not already authenticated
            if (!isAuthenticated) {
                const sessionToken = getCookie('sessionToken');
                const userId = getCookie('userId');

                if (sessionToken && userId) {
                    login(sessionToken, {
                        id: parseInt(userId, 10),
                        email: getCookie('userEmail') || '',
                        name: getCookie('userName') || '',
                        surname: getCookie('userSurname') || '',
                        account_name: getCookie('userAccountName') || ''
                    });
                }
            }
        };

        checkAuth();
    }, [isAuthenticated, login]); // Only depend on these values

    // Handle mounting state
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <html lang="en" suppressHydrationWarning>
                <body suppressHydrationWarning>
                    <div className="min-h-screen bg-background" />
                </body>
            </html>
        );
    }

    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <NextUIProvider>
                    <NextThemesProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        storageKey="theme-mode"
                    >
                        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
                            <Header />
                            <main className="flex-grow">
                                {children}
                            </main>
                            <ErrorModal
                                isOpen={isOpen}
                                onClose={hideError}
                                error={error}
                            />
                        </div>
                    </NextThemesProvider>
                </NextUIProvider>
            </body>
        </html>
    );
}