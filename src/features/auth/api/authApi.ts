import axios from 'axios';
import { AuthResponse, LoginRequest, SignUpRequest } from '../types/authTypes';
import { getHeaders } from '../../shared/api/headers';

// Base URL for authentication endpoints
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

/**
 * API layer for authentication-related network requests.
 * This layer is responsible only for making HTTP requests to the backend.
 */
export const authApi = {
    /**
     * Makes a POST request to login endpoint.
     * @param credentials - User login credentials (email and password)
     * @returns Promise containing the authentication response from the server
     */
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(credentials),
            credentials: 'include',
        });
        return response.json();
    },

    /**
     * Makes a POST request to signup endpoint.
     * @param userData - User registration data including email, password, and profile info
     * @returns Promise containing the authentication response from the server
     */
    signUp: async (userData: SignUpRequest): Promise<AuthResponse> => {
        const response = await axios.post(
            `${API_URL}/signup`,
            userData,
            {
                headers: getHeaders(),
                withCredentials: true,
            }
        );
        return response.data;
    },

    /**
     * Makes a POST request to logout endpoint.
     * @returns Promise that resolves when logout is complete
     */
    logout: async (): Promise<void> => {
        await axios.post(
            `${API_URL}/logout`,
            {},
            {
                headers: getHeaders(),
                withCredentials: true,
            }
        );
    }
};
