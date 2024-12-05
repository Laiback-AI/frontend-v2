import { useCookieStore } from '../../auth/stores/cookiesStore';
import { getCookie } from '../../auth/api/cookies';

/**
 * Gets common headers for API calls, including CSRF and session tokens.
 * @returns Object containing headers
 */
export const getHeaders = () => {
    // Get CSRF token from Zustand store
    const { csrfToken } = useCookieStore.getState();
    
    // Get session token from browser storage
    const sessionToken = localStorage.getItem('sessionToken');
    
    // Get session cookie if it exists (backup/alternative to localStorage)
    const sessionCookie = getCookie('sessionToken');

    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(csrfToken && { 'X-CSRFToken': csrfToken }), // CSRF from Zustand
        ...(sessionToken && { 'Authorization': `Bearer ${sessionToken}` }), // Session from localStorage
    };
};