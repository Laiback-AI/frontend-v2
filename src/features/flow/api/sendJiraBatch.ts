import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { useCookieStore } from '@/state/stores/cookies';

const getHeaders = () => {
    const { csrfToken } = useCookieStore.getState();
    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(csrfToken && { 'X-CSRFToken': csrfToken }),
    };
};

const API_URL = `${API_BASE_URL}/api/v1/jira`;

export const sendJiraBatch = async (
    projectId: string,
    epicId: string,
    jiraEmail: string,
    jiraToken: string,
    jiraBaseUrl: string
) => {
    return await axios.post(
        `${API_URL}/batch/`,
        {
            project_id: projectId,
            epic_id: epicId,
            jira_email: jiraEmail,
            jira_token: jiraToken,
            jira_base_url: jiraBaseUrl,
        },
        {
            headers: getHeaders(),
        }
    );
};
