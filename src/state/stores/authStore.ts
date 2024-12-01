import { create } from 'zustand';
import { User } from '../../types/authTypes' // Import the shared User type

// Define the authentication state
interface AuthState {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

// Create the store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null });
  },
}));
