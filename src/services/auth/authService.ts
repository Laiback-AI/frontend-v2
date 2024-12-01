import { loginUserApi, signUpUserApi } from '../../api/auth';
import { AuthResponse, LoginRequest, SignUpRequest } from '../../types/authTypes';
import { API_BASE_URL } from '../../config';

export const loginUser = async (credentials: LoginRequest): Promise<AuthResponse> => {
  console.log('API URL being used service:', `${API_BASE_URL}/api/v1/auth/signup`);
  try {
    const response = await loginUserApi(credentials);
    return response;
  } catch (error: any) {
    console.error('Full error details:', {
      message: error.message,
      response: error.response,
      request: error.request
    });
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