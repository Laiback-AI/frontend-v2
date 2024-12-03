// services/epicTaskService.ts

import axios, { AxiosError } from 'axios';
import { generateEpicsAndTasksBatch } from '../../api/flow/generateBatch';

interface QA {
    question: string;
    answer: string;
}

interface Settings {
    worker_ids: number[];
    time_range: {
        max_hours: number;
        min_hours: number;
    };
    reporter_id: number;
}

interface TaskData {
    task_name: string;
    task_description: string;
    estimated_hours: number;
    assigned_worker_id: number;
}

interface EpicData {
    epic_name: string;
    epic_description: string;
    sections: TaskData[];
}

interface GenerateBatchResponse {
    data: EpicData[];
}

interface GenerateBatchData {
    project_id: number;
    user_explanation: string;
    qa: QA[];
    settings: Settings;
}

interface ErrorResponse {
    error: string;
}

/**
 * Service to process the generation of epics and tasks batch.
 *
 * @param data - The request data required by the API.
 * @returns A promise that resolves with the list of generated epics and tasks.
 */
export const processEpicsAndTasksBatch = async (
    data: GenerateBatchData
): Promise<EpicData[]> => {
    try {
        const response = await generateEpicsAndTasksBatch(data);
        const batchData: EpicData[] = response.data;

        // You can add any additional processing of batchData here if needed
        return batchData;
    } catch (error) {
        // Handle Axios errors
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            if (axiosError.response) {
                // Server responded with a status code out of the range of 2xx
                console.error('Server Error:', axiosError.response.data);
                throw new Error(
                    (axiosError.response.data as ErrorResponse)?.error ||
                        'An error occurred while generating epics and tasks.'
                );
            } else if (axiosError.request) {
                // No response received
                console.error('No response received:', axiosError.request);
                throw new Error('No response received from the server.');
            } else {
                // Error setting up the request
                console.error('Request Error:', axiosError.message);
                throw new Error(axiosError.message);
            }
        } else {
            // Non-Axios errors
            console.error('Unexpected Error:', error);
            throw new Error('An unexpected error occurred.');
        }
    }
};
