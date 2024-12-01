"use client";

import React, { ReactNode, useState } from 'react';
import { Textarea, Spacer, Button, Spinner } from '@nextui-org/react';

interface ChatInputProps {
    onSubmit: (question: string) => Promise<void>;
    loading: boolean;
    errorMessage: string | null;
    loadingMessage: ReactNode; // Change from string to ReactNode
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, loading, errorMessage, loadingMessage }) => {
    const [question, setQuestion] = useState('');

    const handleAskQuestion = async () => {
        if (question.trim()) {
            await onSubmit(question);
            setQuestion(''); // Clear input on successful submission
        }
    };

    return (
        <div>
            <Textarea
                placeholder="Escriu la teva pregunta..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                fullWidth
                isInvalid={!!errorMessage} // Show error style if errorMessage exists
                errorMessage={errorMessage} // Show the error message
            />
            <Spacer y={1} />
            {/* Ask button with dynamic spinner and loading text */}
            <Button color="primary" onPress={handleAskQuestion} disabled={loading} fullWidth>
                {loading ? (
                    <>
                        <Spinner color='white' size="sm" />
                        &nbsp; {loadingMessage}
                    </>
                ) : 'Preguntar'}
            </Button>
        </div>
    );
};

export default ChatInput;
