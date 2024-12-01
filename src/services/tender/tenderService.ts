import { getTendersMock } from '../../api/tender';
import axios from 'axios';

// Function to fetch tenders using mock data
export const fetchTenders = async () => {
  try {
    return await getTendersMock();
  } catch (error) {
    throw new Error('Failed to fetch tenders');
  }
};

// Function to fetch a specific tender by ID using the API
export const fetchTenderByIdService = async (id: string) => {
  try {
    const response = await axios.get(`/tender/${id}`); // Call the mock or actual API endpoint
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tender by ID');
  }
};
