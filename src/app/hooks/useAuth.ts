import useSessionStore from '../../state/stores/sessionStore';

export function useAuth() {
  const { userId, isAuthenticated, logout } = useSessionStore();
  return { userId, isAuthenticated, logout };
}
