"use client";

import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
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
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        try {
            const response = await signUpUser({
                ...formData,
                is_admin: true
            });
            
            login(response.token, {
                id: response.user_id,
                email: formData.email,
                name: formData.name,
                surname: formData.surname,
                account_name: formData.account_name
            });
            
            router.push('/main');
        } catch (error) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>
            <Input
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                autoComplete="off"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                autoComplete="new-password"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <Input
                label="Name"
                placeholder="Enter your name"
                value={formData.name}
                autoComplete="off"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <Input
                label="Surname"
                placeholder="Enter your surname"
                value={formData.surname}
                autoComplete="off"
                onChange={(e) => setFormData({...formData, surname: e.target.value})}
            />
            <Input
                label="Company Name"
                placeholder="Enter your company name"
                value={formData.account_name}
                autoComplete="off"
                onChange={(e) => setFormData({...formData, account_name: e.target.value})}
            />
            {error && <p className="text-danger text-center">{error}</p>}
            <Button fullWidth color="primary" onPress={handleSignUp}>
                Sign Up
            </Button>
        </div>
    );
}