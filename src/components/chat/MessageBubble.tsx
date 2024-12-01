"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
    message: string;
    isUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser }) => {
    return (
        <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
            <div style={{
                backgroundColor: isUser ? '#007bff' : '#f0f0f0',
                color: isUser ? '#fff' : '#000',
                padding: '10px',
                borderRadius: '15px',
                maxWidth: '70%',
                marginBottom: '5px'
            }}>
                <ReactMarkdown>{message}</ReactMarkdown>
            </div>
        </div>
    );
};

export default MessageBubble;
