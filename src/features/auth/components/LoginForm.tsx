'use client';

import { useState } from 'react';
import { Input, Button, Text, Card, CardBody } from '@nextui-org/react';
import { useAuthStore } from '../../state/stores/authStore';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../services/auth/authService';
import { User } from '../../types/authTypes';

interface LoginFormData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle login submission
    const handleLogin = async () => {
        setIsLoading(true);
        setError(null);

        try {
            console.log('Starting login process...');
            const response = await loginUser(formData);

            console.log('Login response:', response);

            if (response?.token) {
                const user: User = {
                    id: response.user_id,
                    email: formData.email,
                    name: '',
                    surname: '',
                    account_name: '',
                };

                login(response.token, response.user_id, response.account_id);
                console.log('Authentication successful, redirecting...');
                router.replace('/projects');
            }
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardBody className="flex flex-col gap-4">
                <Text h3 className="text-center">Login</Text>

                {/* Email Input */}
                <Input
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    type="email"
                    placeholder="Enter your email"
                    aria-label="Email"
                />

                {/* Password Input */}
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="Enter your password"
                    aria-label="Password"
                />

                {/* Error Message */}
                {error && (
                    <Text color="danger" size="sm" className="text-center">
                        {error}
                    </Text>
                )}

                {/* Submit Button */}
                <Button
                    color="primary"
                    onPress={handleLogin}
                    isDisabled={!formData.email || !formData.password || isLoading}
                    isLoading={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
            </CardBody>
        </Card>
    );
};

export default LoginForm;
