import { useCookieStore } from '../../state/stores/cookies';
import { fetchCsrfTokenApi } from '../../api/cookies';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

// Add token expiration check
const isTokenExpired = async (token: string | null): Promise<boolean> => {
  if (!token) return true;
  
  try {
    // Try to make a lightweight validation request
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/validate-csrf/`,
      {},
      {
        headers: {
          'X-CSRFToken': token
        }
      }
    );
    return false; // Token is valid
  } catch (error: any) {
    // If we get a 403, token is expired/invalid
    return error?.response?.status === 403;
  }
};

export const initializeCsrf = async (): Promise<string | null> => {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const response = await fetchCsrfTokenApi();
      const csrfToken = response?.csrfToken;

      if (csrfToken) {
        useCookieStore.getState().setCsrfToken(csrfToken);
        axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
        return csrfToken;
      }
      return null;
    } catch (error) {
      console.error('Failed to initialize CSRF token:', error);
      throw error;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

export const withCsrfToken = async <T>(
  apiCall: () => Promise<T>
): Promise<T> => {
  try {
    const currentToken = useCookieStore.getState().csrfToken;
    
    // Check if token exists and is valid
    if (!currentToken || await isTokenExpired(currentToken)) {
      console.log('CSRF token is expired or missing, refreshing...');
      await initializeCsrf();
    }

    // Try the API call
    return await apiCall();
  } catch (error: any) {
    // If we still get a 403 after the initial check, refresh and retry
    if (error?.response?.status === 403) {
      console.log('Received 403, refreshing CSRF token and retrying...');
      await initializeCsrf();
      // Retry the API call
      return await apiCall();
    }
    throw error;
  }
};

// Optional: Add a function to manually check and refresh token
export const ensureValidCsrfToken = async (): Promise<void> => {
  const currentToken = useCookieStore.getState().csrfToken;
  if (!currentToken || await isTokenExpired(currentToken)) {
    await initializeCsrf();
  }
};