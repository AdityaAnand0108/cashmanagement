import axios from 'axios';

const API_URL = 'http://localhost:8080/api/ai/insights';

const analyze = async (query: string): Promise<string> => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token found. Please login.');
  }

  try {
    const response = await axios.post(`${API_URL}/analyze`, 
        { query }, 
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.response;
  } catch (error) {
     if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
            throw new Error('Session expired or unauthorized. Please login again.');
        }
        throw new Error(`Error: ${error.response?.statusText || 'Unknown error'}`);
     }
    console.error('Error getting AI insights:', error);
    throw error;
  }
};

const AiInsightService = {
  analyze,
};

export default AiInsightService;
