// questionService.ts

import axios from 'axios';
import { generateProjectQuestions } from '../../api/flow/generateQuestions'; // Adjust the import path accordingly

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
        try {
        const response = await generateProjectQuestions(userExplanation, concept);
        const questions: Question[] = response.data.questions;
        return questions;
        } catch (error) {
        // Check if the error is an Axios error
        if (axios.isAxiosError(error)) {
            // Handle different error responses
            if (error.response) {
            // Server responded with a status code outside the 2xx range
            const statusCode = error.response.status;
            const errorMessage = error.response.data.error || 'An error occurred.';
            throw new ServiceError(errorMessage, statusCode);
            } else if (error.request) {
            // Request was made but no response was received
            throw new ServiceError('No response received from the server.');
            } else {
            // Something happened while setting up the request
            throw new ServiceError('Error setting up the request.');
            }
        } else {
            // Non-Axios error occurred
            throw new ServiceError('An unexpected error occurred.');
        }
        }
    }
}
