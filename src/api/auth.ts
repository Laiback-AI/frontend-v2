import axios from 'axios';
import { AuthResponse } from '../types/authTypes';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Real API Calls

// Real login API function
export const loginUserApi = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

// Real sign-up API function
export const signUpUserApi = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/auth/signup`, { username, password });
  return response.data;
};

// Mock API Calls

// Mock login function
export const loginMock = async (username: string): Promise<AuthResponse> => {
  return {
    token: "mock-token",
    user: {
      id: 1,
      username: username,
      name: "Mock User",
      email: "mockuser@example.com",
    }
  };
};

// Mock sign-up function
export const signUpMock = async (username: string): Promise<AuthResponse> => {
  return loginMock(username);
};

// Mock logout function
export const logoutMock = async (): Promise<void> => {
  console.log('Logged out');
};
