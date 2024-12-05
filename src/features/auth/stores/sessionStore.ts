import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/authTypes';

// For Zustand: Managing UI state and user data
interface SessionState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
}

const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'session-storage',
    }
  )
);

export default useSessionStore;
