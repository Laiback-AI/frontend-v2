// jiraService.ts

import axios from 'axios';
import { sendJiraBatch } from '../../api/flow/sendJiraBatch';

interface JiraBatchResponseSuccess {
    success: true;
    message: string;
    epicKey: string;
}

interface JiraBatchResponseError {
    success: false;
    error: string;
    status?: number;
}

type JiraBatchResponse = JiraBatchResponseSuccess | JiraBatchResponseError;

export const createJiraEpicAndTasks = async (
    projectId: string,
    epicId: string,
    jiraEmail: string,
    jiraToken: string,
    jiraBaseUrl: string
): Promise<JiraBatchResponse> => {
    try {
        const response = await sendJiraBatch(
            projectId,
            epicId,
            jiraEmail,
            jiraToken,
            jiraBaseUrl
        );

        // Check if the response status indicates success
        if (response.status === 200) {
            const data = response.data;
            return {
                success: true,
                message: data.message,
                epicKey: data.epic_key,
            };
        } else {
            // Handle unexpected success status codes
            return {
                success: false,
                error: `Unexpected status code: ${response.status}`,
                status: response.status,
            };
        }
    } catch (error) {
        // Handle error responses
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // Server responded with a non-2xx status code
                return {
                    success: false,
                    error: error.response.data.error || 'Server Error',
                    status: error.response.status,
                };
            } else if (error.request) {
                // No response received from server
                return {
                    success: false,
                    error: 'No response received from server',
                };
            } else {
                // Error setting up the request
                return {
                    success: false,
                    error: error.message,
                };
            }
        } else {
            // Non-Axios error occurred
            return {
                success: false,
                error: 'An unexpected error occurred',
            };
        }
    }
};
