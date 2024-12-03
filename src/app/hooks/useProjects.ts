import { useState, useEffect } from 'react';
import {
    Project,
    ProjectService,
} from '../../services/projects/project.service';
import { useAuth } from '../hooks/useAuth';

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        fetchProjects();
    }, [token]);

    const fetchProjects = async () => {
        if (!token) {
            setError('No authentication token available');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const projectService = new ProjectService(token);
            const fetchedProjects = await projectService.getProjects();
            setProjects(fetchedProjects);
            setError(null);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to fetch projects'
            );
        } finally {
            setLoading(false);
        }
    };

    return { projects, loading, error, refetch: fetchProjects };
}
