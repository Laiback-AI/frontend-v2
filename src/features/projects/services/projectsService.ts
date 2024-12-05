// // CREATE NEW FILE: src/services/project.service.ts
// import { fetchProjectsApi, ProjectResponse } from '@/api/projects.api';

// /**
//  * Transformed Project type for frontend use
//  */
// export interface Project {
//     id: string;
//     key: string;
//     name: string;
//     description: string;
//     status: string;
//     lastUpdated: string;
// }

// /**
//  * Service class for handling project-related operations
//  */
// export class ProjectService {
//     private token: string;

//     constructor(token: string) {
//         this.token = token;
//     }

//     /**
//      * Transforms API response to frontend Project type
//      */
//     private transformProject(apiProject: ProjectResponse): Project {
//         return {
//             id: apiProject.id.toString(),
//             key: `PRJ-${apiProject.id}`,
//             name: apiProject.name,
//             description: apiProject.description,
//             status: 'active',
//             lastUpdated: new Date().toISOString(),
//         };
//     }

//     /**
//      * Fetches and transforms projects
//      */
//     async getProjects(): Promise<Project[]> {
//         try {
//             const apiProjects = await fetchProjectsApi(this.token);
//             return apiProjects.map(this.transformProject);
//         } catch (error) {
//             console.error('ProjectService - Error fetching projects:', error);
//             throw error;
//         }
//     }
// }
