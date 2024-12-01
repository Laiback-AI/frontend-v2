import axios from 'axios';

const API_URL = 'http://your-backend-url/api';

export const getTenders = async () => {
  return await axios.get(`${API_URL}/tenders/`);
};

export const getTenderById = async (id: string) => {
  return await axios.get(`${API_URL}/tenders/${id}/`);
};