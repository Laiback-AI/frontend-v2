"use client";

import { useState } from 'react';
import { Card, CardBody } from "@nextui-org/card";
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ToggleAuthButton from './ToggleAuthButton';

export default function AuthForm() {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleAuthMode = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <Card className="w-full max-w-md">
            <CardBody className="flex flex-col gap-4">
                {isSignUp ? <SignUpForm /> : <LoginForm />}
                <ToggleAuthButton
                    isSignUp={isSignUp}
                    onToggle={toggleAuthMode}
                />
            </CardBody>
        </Card>
    );
}