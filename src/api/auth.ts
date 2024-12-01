import axios, { AxiosResponse } from 'axios';
import { AuthResponse, LoginRequest, SignUpRequest } from '../types/authTypes';
import { API_BASE_URL } from '../config';
import { useCookieStore } from '../state/stores/cookies';
import { use } from 'react';
const API_URL = `${API_BASE_URL}/api/v1/auth`;

/**
 * Common headers for API requests.
 */
const getHeaders = () => {
  const { csrfToken } = useCookieStore.getState();
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(csrfToken && { 'X-CSRFToken': csrfToken }),
  };
};

/**
 * Logs in a user using provided credentials.
 * @param credentials LoginRequest
 * @returns Promise<AuthResponse>
 */
export const loginUserApi = async (credentials: LoginRequest): Promise<AuthResponse> => {
  try {
    console.log('Making API call to:', `${API_URL}/login/`);
    console.log('Headers:', getHeaders());
    console.log('CSRF Token:', useCookieStore.getState().csrfToken);
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${API_URL}/login/`,
      {
        email: credentials.email,
        password: credentials.password,
      },
      {
        headers: getHeaders(),
      }
    );
    
    return response.data;
  } catch (error: any) {
    console.error('Login API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    throw error;
  }
};

/**
 * Signs up a user using provided user data.
 * @param userData SignUpRequest
 * @returns Promise<AuthResponse>
 */
export const signUpUserApi = async (userData: SignUpRequest): Promise<AuthResponse> => {
  try {
    console.log('Headers:', getHeaders());
    console.log('CSRF Token:', useCookieStore.getState().csrfToken);
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${API_URL}/signup/`,
      {
        email: userData.email,
        password: userData.password,
        account_name: userData.account_name,
        name: userData.name,
        surname: userData.surname,
        is_admin: userData.is_admin ?? true, // Defaults to true if not provided
      },
      {
        headers: getHeaders(),
      }
    );
    
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
};
