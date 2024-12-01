import { loginUserApi, loginMock, logoutMock, signUpMock, signUpUserApi } from '../../api/auth';
import { AuthResponse } from '../../types/authTypes';

const useMock = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

// Function to log in a user
export const loginUser = async (username: string, password: string): Promise<AuthResponse> => {
    try {
        return useMock ? await loginMock(username) : await loginUserApi(username, password);
    } catch (error) {
        throw new Error('Login failed');
    }
};

// Function to log out a user (mock implementation)
export const logoutUser = async (): Promise<void> => {
    if (useMock) {
        await logoutMock();
    } else {
        // Implement real logout logic here
    }
};

// Function to sign up a user
export const signUpUser = async (username: string, password: string): Promise<AuthResponse> => {
    try {
        return useMock ? await signUpMock(username) : await signUpUserApi(username, password);
    } catch (error) {
        throw new Error('Sign-up failed');
    }
};
