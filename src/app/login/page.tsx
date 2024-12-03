'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../components/auth/AuthForm';
import { loginUserApi } from '../../api/auth/auth';
import { useAuthStore } from '../../state/stores/authStore';

export default function LoginPage() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError(null); // Clear previous error messages

        try {
            const response = await loginUserApi({ email, password });
            console.log('Login successful:', response);

            // Update Zustand store
            setAuthenticated(true);

            // Redirect to projects page
            router.replace('/projects');
        } catch (err: any) {
            console.error('Login failed:', err);
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isAuthenticated) {
        // Redirect if already authenticated
        console.log('User is already authenticated, redirecting...');
        router.replace('/projects');
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <AuthForm onSubmit={handleLogin} loading={loading} />
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}
