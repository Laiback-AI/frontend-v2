// CREATE NEW FILE: src/api/projects.api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

/**
 * API response types
 */
export interface ProjectResponse {
    id: number;
    name: string;
    description: string;
    // Add other fields from your API response
}

/**
 * Base API call function for projects
 */
export async function fetchProjectsApi(
    token: string
): Promise<ProjectResponse[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/projects/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}
