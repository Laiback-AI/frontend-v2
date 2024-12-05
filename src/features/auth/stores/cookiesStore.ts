import { create } from 'zustand';

// For Cookies: Managing security tokens and session identifiers
interface CookieState {
  csrfToken: string | null;
  sessionToken: string | null;
  userId: string | null;
  setCsrfToken: (token: string) => void;
  setSessionToken: (token: string) => void;
  setUserId: (id: string) => void;
  clearTokens: () => void;
}

const useCookieStore = create<CookieState>((set) => ({
  csrfToken: null,
  sessionToken: null,
  userId: null,
  setCsrfToken: (token) => set({ csrfToken: token }),
  setSessionToken: (token) => set({ sessionToken: token }),
  setUserId: (id) => set({ userId: id }),
  clearTokens: () => set({ csrfToken: null, sessionToken: null, userId: null }),
}));

export default useCookieStore;
