'use client';

import { useState } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ToggleAuthButton from './ToggleAuthButton';

type AuthFormProps = {
    onLogin: (email: string, password: string) => void;
    onSignUp: (email: string, password: string, additionalData: Record<string, any>) => void;
    loading: boolean;
};

export default function AuthForm({ onLogin, onSignUp, loading }: AuthFormProps) {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleAuthMode = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <Card className="w-full max-w-md">
            <CardBody className="flex flex-col gap-4">
                {isSignUp ? (
                    <SignUpForm onSubmit={onSignUp} loading={loading} />
                ) : (
                    <LoginForm onSubmit={onLogin} loading={loading} />
                )}
                <ToggleAuthButton
                    isSignUp={isSignUp}
                    onToggle={toggleAuthMode}
                />
            </CardBody>
        </Card>
    );
}
