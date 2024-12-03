import { getCookie } from '../api/auth/cookies';

export async function apiClient(endpoint: string, options: RequestInit = {}) {
  const csrfToken = getCookie('csrfToken');
  const sessionToken = getCookie('sessionToken');

  const headers = {
    ...options.headers,
    'X-CSRF-Token': csrfToken,
    Authorization: `Bearer ${sessionToken}`,
  };

  const response = await fetch(endpoint, { ...options, headers });

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  return response.json();
}

