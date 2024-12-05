'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../features/auth/components/AuthForm';
import { authService } from '../../features/auth/services/authService';
import useSessionStore from '../../features/auth/stores/sessionStore';

export default function LoginPage() {
    const router = useRouter();
    const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Handle login submission
    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            await authService.login({ email, password });
            console.log('Login successful, redirecting...');
            router.replace('/projects');
        } catch (err: any) {
            console.error('Login failed:', err);
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Redirect if already authenticated
    if (isAuthenticated) {
        console.log('User is already authenticated, redirecting...');
        router.replace('/projects');
        return null; // Return null while redirecting
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <AuthForm onSubmit={handleLogin} loading={loading} />
                {error && (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                )}
            </div>
        </div>
    );
}
