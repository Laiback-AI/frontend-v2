import { create } from 'zustand';
import { User } from '../../types/authTypes' // Import the shared User type

// Define the authentication state
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

// Create the store
export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (token, user) => {
    try {
      console.log('Setting auth state...', { hasToken: !!token, hasUser: !!user });
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({ 
        token, 
        user, 
        isAuthenticated: true 
      });
      
      console.log('Auth state updated:', {
        isAuthenticated: get().isAuthenticated,
        hasToken: !!get().token,
        hasUser: !!get().user
      });
    } catch (error) {
      console.error('Error during login:', error);
    }
  },

  logout: () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ 
      token: null, 
      user: null, 
      isAuthenticated: false // Set to false after logout
    });
    console.log('Auth state cleared after logout');
  } catch (error) {
    console.error('Error clearing auth state:', error);
  }
  },

  checkAuth: () => {
    try { 
      const token = get().token || localStorage.getItem('token');
      
      if (!get().user && localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        set({ user });
      }

      const newIsAuthenticated = !!token;

      if (newIsAuthenticated !== get().isAuthenticated) {
        set({ isAuthenticated: newIsAuthenticated,
          token: token
        });
      }
      
      return newIsAuthenticated;

    } catch (error) {
    console.error('Error checking auth state:', error);
      return false;
    }
  }
}));

export const useAuth = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  return { isAuthenticated };
};