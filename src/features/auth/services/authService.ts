import { authApi } from '../api/authApi';
import { AuthResponse, LoginRequest, SignUpRequest } from '../types/authTypes';
import { useCookieStore } from '@/features/auth/stores/cookiesStore';
import useSessionStore from '@/features/auth/stores/sessionStore';
import { setCookie } from '../api/cookies';
import { withCsrfToken } from './cookiesService';

/**
 * Service layer for authentication-related business logic.
 * Handles state management, error handling, and data transformation.
 */
export const authService = {
    /**
     * Handles user login process including:
     * - CSRF token validation
     * - API call
     * - Session storage in cookies
     * - State management in Zustand
     * - Error handling
     * 
     * @param credentials - User login credentials
     * @returns Promise containing the authentication response
     * @throws Error with login failure message
     */
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        return withCsrfToken(async () => {
            try {
                console.log('credentials', credentials);
                const data = await authApi.login(credentials);
                console.log('data', data);
                const { token: sessionToken, user_id, email, name, surname, account_name } = data;

                // Store session data in cookies for persistence
                setCookie('sessionToken', sessionToken);
                setCookie('userId', user_id.toString());

                // Update application state using the correct method names
                useSessionStore.getState().login(sessionToken, {
                    id: user_id,
                    email,
                    name,
                    surname,
                    account_name
                });

                return data;
            } catch (error) {
                console.error('Login Error:', error);
                throw new Error('Login failed');
            }
        });
    },

    /**
     * Handles user registration process including:
     * - CSRF token validation
     * - API call
     * - Session storage in cookies
     * - State management in Zustand
     * - Error handling with detailed logging
     * 
     * @param userData - User registration data
     * @returns Promise containing the authentication response
     * @throws Error with registration failure message
     */
    signUp: async (userData: SignUpRequest): Promise<AuthResponse> => {
        return withCsrfToken(async () => {
            try {
                const data = await authApi.signUp(userData);
                const { token: sessionToken, user_id, email, name, surname, account_name } = data;

                // Update application state using the correct method names
                useSessionStore.getState().login(sessionToken, {
                    id: user_id,
                    email,
                    name,
                    surname,
                    account_name
                });

                return data;
            } catch (error: any) {
                console.error('SignUp Error:', {
                    error,
                    message: error.message,
                    status: error.response?.status,
                    data: error.response?.data,
                });
                throw new Error('Registration failed');
            }
        });
    },

    /**
     * Handles user logout process including:
     * - API call to backend
     * - Clearing session data from cookies
     * - Clearing application state
     * - Error handling with detailed logging
     * 
     * @throws Error with logout failure message
     */
    logout: async (): Promise<void> => {
        try {
            await authApi.logout();
            // Clear all session data using the correct method names
            useSessionStore.getState().logout();
            useCookieStore.getState().clearSession();
        } catch (error: any) {
            console.error('Logout Error:', {
                error,
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
            throw new Error('Logout failed');
        }
    }
};
