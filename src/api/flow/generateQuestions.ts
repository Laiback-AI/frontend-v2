import { API_BASE_URL } from '../../config';
import { useCookieStore } from '@/state/stores/cookies';
import { useAuthStore } from '@/state/stores/authStore';

const getHeaders = () => {
    const { csrfToken } = useCookieStore.getState();
    const token = useAuthStore.getState().getToken();
    
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    };

    if (csrfToken) headers['X-CSRF-TOKEN'] = csrfToken;
    if (token) headers['Authorization'] = `Bearer ${token}`;

    return headers;
};

const API_URL = `${API_BASE_URL}/api/v1/backlog`;

export const generateProjectQuestions = async (
    userExplanation: string,
    concept?: string
) => {
    try {
        const response = await fetch(`${API_URL}/generate-questions/`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
                user_explanation: userExplanation,
                concept: concept || 'software company',
            }),
            credentials: 'include', // Important for CSRF
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server Error:', errorData);
            throw new Error(errorData.message || 'Request failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Request Error:', error);
        throw error;
    }
};