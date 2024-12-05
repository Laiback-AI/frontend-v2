'use client'; // Enable client-side features

// Import styles and UI providers
import '../styles/global.css';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect } from 'react';

// Import authentication and UI components
import { initializeCsrf } from '../features/auth/services/cookiesService';
import Header from '../ui/common/Header';
import useSessionStore from '../features/auth/stores/sessionStore';
import { getCookie } from '../features/auth/api/cookies';

// Root layout component that wraps the entire application
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Get session management functions from Zustand store
    const login = useSessionStore((state) => state.login);

    // Initialize app and check authentication status on mount
    useEffect(() => {
        const initializeApp = async () => {
            try {
                // Set up CSRF protection
                console.log('Initializing CSRF protection before call');
                await initializeCsrf();
                console.log('App initialized with CSRF token');

                // Check for existing user session in cookies or localStorage
                const userId = getCookie('userId') || localStorage.getItem('userId');
                if (userId) {
                    login('sessionToken', { // Replace 'sessionToken' with actual token if available
                        id: parseInt(userId, 10),
                        email: '',           // Add placeholder values or
                        name: '',           // fetch these from storage/API
                        surname: '',        // if available
                        account_name: ''
                    });
                    console.log('User authenticated:', { userId });
                } else {
                    console.log('No authenticated user found.');
                }
            } catch (error) {
                console.error('Failed to initialize app:', error);
            }
        };

        initializeApp();
    }, [login]); // Re-run if session management functions change

    // Render app with necessary providers and layout structure
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