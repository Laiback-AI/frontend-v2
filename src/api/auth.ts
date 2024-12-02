import axios, { AxiosResponse } from 'axios';
import { AuthResponse, LoginRequest, SignUpRequest } from '../types/authTypes';
import { API_BASE_URL } from '../config';
import { useCookieStore } from '../state/stores/cookies';
import { use } from 'react';
import { withCsrfToken } from '../services/auth/cookiesService';
//import { getHeaders } from '../utils/getHeaders';

const API_URL = `${API_BASE_URL}/api/v1/auth`;

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
  return withCsrfToken(async () => {
    try {
      const headers = getHeaders();
      console.log('CSRF Token:', useCookieStore.getState().csrfToken);
      console.log('Headers:', headers);

      const response = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
        credentials: 'include', // This is important for cookies
      });

      if (!response.ok) {
        // Handle non-2xx responses
        const errorData = await response.json();
        throw {
          status: response.status,
          data: errorData,
          headers: Object.fromEntries(response.headers.entries()),
        };
      }

      const data: AuthResponse = await response.json();
      return data;
    } catch (error: any) {
      console.error('Login API Error:', {
        status: error.status,
        data: error.data,
        headers: error.headers,
      });
      throw error;
    }
  });
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
