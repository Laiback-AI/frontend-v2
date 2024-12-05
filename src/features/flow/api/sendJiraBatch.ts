import axios from 'axios';
import { getHeaders } from '@/features/shared/api/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

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
