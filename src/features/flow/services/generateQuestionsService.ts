// questionService.ts

import axios from 'axios';
import { generateProjectQuestions } from '../../flow/api/generateQuestions';
import { withCsrfToken } from '../../auth/services/cookiesService';

// Define the structure of a question (adjust fields as necessary)
interface Question {
    id: number;
    text: string;
    // Add other fields if necessary
}

// Define a custom error type for better error handling
class ServiceError extends Error {
    statusCode?: number;
    constructor(message: string, statusCode?: number) {
        super(message);
        this.name = 'ServiceError';
        this.statusCode = statusCode;
    }
}

export class QuestionService {
    /**
     * Generates questions based on a project description and an optional concept.
     *
     * @param userExplanation - The project description provided by the user.
     * @param concept - (Optional) A specific concept to focus the questions on.
     * @returns A promise that resolves to an array of questions.
     * @throws ServiceError if the API request fails or returns an error response.
     */
    public async getGeneratedQuestions(
        userExplanation: string,
        concept?: string
    ): Promise<Question[]> {
        return withCsrfToken(async () => {
            console.log('Generating questions service...');
            try {
                const response = await generateProjectQuestions(
                    userExplanation,
                    concept
                );
                const questions: Question[] = response.data.questions;
                return questions;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        const statusCode = error.response.status;
                        const errorMessage =
                            error.response.data.error || 'An error occurred.';
                        throw new ServiceError(errorMessage, statusCode);
                    } else if (error.request) {
                        throw new ServiceError(
                            'No response received from the server.'
                        );
                    } else {
                        throw new ServiceError('Error setting up the request.');
                    }
                } else {
                    throw new ServiceError('An unexpected error occurred.');
                }
            }
        });
    }
}
