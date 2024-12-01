// services/chatService.ts

import { getChatAnswer } from '../../api/chat';

export const fetchChatAnswerService = async (question: string) => {
  try {
    const response = await getChatAnswer(question);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch chat answer');
  }
};
