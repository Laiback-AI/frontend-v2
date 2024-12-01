import { useCookieStore } from '../../state/stores/cookies';
import { fetchCsrfTokenApi } from '../../api/cookies';

export const initializeCsrf = async () => {
  try {
    const response = await fetchCsrfTokenApi();
    
    const csrfToken = response;

    if (csrfToken) {
      useCookieStore.getState().setCsrfToken(csrfToken.csrfToken);
      console.log('CSRF Token initialized:', csrfToken.csrfToken);
    }

    return csrfToken;
  } catch (error) {
    console.error('Failed to initialize CSRF token:', error);
    throw error;
  }
};