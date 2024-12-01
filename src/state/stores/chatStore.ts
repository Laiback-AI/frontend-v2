// state/stores/chatStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatMessage {
    question: string;
    answer: string;
}

interface ChatState {
    conversations: Record<string, ChatMessage[]>; // Store conversations by tender ID
    addMessage: (tenderId: string, question: string, answer: string) => void;
    getConversation: (tenderId: string) => ChatMessage[]; // Getter for conversation
}

export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            conversations: {},
            addMessage: (tenderId, question, answer) => {
                set((state) => {
                    const tenderConversations = state.conversations[tenderId] || [];
                    console.log(`Adding message to tenderId: ${tenderId}`, { question, answer });
                    return {
                        conversations: {
                            ...state.conversations,
                            [tenderId]: [...tenderConversations, { question, answer }],
                        },
                    };
                });
            },
            getConversation: (tenderId) => {
                const conversation = get().conversations[tenderId] || [];
                console.log(`Getting conversation for tenderId: ${tenderId}`, conversation);
                return conversation;
            },
        }),
        {
            name: 'chat-storage', // Unique name for storage
            partialize: (state) => ({ conversations: state.conversations }), // Only persist conversations
        }
    )
);
