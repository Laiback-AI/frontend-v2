'use client';

import { Card, CardBody, Button } from "@nextui-org/react";

export default function ProjectsPage() {
    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <Card className="max-w-[400px]">
                <CardBody className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Hello World!</h1>
                    <p className="text-default-600 mb-4">
                        Welcome to the Projects Page
                    </p>
                    <Button color="primary">
                        Click Me!
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}