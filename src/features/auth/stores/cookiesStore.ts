import { create } from 'zustand';

// For Cookies: Managing security tokens and session identifiers
interface CookieState {
  csrfToken: string | null;
  setCsrfToken: (token: string) => void;
  clearSession: () => void;
}

// CSRF token is stored in Zustand state
export const useCookieStore = create<CookieState>((set) => ({
  csrfToken: null,
  setCsrfToken: (token) => set({ csrfToken: token }),
  clearSession: () => set({ csrfToken: null }),
}));
