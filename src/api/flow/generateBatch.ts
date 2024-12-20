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

/**
 * Generate a batch of epics and tasks based on provided data including worker assignments and configurations.
 *
 * @param data - The request data containing:
 *   - project_id: Project identifier
 *   - user_explanation: Detailed explanation text
 *   - qa: List of Q&A pairs
 *   - settings: Configuration including worker_ids, time_range, and reporter_id
 *
 * @returns Response with the list of generated epics and tasks
 */
export const generateEpicsAndTasksBatch = async (
    data: {
    project_id: number;
    user_explanation: string;
    qa: QA[];
    settings: Settings;
    }
) => {
    return await axios.post(`${API_URL}/generate-batch/`,
    data,
    {
        headers: getHeaders(),
    }
    );
};
