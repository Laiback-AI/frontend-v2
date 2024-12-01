'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../components/auth/AuthForm';
import { useAuthStore } from '../../state/stores/authStore';

export default function LoginPage() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const router = useRouter();

    useEffect(() => {
        console.log('Auth state changed:', { isAuthenticated });

        if (isAuthenticated) {
            console.log('User is authenticated, redirecting to projects...');
            router.replace('/projects');
        }
    }, [isAuthenticated, router]);

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <AuthForm />
        </div>
    );
}