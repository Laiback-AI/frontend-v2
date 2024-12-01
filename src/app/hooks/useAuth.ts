import { useState, useEffect, useCallback } from 'react';
import { loginUser, logoutUser, signUpUser } from '../../services/auth/authService';
import { useAuthStore } from '../../state/stores/authStore';

// Custom hook for handling user authentication
export const useAuth = () => {
  const { user, login, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initAuth = useCallback(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      login(storedToken, JSON.parse(storedUser));
    }
  }, [login]);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Function to handle user login
  const handleLogin = async (username: string, password: string) => {
    setLoading(true); // Set loading to true before starting the login process
    setError(null);
    try {
      const { token, user } = await loginUser(username, password);
      login(token, user);
    } catch (error) {
      // Log error if login fails
      setError(error instanceof Error ? error.message : 'Login failed');
      console.error('Login failed', error);
    } finally {
      // After the login process, set loading to false
      setLoading(false);
    }
  };

  // Function to handle user sign-up
  const handleSignUp = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { token, user } = await signUpUser(username, password);
      login(token, user);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Sign-up failed');
      console.error('Sign-up failed', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      logout();
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setLoading(false);
    }
  };

  // Return the user data, loading state, error state, and functions to login and logout
  return { user, loading, error, handleLogin, handleSignUp, handleLogout };
};
