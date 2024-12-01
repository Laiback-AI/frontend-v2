// CREATE NEW FILE: src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../state/stores/authStore';

export function useAuth() {
    const token = useAuthStore((state) => state.token);
    const isAuthenticated = Boolean(token);

    useEffect(() => {
        // Initialize auth state from localStorage if needed
        const storedToken = localStorage.getItem('token');
        if (storedToken && !token) {
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            useAuthStore.getState().login(storedToken, storedUser);
        }
    }, [token]);

    return { token, isAuthenticated };
}