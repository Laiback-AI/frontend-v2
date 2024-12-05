// // jiraService.ts

// import { postJiraProjects } from '../../api/flow/getJiraProjects';
// import { AxiosError } from 'axios';

// // Add this interface at the top of the file
// interface JiraErrorResponse {
//     error: string;
// }

// /**
//  * Synchronizes Jira projects by calling the postJiraProjects API function.
//  *
//  * @param jiraEmail - The email associated with the Jira account.
//  * @param jiraToken - The API token for authenticating with Jira.
//  * @param jiraUrl - The base URL of the Jira instance (optional).
//  * @returns A promise that resolves to a success message or throws an error.
//  */
// export const synchronizeJiraProjects = async (
//     jiraEmail: string,
//     jiraToken: string,
//     jiraUrl: string
// ): Promise<string> => {
//     try {
//         const response = await postJiraProjects(jiraEmail, jiraToken, jiraUrl);
//         if (response.status === 200) {
//             // Successfully synchronized projects
//             return response.data.message;
//         } else {
//             // Handle unexpected status codes
//             throw new Error(`Unexpected response status: ${response.status}`);
//         }
//     } catch (error) {
//         // Handle errors from the API call
//         if ((error as AxiosError).response) {
//             const axiosError = error as AxiosError;
//             const statusCode = axiosError.response?.status;
//             const errorMessage =
//                 (axiosError.response?.data as JiraErrorResponse)?.error ||
//                 'An error occurred';

//             // You can customize error handling based on status codes
//             switch (statusCode) {
//                 case 400:
//                     throw new Error(`Bad Request: ${errorMessage}`);
//                 case 500:
//                     throw new Error(`Server Error: ${errorMessage}`);
//                 default:
//                     throw new Error(`Error ${statusCode}: ${errorMessage}`);
//             }
//         } else if ((error as AxiosError).request) {
//             // No response received from the server
//             throw new Error('No response received from the server.');
//         } else {
//             // Other errors
//             throw new Error(`Error: ${(error as Error).message}`);
//         }
//     }
// };
