import axios from 'axios';
import { getHeaders } from '@/features/shared/api/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

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
