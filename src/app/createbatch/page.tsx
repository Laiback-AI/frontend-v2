'use client';

import { useState } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Input,
    Textarea,
    Divider,
} from '@nextui-org/react';
import { Pagination } from '@nextui-org/pagination';
import { useRouter } from 'next/navigation';
import { QuestionService } from '../../features/flow/services/generateQuestionsService';

export default function FlowPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [projectDescription, setProjectDescription] = useState('');
    const [questions, setQuestions] = useState<
        Array<{ id: number; text: string }>
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [settings, setSettings] = useState({});

    const handleStepChange = async (step: number) => {
        if (currentStep === 1 && step === 2) {
            setIsLoading(true);
            setError(null);

            try {
                console.log('Generating questions...');
                const questionService = new QuestionService();
                console.log('Project description:', projectDescription);
                const generatedQuestions =
                    await questionService.getGeneratedQuestions(
                        projectDescription
                    );
                console.log('Generated questions:', generatedQuestions);
                setQuestions(generatedQuestions);
                setCurrentStep(step);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to generate questions'
                );
                return;
            } finally {
                setIsLoading(false);
            }
        } else {
            setCurrentStep(step);
        }
    };

    const handleBackToProjects = () => {
        router.push('/projects');
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="flex flex-col gap-4 min-h-[400px]">
                        <h2 className="text-xl font-semibold">
                            Step 1: Project Description
                        </h2>
                        <Textarea
                            label="Project Description"
                            placeholder="Enter your project description"
                            value={projectDescription}
                            onChange={(e) =>
                                setProjectDescription(e.target.value)
                            }
                            className="flex-grow"
                            minRows={10}
                            maxRows={10}
                            isDisabled={isLoading}
                        />
                        <div className="flex justify-end mt-auto">
                            <Button
                                color="primary"
                                onPress={() => handleStepChange(2)}
                                isLoading={isLoading}
                                isDisabled={
                                    !projectDescription.trim() || isLoading
                                }
                            >
                                {isLoading ? 'Generating Questions...' : 'Next'}
                            </Button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="flex flex-col gap-4 min-h-[400px]">
                        <h2 className="text-xl font-semibold">
                            Step 2: Questions
                        </h2>
                        {error && (
                            <div className="text-red-500 p-3 rounded bg-red-100">
                                {error}
                            </div>
                        )}
                        <div className="flex-grow">
                            {questions.map((question) => (
                                <div key={question.id} className="mb-4">
                                    <Textarea
                                        label={question.text}
                                        placeholder="Enter your answer"
                                        className="w-full"
                                        minRows={3}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-auto">
                            <Button
                                variant="flat"
                                onPress={() => handleStepChange(1)}
                            >
                                Back
                            </Button>
                            <Button
                                color="primary"
                                onPress={() => handleStepChange(3)}
                                isDisabled={questions.length === 0}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="flex flex-col gap-4 min-h-[400px]">
                        <h2 className="text-xl font-semibold">
                            Step 3: Settings
                        </h2>
                        <div className="flex-grow">
                            {/* Settings form would go here */}
                        </div>
                        <div className="flex justify-between mt-auto">
                            <Button
                                variant="flat"
                                onPress={() => handleStepChange(2)}
                            >
                                Back
                            </Button>
                            <Button
                                color="success"
                                onPress={() => console.log('Finish')}
                            >
                                Finish
                            </Button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-6">
            <Card className="w-full max-w-3xl h-[600px]">
                <CardHeader className="flex flex-col gap-4 py-4">
                    <Button
                        variant="light"
                        color="primary"
                        onPress={handleBackToProjects}
                        className="text-sm"
                        startContent={
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M15 18l-6-6 6-6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                    >
                        Back to Projects
                    </Button>
                    <Pagination
                        total={3}
                        initialPage={1}
                        page={currentStep}
                        onChange={handleStepChange}
                        showControls={false}
                        size="lg"
                    />
                </CardHeader>
                <Divider />
                <CardBody className="p-6">{renderStepContent()}</CardBody>
            </Card>
        </div>
    );
}
