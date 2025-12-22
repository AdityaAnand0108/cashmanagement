import axios from 'axios';
import type {BudgetDTO} from '../models/Budget';

const API_URL = 'http://localhost:8080/api/budget';

/**
 * BudgetService class for handling budget operations.
 */
class BudgetService {
    
    /**
     * Gets the authorization header.
     * @returns The authorization header.
     */
    private getAuthHeader() {
        const token = localStorage.getItem('token');
        return { headers: { Authorization: `Bearer ${token}` } };
    }

    /**
     * Adds a budget for a user.
     * @param userId The ID of the user.
     * @param budget The budget data to add.
     * @returns A promise that resolves to a string.
     */
    async addBudget(userId: number, budget: BudgetDTO): Promise<string> {
        const response = await axios.post(`${API_URL}/add/${userId}`, budget, this.getAuthHeader());
        return response.data;
    }

    async updateBudget(userId: number, budgetId: number, budget: BudgetDTO): Promise<string> {
        const response = await axios.put(`${API_URL}/update/${userId}/${budgetId}`, budget, this.getAuthHeader());
        return response.data;
    }

    async deleteBudget(userId: number, budgetId: number): Promise<string> {
        const response = await axios.delete(`${API_URL}/delete/${userId}/${budgetId}`, this.getAuthHeader());
        return response.data;
    }

    /**
     * Gets the budgets for a user.
     * @param userId The ID of the user.
     * @returns A promise that resolves to an array of BudgetDTO.
     */
    async getUserBudgets(userId: number): Promise<BudgetDTO[]> {
        const response = await axios.get(`${API_URL}/user/${userId}`, this.getAuthHeader());
        return response.data;
    }
}

export default new BudgetService();
