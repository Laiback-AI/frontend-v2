import { getHeaders } from '../../shared/api/headers';  

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';


const API_URL = `${API_BASE_URL}/api/v1/backlog`;

/**
 * Generate project questions based on user explanation and optional concept
 * @param userExplanation - User's project description
 * @param concept - Optional concept to guide question generation
 * @returns Generated questions and related data
 */
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
