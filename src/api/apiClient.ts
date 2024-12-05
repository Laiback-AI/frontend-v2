import { getCookie } from '../features/auth/api/cookies'; // Utility to read cookies

/**
 * Generic API client for making authenticated HTTP requests.
 * This function standardizes the way API calls are made and ensures
 * that all necessary authentication headers are included.
 *
 * @param endpoint - The API endpoint to call (e.g., `/api/v1/users`).
 * @param options - Fetch options such as method, body, etc. (optional).
 * @returns A Promise that resolves with the parsed JSON response.
 */
export async function apiClient(endpoint: string, options: RequestInit = {}) {
  // Retrieve the CSRF token from cookies (used for CSRF protection)
  const csrfToken = getCookie('csrfToken');      

  // Retrieve the session token (used for user authentication)
  const sessionToken = getCookie('sessionToken'); 

  // Merge headers: include authentication headers if available
  const headers = {
    ...options.headers,                          // Preserve any existing headers
    ...(csrfToken && { 'X-CSRF-Token': csrfToken }), // Add CSRF token if it exists
    ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }), // Add Bearer token
  };

  // Execute the fetch call with the provided options and the merged headers
  const response = await fetch(endpoint, { 
    ...options,                                  // Spread original options
    headers                                     // Add authentication headers
  });

  // Handle scenarios where the server returns a 401 Unauthorized status
  if (response.status === 401) {
    throw new Error('Unauthorized');            // Throw an error if not authenticated
  }

  // Parse the JSON response and return it to the caller
  return response.json();
}
