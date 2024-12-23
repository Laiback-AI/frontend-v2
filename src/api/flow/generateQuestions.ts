import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { useCookieStore } from '@/state/stores/cookies';

const getHeaders = () => {
    const { csrfToken } = useCookieStore.getState();
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(csrfToken && { 'X-CSRFToken': csrfToken }),
    };
};

const API_URL = `${API_BASE_URL}/api/v1/backlog`;

export const generateProjectQuestions = async (
    userExplanation: string,
    concept?: string
) => {
    return await axios.post(`${API_URL}/generate-questions/`,
        {
    user_explanation: userExplanation,
    concept: concept || '',
    },
    {
        headers: getHeaders(),
    });
};