import { create } from 'zustand';
import { User } from '../../types/authTypes' // Import the shared User type

// Define the authentication state
interface AuthState {
  token: string | null;
  userId: number | null;
  accountId: number | null;
  isAuthenticated: boolean;
  setAuthData: (data: { 
    token: string; 
    user_id: number; 
    account_id: number 
  }) => void;
  clearAuth: () => void;
  getToken: () => string | null;
  login: (token: string, userId: number, accountId: number) => void;
}

const getInitialToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Debug helper
const logState = (state: AuthState) => {
  console.log('=== Zustand State Debug ===');
  console.log('Auth Store State:', {
    token: state.token,
    userId: state.userId,
    accountId: state.accountId,
    isAuthenticated: state.isAuthenticated
  });
};

// Create the store
export const useAuthStore = create<AuthState>((set, get) => ({
  token: getInitialToken(),
  userId: null,
  accountId: null,
  isAuthenticated: false,

  setAuthData: (data) => {
    set((state) => {
      const newState = {
        ...state,
        token: data.token,
        userId: data.user_id,
        accountId: data.account_id,
        isAuthenticated: true
      };
      logState(newState);
      return newState;
    });
  },

  login: (token, userId, accountId) => {
    set((state) => {
      const newState = {
        ...state,
        token,
        userId,
        accountId,
        isAuthenticated: true
      };
      logState(newState);
      return newState;
    });
  },

  clearAuth: () => {
    set((state) => {
      const newState = {
        ...state,
        token: null,
        userId: null,
        accountId: null,
        isAuthenticated: false
      };
      logState(newState);
      return newState;
    });
  },

  getToken: () => {
    const state = get();
    console.log('Getting token:', state.token);
    return state.token;
  }
}));

export const useAuth = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  return { isAuthenticated };
};