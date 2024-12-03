import create from 'zustand';

type CookieState = {
    csrfToken: string | null;
    sessionToken: string | null;
    userId: string | null;
    setCsrfToken: (token: string) => void;
    setSessionToken: (token: string) => void;
    setUserId: (id: string) => void;
    clearSession: () => void;
};

export const useCookieStore = create<CookieState>((set) => ({
    csrfToken: null,
    sessionToken: null,
    userId: null,
    setCsrfToken: (token) => set({ csrfToken: token }),
    setSessionToken: (token) => set({ sessionToken: token }),
    setUserId: (id) => set({ userId: id }),
    clearSession: () => set({ csrfToken: null, sessionToken: null, userId: null }),
}));
