// src/components/chat/ChatHistory.tsx
import { useEffect, useRef } from 'react';
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../../types/chatTypes';

interface ChatHistoryProps {
    chatHistory: ChatMessage[];
}

const ChatHistory = ({ chatHistory }: ChatHistoryProps) => {
    // Ref for scrolling
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    // Scroll to the bottom of the chat
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <ScrollShadow
            className="w-full"
            style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '20px' }}
            hideScrollBar
            ref={chatContainerRef} // Attach ref to ScrollShadow for scrolling
        >
            <div style={{ padding: '10px', borderRadius: '8px' }}>
                {chatHistory.map((chat, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        {/* User's question bubble */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <div style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', borderRadius: '15px', maxWidth: '70%', marginBottom: '5px' }}>
                                {chat.question}
                            </div>
                        </div>
                        {/* System's answer bubble */}
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <div style={{ backgroundColor: '#f0f0f0', color: '#000', padding: '10px', borderRadius: '15px', maxWidth: '70%' }}>
                                <ReactMarkdown>{chat.answer}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Dummy div to maintain scroll position */}
                <div ref={chatContainerRef} />
            </div>
        </ScrollShadow>
    );
};

export default ChatHistory;
