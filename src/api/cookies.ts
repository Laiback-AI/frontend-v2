import axios from 'axios';
import { API_BASE_URL } from '../config';

interface CsrfResponse {
  csrfToken: string;
}

export const fetchCsrfTokenApi = async (): Promise<CsrfResponse> => {
  const response = await axios.get<CsrfResponse>(`${API_BASE_URL}/api/v1/auth/csrf/`, {
    withCredentials: true
  });
  return response.data;
};