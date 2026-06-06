import api from '../utils/AxiosConfig';
import type { BudgetDTO } from '../models/Budget';

/**
 * BudgetService handles all CRUD operations for budget caps.
 * Uses the shared `api` instance so JWT auth and 401 handling are automatic.
 */
class BudgetService {

    /**
     * Creates a new budget cap for a user.
     * If a budget for the same category already exists it will be overwritten on the server.
     * @param userId - The ID of the user.
     * @param budget - The budget data to save.
     * @returns A confirmation message from the server.
     */
    async addBudget(userId: number, budget: BudgetDTO): Promise<string> {
        const response = await api.post(`/api/budget/add/${userId}`, budget);
        return response.data;
    }

    /**
     * Updates an existing budget cap.
     * @param userId - The ID of the user who owns the budget.
     * @param budgetId - The ID of the budget to update.
     * @param budget - The updated budget data.
     * @returns A confirmation message from the server.
     */
    async updateBudget(userId: number, budgetId: number, budget: BudgetDTO): Promise<string> {
        const response = await api.put(`/api/budget/update/${userId}/${budgetId}`, budget);
        return response.data;
    }

    /**
     * Deletes a budget cap by its ID.
     * @param userId - The ID of the user who owns the budget.
     * @param budgetId - The ID of the budget to delete.
     * @returns A confirmation message from the server.
     */
    async deleteBudget(userId: number, budgetId: number): Promise<string> {
        const response = await api.delete(`/api/budget/delete/${userId}/${budgetId}`);
        return response.data;
    }

    /**
     * Retrieves all budgets for a user, including calculated spend and status.
     * @param userId - The ID of the user.
     * @returns An array of BudgetDTO objects with live spend data.
     */
    async getUserBudgets(userId: number): Promise<BudgetDTO[]> {
        const response = await api.get(`/api/budget/user/${userId}`);
        return response.data;
    }
}

export default new BudgetService();
