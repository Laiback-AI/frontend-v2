"use client";

import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useAuthStore } from '../../state/stores/authStore';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../services/auth/authService';

const LoginForm = () => {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        setError('');

        try {
            console.log('Submitting login form with data:', formData);
            const response = await loginUser(formData);
            console.log('Login successful:', response);

            login(response.token, {
                id: response.user_id,
                email: formData.email,
                name: '',
                surname: '',
                account_name: ''
            });

            router.push('/main');
        } catch (error: any) {
            console.error('Login error:', error);
            setError(error.message || 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <Input
                label="Email"
                value={formData.email}
                // autoComplete="off"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                isDisabled={isLoading}
            />
            <Input
                label="Password"
                type="password"
                // autoComplete="new-password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                isDisabled={isLoading}
            />
            {error && <p className="text-danger text-center">{error}</p>}
            <Button
                fullWidth
                color="primary"
                onPress={handleLogin}
                isLoading={isLoading}
            >
                {isLoading ? 'Logging in...' : 'Login'}
            </Button>
        </div>
    );
};

export default LoginForm;