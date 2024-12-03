'use client';

import { useState } from 'react';
import {
    Input,
    Button,
    Spacer,
    Card,
    CardBody,
    Text,
    Divider,
} from '@nextui-org/react';
import { useAuthStore } from '../../state/stores/authStore';
import { useRouter } from 'next/navigation';
import { signUpUser } from '../../services/auth/authService';

export default function SignUpForm() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        surname: '',
        account_name: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle sign-up submission
    const handleSignUp = async () => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await signUpUser({
                ...formData,
                is_admin: true,
            });

            // Store user data in Zustand
            login(response.token, {
                id: response.user_id,
                email: formData.email,
                name: formData.name,
                surname: formData.surname,
                account_name: formData.account_name,
            });

            // Redirect on success
            router.push('/main');
        } catch (err: any) {
            console.error('Sign-up error:', err);
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardBody className="flex flex-col gap-4">
                <Text h3 className="text-center">
                    Create Your Account
                </Text>

                <Divider />

                {/* Email Input */}
                <Input
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    aria-label="Email"
                />

                {/* Password Input */}
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    aria-label="Password"
                />

                {/* Name Input */}
                <Input
                    label="First Name"
                    name="name"
                    placeholder="Enter your first name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    aria-label="First Name"
                />

                {/* Surname Input */}
                <Input
                    label="Last Name"
                    name="surname"
                    placeholder="Enter your last name"
                    value={formData.surname}
                    onChange={handleChange}
                    disabled={isLoading}
                    aria-label="Last Name"
                />

                {/* Company Name Input */}
                <Input
                    label="Company Name"
                    name="account_name"
                    placeholder="Enter your company name"
                    value={formData.account_name}
                    onChange={handleChange}
                    disabled={isLoading}
                    aria-label="Company Name"
                />

                {/* Error Message */}
                {error && (
                    <Text color="danger" className="text-center">
                        {error}
                    </Text>
                )}

                <Spacer y={1} />

                {/* Submit Button */}
                <Button
                    color="primary"
                    onPress={handleSignUp}
                    isDisabled={
                        !formData.email ||
                        !formData.password ||
                        !formData.name ||
                        !formData.surname ||
                        !formData.account_name ||
                        isLoading
                    }
                    isLoading={isLoading}
                >
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </Button>
            </CardBody>
        </Card>
    );
}
