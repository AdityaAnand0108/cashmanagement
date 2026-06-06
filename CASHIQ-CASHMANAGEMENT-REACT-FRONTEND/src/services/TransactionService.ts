import api from '../utils/AxiosConfig';
import type { TransactionDTO } from '../models/Transaction';

/**
 * TransactionService handles all CRUD operations for transactions.
 * Uses the shared `api` instance so JWT auth and 401 handling are automatic.
 */

/**
 * Adds a new transaction for the currently authenticated user.
 * @param transaction - The transaction data to save.
 * @returns A confirmation message from the server.
 */
const addTransaction = async (transaction: TransactionDTO): Promise<string> => {
    const response = await api.post('/add-transaction', transaction);
    return response.data;
};

/**
 * Retrieves all transactions for the currently authenticated user.
 * @returns An array of TransactionDTO objects.
 */
const getAllTransactions = async (): Promise<TransactionDTO[]> => {
    const response = await api.get('/get-all-transaction');
    return response.data;
};

/**
 * Updates an existing transaction.
 * The transaction ID must be included in the TransactionDTO.
 * @param transaction - The updated transaction data.
 * @returns A confirmation message from the server.
 */
const updateTransaction = async (transaction: TransactionDTO): Promise<string> => {
    const response = await api.put('/update-transaction', transaction);
    return response.data;
};

/**
 * Deletes a transaction by its ID.
 * @param id - The ID of the transaction to delete.
 * @returns A confirmation message from the server.
 */
const deleteTransaction = async (id: number): Promise<string> => {
    const response = await api.delete(`/delete-transaction/${id}`);
    return response.data;
};

const TransactionService = {
    addTransaction,
    getAllTransactions,
    updateTransaction,
    deleteTransaction,
};

export default TransactionService;
