'use client';

import { useState } from 'react';
import { Input, Button, Textarea, Card, CardBody } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/authService';
import { User } from '../types/authTypes';

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginFormProps {
    onSubmit: (email: string, password: string) => Promise<void>;
    loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
    const router = useRouter();
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
            const response = await authService.login(formData);

            console.log('Login response:', response);

            if (response?.token) {
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
                <h3 className="text-center">Login</h3>

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
                    <Textarea color="danger" size="sm" className="text-center">
                        {error}
                    </Textarea>
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
