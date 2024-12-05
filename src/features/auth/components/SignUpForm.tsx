'use client';

import { useState } from 'react';
import {
    Input,
    Button,
    Spacer,
    Card,
    CardBody,
    Textarea,
    Divider,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/authService';

interface SignUpFormProps {
    onSubmit: (email: string, password: string) => Promise<void>;
    loading: boolean;
}

export default function SignUpForm({ onSubmit, loading }: SignUpFormProps) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        surname: '',
        account_name: '',
        is_admin: true,
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
            const response = await authService.signUp(formData);
            console.log('Sign-up successful:', response);

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
                <h3 className="text-center text-xl font-bold">
                    Create Your Account
                </h3>

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
                    <Textarea 
                        color="danger" 
                        className="text-center"
                        readOnly
                        value={error}
                    />
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
