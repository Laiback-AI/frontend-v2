import { loginUserApi, signUpUserApi } from '../api/authApi';
import {
    AuthResponse,
    LoginRequest,
    SignUpRequest,
} from '../types/authTypes';
import { useAuthStore } from '../../../state/stores/auth/authStore';
import { withCsrfToken } from './cookiesService';
import { deleteCookie } from '../api/cookies';
import { useSessionStore } from '../stores/sessionStore';

export const loginUser = async (
    credentials: LoginRequest
): Promise<AuthResponse> => {
    try {
        const response = await loginUserApi(credentials);
        console.log('Login API response:', response);

        if (response && response.token) {
            useAuthStore.getState().setAuthData({
                token: response.token,
                user_id: response.user_id,
                account_id: response.account_id,
            });

            // Verify token was saved
            const savedToken = useAuthStore.getState().getToken();
            console.log('Verified saved token:', savedToken);
        }

        return response;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const signUpUser = async (
    userData: SignUpRequest
): Promise<AuthResponse> => {
    return withCsrfToken(async () => {
        try {
            const response = await signUpUserApi(userData);

            if (response && response.token) {
                // Save auth data to Zustand
                useAuthStore.getState().setAuthData({
                    token: response.token,
                    user_id: response.user_id,
                    account_id: response.account_id,
                });

                return response;
            }

            throw new Error('Invalid response from server');
        } catch (error) {
            throw new Error('Sign-up failed');
        }
    });
};

export const logoutUser = () => {
    // Clear cookies
    deleteCookie('sessionToken');
    deleteCookie('userId');

    // Clear Zustand state
    useSessionStore.getState().logout();
    console.log('User logged out, auth data cleared');
};

// Helper functions
export const getAuthData = () => {
    const { token, userId, accountId } = useAuthStore.getState();
    return { token, userId, accountId };
};

export const isAuthenticated = () => {
    const { token } = useAuthStore.getState();
    return !!token;
};
