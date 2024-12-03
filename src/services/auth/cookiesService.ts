import { setCookie, getCookie } from '../../features/auth/api/cookies';

export async function initializeCsrf() {
    // Fetch CSRF token from the server
    const response = await fetch('/api/csrf-token');
    const data = await response.json();
    const csrfToken = data.csrfToken;

    // Store CSRF token in cookies
    setCookie('csrfToken', csrfToken);
}

export function withCsrfToken(callback: () => Promise<any>) {
    const csrfToken = getCookie('csrfToken');
    if (!csrfToken) {
        throw new Error('CSRF token not found');
    }
    return callback();
}
