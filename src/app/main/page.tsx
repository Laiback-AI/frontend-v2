// Import necessary NextUI components
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Chip,
    Spinner,
    Link,
    Divider
} from "@nextui-org/react";

// Define TypeScript interfaces for type safety
/**
 * Interface defining the structure of a Project
 * @interface Project
 */
interface Project {
    id: string;          // Unique identifier for the project
    key: string;         // Project key/code
    name: string;        // Project name
    description?: string; // Optional project description
    status: string;      // Project status
    lastUpdated: string; // Last update timestamp
    // Add other relevant fields as needed
}

/**
 * Interface defining the props for the ProjectGrid component
 * @interface ProjectGridProps
 */
interface ProjectGridProps {
    projects: Project[];  // Array of projects to display
    isLoading?: boolean; // Optional loading state indicator
}

/**
 * ProjectGrid Component
 * Displays a responsive grid of project cards
 * @param {ProjectGridProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export default function ProjectGrid({ projects, isLoading }: ProjectGridProps) {
    // Show loading spinner when data is being fetched
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Spinner size="lg" color="primary" />
            </div>
        );
    }

    // Render grid of project cards
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {/* Map through projects array to create individual cards */}
            {projects.map((project) => (
                <Card
                    key={project.id}
                    className="max-w-[400px]"
                    shadow="sm"
                    isPressable // Makes the card clickable
                    onPress={() => window.open(`/projects/${project.id}`, '_blank')}
                >
                    {/* Card Header Section */}
                    <CardHeader className="flex flex-col items-start px-4 pt-4 pb-0">
                        {/* Status Chip */}
                        <Chip
                            className="mb-2"
                            color={getStatusColor(project.status)}
                            size="sm"
                            variant="flat"
                        >
                            {project.status}
                        </Chip>
                        {/* Project Title and Key */}
                        <h4 className="text-large font-bold">{project.name}</h4>
                        <p className="text-small text-default-500">{project.key}</p>
                    </CardHeader>

                    {/* Divider between header and body */}
                    <Divider className="my-2" />

                    {/* Card Body - Project Description */}
                    <CardBody className="px-4 py-2">
                        <p className="text-small text-default-600">
                            {project.description || "No description available"}
                        </p>
                    </CardBody>

                    {/* Card Footer - Last Updated and Action Button */}
                    <CardFooter className="px-4 pt-2 pb-4 flex justify-between">
                        {/* Last Updated Timestamp */}
                        <p className="text-tiny text-default-400">
                            Updated: {new Date(project.lastUpdated).toLocaleDateString()}
                        </p>
                        {/* View Details Button */}
                        <Button
                            as={Link}
                            href={`/projects/${project.id}`}
                            size="sm"
                            color="primary"
                            variant="flat"
                            target="_blank"
                        >
                            View Details
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

/**
 * Helper function to determine the color of the status chip
 * @param {string} status - The project status
 * @returns {"default" | "primary" | "secondary" | "success" | "warning" | "danger"} Color variant for the chip
 */
function getStatusColor(status: string): "default" | "primary" | "secondary" | "success" | "warning" | "danger" {
    switch (status.toLowerCase()) {
        case 'active':
            return 'success';    // Green for active projects
        case 'completed':
            return 'primary';    // Blue for completed projects
        case 'on hold':
            return 'warning';    // Yellow for on-hold projects
        case 'cancelled':
            return 'danger';     // Red for cancelled projects
        default:
            return 'default';    // Gray for unknown status
    }
}