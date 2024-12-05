// // CREATE NEW FILE: src/components/ProjectGrid.tsx
// import {
//     Card,
//     CardHeader,
//     CardBody,
//     CardFooter,
//     Button,
//     Chip,
//     Spinner,
//     Link,
//     Divider,
// } from '@nextui-org/react';
// import { Project } from '@/services/project.service';

// interface ProjectGridProps {
//     projects: Project[];
//     isLoading?: boolean;
// }

// export default function ProjectGrid({ projects, isLoading }: ProjectGridProps) {
//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center min-h-[50vh]">
//                 <Spinner size="lg" color="primary" />
//             </div>
//         );
//     }

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//             {projects.map((project) => (
//                 <Card
//                     key={project.id}
//                     className="max-w-[400px]"
//                     shadow="sm"
//                     isPressable
//                     onPress={() =>
//                         window.open(`/projects/${project.id}`, '_blank')
//                     }
//                 >
//                     <CardHeader className="flex flex-col items-start px-4 pt-4 pb-0">
//                         <Chip
//                             className="mb-2"
//                             color={getStatusColor(project.status)}
//                             size="sm"
//                             variant="flat"
//                         >
//                             {project.status}
//                         </Chip>
//                         <h4 className="text-large font-bold">{project.name}</h4>
//                         <p className="text-small text-default-500">
//                             {project.key}
//                         </p>
//                     </CardHeader>
//                     <Divider className="my-2" />
//                     <CardBody className="px-4 py-2">
//                         <p className="text-small text-default-600">
//                             {project.description || 'No description available'}
//                         </p>
//                     </CardBody>
//                     <CardFooter className="px-4 pt-2 pb-4 flex justify-between">
//                         <p className="text-tiny text-default-400">
//                             Updated:{' '}
//                             {new Date(project.lastUpdated).toLocaleDateString()}
//                         </p>
//                         <Button
//                             as={Link}
//                             href={`/projects/${project.id}`}
//                             size="sm"
//                             color="primary"
//                             variant="flat"
//                             target="_blank"
//                         >
//                             View Details
//                         </Button>
//                     </CardFooter>
//                 </Card>
//             ))}
//         </div>
//     );
// }

// // Helper function to determine status color
// function getStatusColor(
//     status: string
// ): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' {
//     switch (status.toLowerCase()) {
//         case 'active':
//             return 'success';
//         case 'completed':
//             return 'primary';
//         case 'on hold':
//             return 'warning';
//         case 'cancelled':
//             return 'danger';
//         default:
//             return 'default';
//     }
// }
