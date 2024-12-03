'use client';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Chip,
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Link,
    User,
} from '@nextui-org/react';
import { useState } from 'react';

interface Project {
    id: number;
    title: string;
    description: string;
    status: 'active' | 'completed' | 'on-hold';
    owner: string;
    progress: number;
    deadline: string;
}

const dummyProjects: Project[] = [
    {
        id: 1,
        title: 'Website Redesign',
        description: 'Complete overhaul of company website',
        status: 'active',
        owner: 'John Doe',
        progress: 75,
        deadline: '2024-06-30',
    },
    {
        id: 2,
        title: 'Mobile App Development',
        description: 'New mobile application for clients',
        status: 'on-hold',
        owner: 'Jane Smith',
        progress: 30,
        deadline: '2024-08-15',
    },
    {
        id: 3,
        title: 'Database Migration',
        description: 'Migrate from MySQL to PostgreSQL',
        status: 'completed',
        owner: 'Bob Wilson',
        progress: 100,
        deadline: '2024-05-01',
    },
];

const statusColorMap = {
    active: 'success',
    completed: 'primary',
    'on-hold': 'warning',
};

export default function ProjectsPage() {
    const [projects] = useState<Project[]>(dummyProjects);

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Projects</h1>
                <Link href="/createbatch">
                    <Button color="primary">New Project</Button>
                </Link>
            </div>

            <div className="grid gap-4">
                <Table aria-label="Projects table">
                    <TableHeader>
                        <TableColumn>PROJECT</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                        <TableColumn>OWNER</TableColumn>
                        <TableColumn>PROGRESS</TableColumn>
                        <TableColumn>DEADLINE</TableColumn>
                        <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">
                                            {project.title}
                                        </p>
                                        <p className="text-small text-default-500">
                                            {project.description}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        color={
                                            statusColorMap[
                                                project.status
                                            ] as any
                                        }
                                        size="sm"
                                        variant="flat"
                                    >
                                        {project.status}
                                    </Chip>
                                </TableCell>
                                <TableCell>
                                    <User
                                        name={project.owner}
                                        avatarProps={{
                                            src: `https://i.pravatar.cc/150?u=${project.owner}`,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{project.progress}%</TableCell>
                                <TableCell>{project.deadline}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="bordered">
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            color="danger"
                                            variant="flat"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
