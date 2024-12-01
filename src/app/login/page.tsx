"use client"; // Marks this component to run only on the client-side

import { useState } from 'react';
import { Input, Button, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { useAuthStore } from '../../state/stores/authStore';
import { AuthResponse } from '../../types/authTypes'; // Import the AuthResponse type
import SignUpForm from '../../components/auth/SignUpForm'; // Import the SignUpForm component
import { loginUser } from '../../services/auth/authService'; // Import loginUser from authService

// Main Login Page component
export default function LoginPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    // Local state to handle input fields and potential errors
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and sign-up

    const handleLogin = async () => {
        try {
            // Use the AuthResponse type here instead of 'any'
            const response: AuthResponse = await loginUser(username, password);
            login(response.token, response.user);
            console.log('Login success', response, username, password);
            router.push('/main');
        } catch (error) {
            console.error('Login failed', error, username, password);
            setError("Invalid username or password");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <Card shadow="md" radius="lg" fullWidth={false} style={{ padding: '20px', maxWidth: '400px' }}>
                <CardHeader>
                    <h2 style={{ textAlign: 'center' }}>{isSignUp ? 'Sign Up' : 'Login'}</h2>
                </CardHeader>
                {isSignUp ? (
                    <SignUpForm />
                ) : (
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
                    </CardBody>
                )}
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                {!isSignUp && (
                    <CardFooter>
                        <Button fullWidth color="primary" onPress={handleLogin}>
                            Login
                        </Button>
                    </CardFooter>
                )}
                <CardFooter>
                    <Button fullWidth color="secondary" onPress={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
