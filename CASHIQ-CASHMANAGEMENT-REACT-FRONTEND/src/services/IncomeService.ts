import api from '../utils/AxiosConfig';
import type { IncomeDTO } from '../models/Income';

/**
 * IncomeService handles all CRUD operations for income sources.
 * Uses the shared `api` instance so JWT auth and 401 handling are automatic.
 */

/**
 * Adds a new income source for the currently authenticated user.
 * @param income - The income data to save.
 * @returns A confirmation message from the server.
 */
const addIncome = async (income: IncomeDTO): Promise<string> => {
    const response = await api.post('/add-income', income);
    return response.data;
};

/**
 * Updates an existing income source.
 * @param id - The ID of the income source to update.
 * @param income - The updated income data.
 * @returns A confirmation message from the server.
 */
const updateIncome = async (id: number, income: IncomeDTO): Promise<string> => {
    const response = await api.put(`/update-income/${id}`, income);
    return response.data;
};

/**
 * Retrieves all income sources for the currently authenticated user.
 * @returns An array of IncomeDTO objects.
 */
const getAllIncomes = async (): Promise<IncomeDTO[]> => {
    const response = await api.get('/get-all-income');
    return response.data;
};

/**
 * Deletes an income source by its ID.
 * @param id - The ID of the income source to delete.
 * @returns A confirmation message from the server.
 */
const deleteIncome = async (id: number): Promise<string> => {
    const response = await api.delete(`/delete-income/${id}`);
    return response.data;
};

const IncomeService = {
    addIncome,
    updateIncome,
    getAllIncomes,
    deleteIncome,
};

export default IncomeService;
