// CREATE NEW FILE: src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

export function useAuth() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Get token from localStorage, cookies, or your auth system
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return { token };
}