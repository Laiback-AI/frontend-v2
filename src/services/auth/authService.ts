import { loginUserApi, signUpUserApi } from '../../api/auth';
import { AuthResponse, LoginRequest, SignUpRequest } from '../../types/authTypes';
import { API_BASE_URL } from '../../config';

export const loginUser = async (credentials: LoginRequest): Promise<AuthResponse> => {
  try {
    console.log('Sending login request...');
    const response = await loginUserApi(credentials);
    
    if (response && response.token) {
      console.log('Login successful, received token');
      return response;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error: any) {
    console.error('Login service error:', error);
    throw error;
  }
};

export const signUpUser = async (userData: SignUpRequest): Promise<AuthResponse> => {
  try {
    return await signUpUserApi(userData);
  } catch (error) {
    throw new Error('Sign-up failed');
  }
};