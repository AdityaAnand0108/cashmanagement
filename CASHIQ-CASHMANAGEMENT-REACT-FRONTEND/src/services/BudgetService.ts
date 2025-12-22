import axios from 'axios';
import type {BudgetDTO} from '../models/Budget';

const API_URL = 'http://localhost:8080/api/budget';

class BudgetService {
    
    private getAuthHeader() {
        const token = localStorage.getItem('token');
        return { headers: { Authorization: `Bearer ${token}` } };
    }

    async addBudget(userId: number, budget: BudgetDTO): Promise<string> {
        const response = await axios.post(`${API_URL}/add/${userId}`, budget, this.getAuthHeader());
        return response.data;
    }

    async getUserBudgets(userId: number): Promise<BudgetDTO[]> {
        const response = await axios.get(`${API_URL}/user/${userId}`, this.getAuthHeader());
        return response.data;
    }
}

export default new BudgetService();
