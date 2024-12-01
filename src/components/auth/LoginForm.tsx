"use client";

import { useState } from 'react';
import { Input, Button, Spacer } from '@nextui-org/react';
import { useAuthStore } from '../../state/stores/authStore';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            // Add your login logic here
            router.push('/main');
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <Input
                fullWidth
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                fullWidth
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-danger text-center">{error}</p>}
            <Button fullWidth color="primary" onPress={handleLogin}>
                Login
            </Button>
        </div>
    );
};

export default LoginForm;