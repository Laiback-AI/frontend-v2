import { setCookie, getCookie } from '../api/cookies';
import { useCookieStore } from '../stores/cookiesStore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

/**
 * Initialize CSRF protection by fetching a token from the backend
 * and storing it in both cookies and Zustand store
 */
export async function initializeCsrf() {
    try {
        // Check if we already have a valid CSRF token
        console.log('Checking for existing CSRF token');
        const existingToken = getCookie('csrfToken');
        console.log('existingToken', existingToken);
        const existingStoreToken = useCookieStore.getState().csrfToken;
        console.log('existingStoreToken', existingStoreToken);

        if (existingToken && existingStoreToken) {
            console.log('Using existing CSRF token');
            return existingToken;
        }

        console.log('Fetching new CSRF token');
        // If no valid token exists, fetch a new one from the backend
        const response = await fetch(`${API_BASE_URL}auth/csrf/`, {
            method: 'GET',
            credentials: 'include', // Important for CSRF cookies
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch CSRF token: ${response.status}`);
        }
        
        const data = await response.json();
        const csrfToken = data.csrfToken; // Adjust based on your API response structure
        console.log('csrfToken', csrfToken);

        // Store CSRF token in both cookies and Zustand store
        setCookie('csrfToken', csrfToken);
        useCookieStore.getState().setCsrfToken(csrfToken);

        console.log('New CSRF token initialized successfully');
        return csrfToken;
    } catch (error) {
        console.error('Failed to initialize CSRF token:', error);
        throw error;
    }
}

/**
 * Wrapper function to ensure CSRF token is present before making API calls
 * @param callback - The API call function to execute
 * @returns Promise from the callback function
 * @throws Error if CSRF token is not found
 */
export function withCsrfToken<T>(callback: () => Promise<T>): Promise<T> {
    const csrfToken = getCookie('csrfToken');
    if (!csrfToken) {
        throw new Error('CSRF token not found. Please ensure you are authenticated.');
    }
    return callback();
}

/**
 * Verify if CSRF token exists and is valid in both cookie and store
 * @returns boolean indicating if CSRF token is present and synchronized
 */
export function hasCsrfToken(): boolean {
    const cookieToken = getCookie('csrfToken');
    const storeToken = useCookieStore.getState().csrfToken;
    return !!cookieToken && !!storeToken && cookieToken === storeToken;
}

/**
 * Force refresh the CSRF token
 * @returns Promise<string> New CSRF token
 */
export async function refreshCsrfToken(): Promise<string> {
    // Clear existing tokens
    setCookie('csrfToken', '');
    useCookieStore.getState().clearSession();
    
    // Get new token
    return initializeCsrf();
}
