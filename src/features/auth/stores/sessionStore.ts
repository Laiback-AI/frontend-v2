import { create } from 'zustand';

interface User {
    id: number;
    email: string;
    name: string;
    surname: string;
    account_name: string;
}

interface SessionState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const useSessionStore = create<SessionState>((set) => ({
    token: null,
    user: null,
    isAuthenticated: false,
    login: (token, user) => set({ token, user, isAuthenticated: true }),
    logout: () => set({ token: null, user: null, isAuthenticated: false }),
}));

export default useSessionStore;
