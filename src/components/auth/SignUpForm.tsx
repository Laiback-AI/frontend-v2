"use client";

import { useState } from 'react';
import { Input, Button, Spacer } from '@nextui-org/react';
import { CardBody, CardFooter } from '@nextui-org/card';
import { signUpMock } from '../../api/auth';
import { useAuthStore } from '../../state/stores/authStore';
import { useRouter } from 'next/navigation';
import { AuthResponse } from '../../types/authTypes';

export default function SignUpForm() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        try {
            const response: AuthResponse = await signUpMock(JSON.stringify({ username, password }));

            // Ensure `name` exists, or fallback to "Unknown User"
            login(response.token, {
                ...response.user,
                name: response.user.name || 'Unknown User',
            });

            router.push('/main');
        } catch (error) {
            console.error('Sign-up failed', error);
            setError("Username already exists or other error");
        }
    };

    return (
        <CardBody>
            <Input
                fullWidth
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <Spacer y={1.5} />
            <Input
                fullWidth
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <CardFooter>
                <Button fullWidth color="primary" onPress={handleSignUp}>
                    Sign Up
                </Button>
            </CardFooter>
        </CardBody>
    );
}
