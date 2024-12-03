import axios, { AxiosResponse } from 'axios';
import { AuthResponse, LoginRequest, SignUpRequest } from '../../types/authTypes';
import { API_BASE_URL } from '../../config';
import { useCookieStore } from '../../state/stores/cookies';
import { withCsrfToken } from '../../services/auth/cookiesService';
import { useSessionStore } from '../../state/stores/sessionStore';
import { setCookie } from '../../features/auth/api/cookies';

const API_URL = `${API_BASE_URL}/api/v1/auth`;

/**
 * Gets common headers for API calls, including CSRF token if available.
 * @returns Object containing headers
 */
const getHeaders = () => {
    const { csrfToken } = useCookieStore.getState();
    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(csrfToken && { 'X-CSRFToken': csrfToken }), // Add CSRF token if available
    };
};

/**
 * Logs in a user using provided credentials.
 * @param credentials LoginRequest
 * @returns Promise<AuthResponse>
 */
export const loginUserApi = async (
    credentials: LoginRequest
): Promise<AuthResponse> => {
    return withCsrfToken(async () => {
        try {
            const headers = getHeaders();
            const response = await fetch(`${API_URL}/login/`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(credentials),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data: AuthResponse = await response.json();
            const { sessionToken, userId } = data;

            // Store session token and userId in cookies
            setCookie('sessionToken', sessionToken);
            setCookie('userId', userId);

            // Update Zustand stores
            useSessionStore.getState().setSessionToken(sessionToken);
            useSessionStore.getState().setUserId(userId);

            return data;
        } catch (error) {
            console.error('Login API Error:', error);
            throw error;
        }
    });
};

/**
 * Signs up a user using provided user data.
 * @param userData SignUpRequest
 * @returns Promise<AuthResponse>
 */
export const signUpUserApi = async (
    userData: SignUpRequest
): Promise<AuthResponse> => {
    return withCsrfToken(async () => {
        try {
            const response: AxiosResponse<AuthResponse> = await axios.post(
                `${API_URL}/signup/`,
                {
                    email: userData.email,
                    password: userData.password,
                    account_name: userData.account_name,
                    name: userData.name,
                    surname: userData.surname,
                    is_admin: userData.is_admin ?? true, // Default to true if not provided
                },
                {
                    headers: getHeaders(),
                    withCredentials: true, // Include cookies in Axios request
                }
            );

            // Save session token and userId to Zustand
            const { sessionToken, userId } = response.data;
            useCookieStore.getState().setSessionToken(sessionToken);
            useCookieStore.getState().setUserId(userId);

            return response.data;
        } catch (error: any) {
            console.error('SignUp API Error:', {
                error: error,
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers,
            });
            throw error;
        }
    });
};

/**
 * Logs out a user by clearing session cookies and Zustand state.
 */
export const logoutUserApi = async (): Promise<void> => {
    try {
        const headers = getHeaders();
        await axios.post(
            `${API_URL}/logout/`,
            {},
            {
                headers: headers,
                withCredentials: true, // Include cookies
            }
        );

        // Clear Zustand state and cookies
        useCookieStore.getState().clearSession();
    } catch (error: any) {
        console.error('Logout API Error:', {
            error: error,
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        throw error;
    }
};
