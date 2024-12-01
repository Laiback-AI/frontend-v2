"use client";

import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useAuthStore } from '../../state/stores/authStore';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        try {
            // Add your signup logic here
            router.push('/main');
        } catch (error) {
            setError("Username already exists or other error");
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>
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
            <Button fullWidth color="primary" onPress={handleSignUp}>
                Sign Up
            </Button>
        </div>
    );
}