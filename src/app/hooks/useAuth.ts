import useSessionStore from '../../features/auth/stores/sessionStore';
import { getCookie } from '../../features/auth/api/cookies';

export function useAuth() {
    const { user, isAuthenticated, logout } = useSessionStore();
    const token = getCookie('sessionToken');
    return { userId: user?.id, isAuthenticated, logout, token };
}
