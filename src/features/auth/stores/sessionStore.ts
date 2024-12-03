import create from 'zustand';
import { persist } from 'zustand/middleware';

type SessionState = {
  userId: string | null;
  isAuthenticated: boolean;
  sessionToken: string | null;
  setUserId: (id: string) => void;
  setSessionToken: (token: string) => void;
  logout: () => void;
};

const useSessionStore = create<SessionState>(
  persist(
    (set) => ({
      userId: null,
      isAuthenticated: false,
      sessionToken: null,
      setUserId: (id: string) => set({ userId: id, isAuthenticated: true }),
      setSessionToken: (token: string) => set({ sessionToken: token }),
      logout: () => set({ userId: null, isAuthenticated: false, sessionToken: null }),
    }),
    {
      name: 'session-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useSessionStore;
