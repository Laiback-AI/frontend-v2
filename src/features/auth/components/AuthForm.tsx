'use client';

import { useState } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ToggleAuthButton from './ToggleAuthButton';

interface AuthFormProps {
    onSubmit: (email: string, password: string) => Promise<void>;
    loading: boolean;
}

export default function AuthForm({ onSubmit, loading }: AuthFormProps) {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleAuthMode = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <Card className="w-full max-w-md">
            <CardBody className="flex flex-col gap-4">
                {isSignUp ? (
                    <SignUpForm onSubmit={onSubmit} loading={loading} />
                ) : (
                    <LoginForm onSubmit={onSubmit} loading={loading} />
                )}
                <ToggleAuthButton
                    isSignUp={isSignUp}
                    onToggle={toggleAuthMode}
                />
            </CardBody>
        </Card>
    );
}
