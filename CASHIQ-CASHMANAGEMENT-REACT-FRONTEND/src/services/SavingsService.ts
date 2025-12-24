import axios from 'axios';
import type { SavingGoalDTO } from '../models/SavingGoal';

const API_URL = 'http://localhost:8080/api/saving-goals';

class SavingsService {
    
    private getAuthHeader() {
        const token = localStorage.getItem('token');
        return { headers: { Authorization: `Bearer ${token}` } };
    }

    async createGoal(userId: number, goal: SavingGoalDTO): Promise<string> {
        const response = await axios.post(`${API_URL}/${userId}`, goal, this.getAuthHeader());
        return response.data;
    }

    async addFunds(userId: number, goalId: number, amount: number): Promise<string> {
        const response = await axios.put(`${API_URL}/${userId}/${goalId}/add-funds?amount=${amount}`, {}, this.getAuthHeader());
        return response.data;
    }

    async getUserGoals(userId: number): Promise<SavingGoalDTO[]> {
        const response = await axios.get(`${API_URL}/${userId}`, this.getAuthHeader());
        return response.data;
    }

    async deleteGoal(userId: number, goalId: number): Promise<string> {
        const response = await axios.delete(`${API_URL}/${userId}/${goalId}`, this.getAuthHeader());
        return response.data;
    }
}

export default new SavingsService();
