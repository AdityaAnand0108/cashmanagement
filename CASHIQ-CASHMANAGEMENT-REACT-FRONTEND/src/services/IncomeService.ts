import axios from 'axios';
import type { IncomeDTO } from '../models/Income';

const BASE_URL = 'http://localhost:8080';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const handleAuthError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Unauthorized. Please login.');
    }
    throw error;
};

const addIncome = async (income: IncomeDTO): Promise<string> => {
    try {
        const response = await axios.post(`${BASE_URL}/add-income`, income, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Error adding income source:', error);
        handleAuthError(error);
        throw error;
    }
};

const updateIncome = async (id: number, income: IncomeDTO): Promise<string> => {
    try {
        const response = await axios.put(`${BASE_URL}/update-income/${id}`, income, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Error updating income source:', error);
         handleAuthError(error);
         throw error;
    }
};

const getAllIncomes = async (): Promise<IncomeDTO[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/get-all-income`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Error fetching income sources:', error);
         handleAuthError(error);
         throw error;
    }
};

const deleteIncome = async (id: number): Promise<string> => {
    try {
        const response = await axios.delete(`${BASE_URL}/delete-income/${id}`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Error deleting income source:', error);
         handleAuthError(error);
         throw error;
    }
};

const IncomeService = {
    addIncome,
    updateIncome,
    getAllIncomes,
    deleteIncome,
};

export default IncomeService;
