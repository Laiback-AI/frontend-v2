import axios from 'axios';

const API_URL = 'https://13.38.44.130'; // Replace with your backend URL

// Real API Calls

// Fetch chat answer
export const getChatAnswer = async (question: string) => {
    return await axios.get(`${API_URL}/tender_chat/`, {
        params: { question: question },
    });
};
