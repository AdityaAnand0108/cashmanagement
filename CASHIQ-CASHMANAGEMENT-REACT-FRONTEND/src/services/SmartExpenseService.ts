import axios from 'axios';
import type { ExpenseAnalysisResponse } from '../models/Expense';

const API_URL = 'http://localhost:8080/api/expenses';

const analyzeExpense = async (description: string): Promise<ExpenseAnalysisResponse> => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token found. Please login.');
  }

  try {
    const response = await axios.post(`${API_URL}/analyze`, 
        { description }, 
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
     if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
            throw new Error('Session expired or unauthorized. Please login again.');
        }
        throw new Error(`Error: ${error.response?.statusText || 'Unknown error'}`);
     }
    console.error('Error analyzing expense:', error);
    throw error;
  }
};

const SmartExpenseService = {
  analyzeExpense,
};

export default SmartExpenseService;
