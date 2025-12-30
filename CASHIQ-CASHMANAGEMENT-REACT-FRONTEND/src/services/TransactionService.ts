import axios from 'axios';
import type { TransactionDTO } from '../models/Transaction';

const BASE_URL = 'http://localhost:8080';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

/**
 * Handles authentication errors.
 * @param error The error to handle.
 */
const handleAuthError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
        // Optional: Redirect or just throw
         throw new Error('Unauthorized. Please login.');
    }
    throw error;
};

/**
 * Adds a transaction for a user.
 * @param transaction The transaction data to add.
 * @returns A promise that resolves to a string.
 */
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

/**
 * Gets all transactions for a user.
 * @returns A promise that resolves to an array of TransactionDTO.
 */
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

/**
 * Updates an existing transaction.
 * @param transaction The transaction data to update.
 * @returns A promise that resolves to a string.
 */
const updateTransaction = async (transaction: TransactionDTO): Promise<string> => {
    try {
        const response = await axios.put(`${BASE_URL}/update-transaction`, transaction, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Error updating transaction:', error);
        handleAuthError(error);
        throw error;
    }
}

/**
 * Deletes a transaction by ID.
 * @param id The ID of the transaction to delete.
 * @returns A promise that resolves to a string.
 */
const deleteTransaction = async (id: number): Promise<string> => {
    try {
        const response = await axios.delete(`${BASE_URL}/delete-transaction/${id}`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Error deleting transaction:', error);
        handleAuthError(error);
        throw error;
    }
};

/**
 * TransactionService class for handling transaction operations.
 */
const TransactionService = {
    addTransaction,
    getAllTransactions,
    updateTransaction,
    deleteTransaction,
};

export default TransactionService;
