import { create } from 'zustand';

interface CookieState {
  csrfToken: string | null;
  setCsrfToken: (token: string) => void;
  getCsrfToken: () => string | null;
  clearCsrfToken: () => void;
}

export const useCookieStore = create<CookieState>((set, get) => ({
  csrfToken: null,

  // Set the CSRF token
  setCsrfToken: (token: string) => {
    set({ csrfToken: token });
    console.log('CSRF Token set in store:', token);
  },

  // Get the current CSRF token
  getCsrfToken: () => {
    return get().csrfToken;
  },

  // Clear the token (useful for logout)
  clearCsrfToken: () => {
    set({ csrfToken: null });
    console.log('CSRF Token cleared');
  },
}));

// Helper to get headers with CSRF token
export const getCsrfHeaders = () => {
  const csrfToken = useCookieStore.getState().csrfToken;
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(csrfToken && { 'X-CSRFToken': csrfToken }),
  };
};