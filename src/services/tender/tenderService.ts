import axios from 'axios';

export const fetchTenderByIdService = async (id: string) => {
  try {
    const response = await axios.get(`/tender/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tender by ID');
  }
};
