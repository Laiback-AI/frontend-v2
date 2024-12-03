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

export const postJiraProjects = async (
    jiraEmail: string,
    jiraToken: string,
    jiraUrl?: string
) => {
    return await axios.post(
        `${API_URL}/projects/`,
        {
            jira_email: jiraEmail,
            jira_token: jiraToken,
            jira_url: jiraUrl,
        },
        {
            headers: getHeaders(),
        }
    );
};
