import axios from 'axios';

const API_URL = 'http://your-backend-url/api'; // Replace with your Django backend URL

// Real API Calls

// Fetch the list of tenders
export const getTenders = async () => {
  return await axios.get(`${API_URL}/tenders/`);
};

// Fetch a specific tender by ID
export const getTenderById = async (id: string) => {
  return await axios.get(`${API_URL}/tenders/${id}/`);
};

// Mock API Calls

// Mock function to fetch the list of tenders
export const getTendersMock = async () => {
  return [
    { "id": 1, "title": "Mock Tender 1", "description": "This is mock tender 1" },
    { "id": 2, "title": "Mock Tender 2", "description": "This is mock tender 2" },
    { "id": 3, "title": "Mock Tender 3", "description": "This is mock tender 3" },
    { "id": 4, "title": "Mock Tender 4", "description": "This is mock tender 4" },
    { "id": 5, "title": "Mock Tender 5", "description": "This is mock tender 5" },
    { "id": 6, "title": "Mock Tender 6", "description": "This is mock tender 6" },
    { "id": 7, "title": "Mock Tender 7", "description": "This is mock tender 7" },
    { "id": 8, "title": "Mock Tender 8", "description": "This is mock tender 8" },
    { "id": 9, "title": "Mock Tender 9", "description": "This is mock tender 9" },
    { "id": 10, "title": "Mock Tender 10", "description": "This is mock tender 10" },
    { "id": 11, "title": "Mock Tender 11", "description": "This is mock tender 11" },
    { "id": 12, "title": "Mock Tender 12", "description": "This is mock tender 12" },
    { "id": 13, "title": "Mock Tender 13", "description": "This is mock tender 13" },
    { "id": 14, "title": "Mock Tender 14", "description": "This is mock tender 14" },
    { "id": 15, "title": "Mock Tender 15", "description": "This is mock tender 15" }
];
};

// Mock function to fetch a specific tender by ID
export const getTenderByIdMock = async (id: string) => {
  return { id, title: `Mock Tender ${id}`, description: `This is mock tender ${id}` };
};