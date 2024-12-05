import { create } from 'zustand';
import { User } from '../types/authTypes';

// For Zustand: Managing UI state and user data
interface SessionState {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (token: string, user: User) => {
    localStorage.setItem('sessionToken', token);
    localStorage.setItem('userId', user.id.toString());
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('userId');
    set({ user: null, isAuthenticated: false });
  }
}));

export default useSessionStore;
