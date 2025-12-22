import axios from 'axios';
import type { TransactionDTO } from '../models/Transaction';

const BASE_URL = 'http://localhost:8080';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const handleAuthError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
        // Optional: Redirect or just throw
         throw new Error('Unauthorized. Please login.');
    }
    throw error;
};

const addTransaction = async (transaction: TransactionDTO): Promise<string> => {
    try {
        const response = await axios.post(`${BASE_URL}/add-transaction`, transaction, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Error adding transaction:', error);
        handleAuthError(error);
        throw error;
    }
};

const getAllTransactions = async (): Promise<TransactionDTO[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/get-all-transaction`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        handleAuthError(error);
        throw error;
    }
};

const TransactionService = {
    addTransaction,
    getAllTransactions,
};

export default TransactionService;
