import api from '../utils/AxiosConfig';
import type { ExpenseAnalysisResponse } from '../models/Expense';

/**
 * SmartExpenseService sends expense descriptions to the AI categorization endpoint.
 * The backend uses Ollama to classify the expense and suggest a category.
 * Uses the shared `api` instance so JWT auth and 401 handling are automatic.
 */

/**
 * Analyzes a free-text expense description and returns an AI-suggested category and details.
 * @param description - A plain-text description of the expense (e.g. "Netflix subscription").
 * @returns An ExpenseAnalysisResponse with the suggested category and metadata.
 */
const analyzeExpense = async (description: string): Promise<ExpenseAnalysisResponse> => {
    const response = await api.post('/api/expenses/analyze', { description });
    return response.data;
};

const SmartExpenseService = {
    analyzeExpense,
};

export default SmartExpenseService;
