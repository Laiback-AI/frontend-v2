"use client";

import { useState, useEffect } from 'react';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import LoadingMessages from './LoadingMessages';
import { fetchChatAnswerService } from '../../services/chat/chatService';
import { useChatStore } from '../../state/stores/chatStore';
import { ChatMessage } from '../../types/chatTypes';

const ChatComponent = ({ tenderId }: { tenderId: string }) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Use Zustand store
    const { addMessage, getConversation } = useChatStore();
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

    // Initialize chat history from Zustand only on client-side
    useEffect(() => {
        setChatHistory(getConversation(tenderId));
    }, [tenderId, getConversation]);

    const handleAskQuestion = async (question: string) => {
        setErrorMessage(null);
        setLoading(true);
        try {
            const response = await fetchChatAnswerService(question); // Use the service function
            const answer = response.answer;
            addMessage(tenderId, question, answer); // Store in chat history

            // Update local chat history
            setChatHistory((prev) => [...prev, { question, answer }]);
        } catch (error) {
            setErrorMessage('No s’ha pogut obtenir la resposta.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Chat history */}
            <ChatHistory chatHistory={chatHistory} />

            {/* Input for the question with error handling */}
            <ChatInput 
                onSubmit={handleAskQuestion} 
                loading={loading} 
                errorMessage={errorMessage} 
                loadingMessage={<LoadingMessages />} 
            />
        </div>
    );
};

export default ChatComponent;
