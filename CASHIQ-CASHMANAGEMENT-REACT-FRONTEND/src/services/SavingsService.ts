import api from '../utils/AxiosConfig';
import type { SavingGoalDTO } from '../models/SavingGoal';

/**
 * SavingsService handles all CRUD operations for savings goals.
 * Uses the shared `api` instance so JWT auth and 401 handling are automatic.
 */
class SavingsService {

    /**
     * Creates a new savings goal for a user.
     * @param userId - The ID of the user.
     * @param goal - The savings goal data to save.
     * @returns A confirmation message from the server.
     */
    async createGoal(userId: number, goal: SavingGoalDTO): Promise<string> {
        const response = await api.post(`/api/saving-goals/${userId}`, goal);
        return response.data;
    }

    /**
     * Adds funds to an existing savings goal.
     * @param userId - The ID of the user.
     * @param goalId - The ID of the goal to fund.
     * @param amount - The amount to add.
     * @returns A confirmation message from the server.
     */
    async addFunds(userId: number, goalId: number, amount: number): Promise<string> {
        const response = await api.put(`/api/saving-goals/${userId}/${goalId}/add-funds?amount=${amount}`, {});
        return response.data;
    }

    /**
     * Retrieves all savings goals for a user.
     * @param userId - The ID of the user.
     * @returns An array of SavingGoalDTO objects.
     */
    async getUserGoals(userId: number): Promise<SavingGoalDTO[]> {
        const response = await api.get(`/api/saving-goals/${userId}`);
        return response.data;
    }

    /**
     * Deletes a savings goal by its ID.
     * @param userId - The ID of the user who owns the goal.
     * @param goalId - The ID of the goal to delete.
     * @returns A confirmation message from the server.
     */
    async deleteGoal(userId: number, goalId: number): Promise<string> {
        const response = await api.delete(`/api/saving-goals/${userId}/${goalId}`);
        return response.data;
    }

    /**
     * Updates an existing savings goal.
     * Accepts a partial DTO so only changed fields need to be sent.
     * @param userId - The ID of the user who owns the goal.
     * @param goalId - The ID of the goal to update.
     * @param goal - The fields to update.
     * @returns A confirmation message from the server.
     */
    async updateGoal(userId: number, goalId: number, goal: Partial<SavingGoalDTO>): Promise<string> {
        const response = await api.put(`/api/saving-goals/${userId}/${goalId}`, goal);
        return response.data;
    }
}

export default new SavingsService();
