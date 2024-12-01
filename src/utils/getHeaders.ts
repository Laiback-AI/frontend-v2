import { useCookieStore } from '../state/stores/cookies';
import { useAuthStore } from '../state/stores/authStore';

interface Headers {
  'Content-Type': string;
  'Accept'?: string;
  'X-CSRFToken'?: string;
  'Authorization'?: string;
}

/**
 * Get common headers for API requests
 * @returns Headers object with CSRF token and content type
 */
export const getHeaders = (): Headers => {
  const { csrfToken } = useCookieStore.getState();
  const { token } = useAuthStore.getState();

  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(csrfToken && { 'X-CSRFToken': csrfToken }),
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

/**
 * Get headers for multipart form data (file uploads)
 * @returns Headers object without Content-Type (browser will set it)
 */
export const getMultipartHeaders = (): Omit<Headers, 'Content-Type'> => {
  const { csrfToken } = useCookieStore.getState();
  const { token } = useAuthStore.getState();

  return {
    'Accept': 'application/json',
    ...(csrfToken && { 'X-CSRFToken': csrfToken }),
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};