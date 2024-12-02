"use client";

import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useAuthStore } from '../../state/stores/authStore';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../services/auth/authService';
import { User } from '../../types/authTypes';

// Interface for form data
interface LoginFormData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Form state management
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const handleLogin = async () => {
        setIsLoading(true);
        setError('');

        try {
            console.log('Starting login process...');
            const response = await loginUser(formData);
            console.log('Login response:', response);

            if (response && response.token) {
                // Create user object from response
                const user: User = {
                    id: response.user_id,
                    email: formData.email,
                    name: '',
                    surname: '',
                    account_name: ''
                };

                // Update auth store
                login(response.token, response.user_id, response.account_id);

                console.log('Authentication successful, redirecting...');
                router.replace('/projects');
            }

        } catch (error: any) {
            console.error('Login error:', error);
            setError(error.message || 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Form Header */}
            <h2 className="text-2xl font-bold text-center">Login</h2>

            {/* Email Input */}
            <Input
                label="Email"
                value={formData.email}
                onChange={(e) => setFormData({
                    ...formData,
                    email: e.target.value
                })}
                isDisabled={isLoading}
                // Optional: Add email validation
                type="email"
                placeholder="Enter your email"
            />

            {/* Password Input */}
            <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({
                    ...formData,
                    password: e.target.value
                })}
                isDisabled={isLoading}
                placeholder="Enter your password"
            />

            {/* Error Message Display */}
            {error && (
                <p className="text-danger text-center text-sm">
                    {error}
                </p>
            )}

            {/* Submit Button */}
            <Button
                fullWidth
                color="primary"
                onPress={handleLogin}
                isLoading={isLoading}
                // Optional: Disable button if form is empty
                isDisabled={!formData.email || !formData.password}
            >
                {isLoading ? 'Logging in...' : 'Login'}
            </Button>
        </div>
    );
};

export default LoginForm;