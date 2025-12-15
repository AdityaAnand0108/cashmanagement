

const API_URL = 'http://localhost:8080/api/expenses';

interface ExpenseAnalysisResponse {
  status: string;
  parsed_data: {
    amount: number;
    category: string;
    date: string;
    payment_source: string;
  };
}

const analyzeExpense = async (description: string): Promise<ExpenseAnalysisResponse> => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token found. Please login.');
  }

  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ description }),
    });

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error('Session expired or unauthorized. Please login again.');
        }
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing expense:', error);
    throw error;
  }
};

const SmartExpenseService = {
  analyzeExpense,
};

export default SmartExpenseService;
