
const BASE_URL = 'http://localhost:8080';

import type { IncomeDTO } from '../models/Income';

const addIncome = async (income: IncomeDTO): Promise<string> => {
    const token = localStorage.getItem('token');
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${BASE_URL}/add-income`, {
            method: 'POST',
            headers,
            body: JSON.stringify(income),
        });

        if (!response.ok) {
            if (response.status === 403) {
                 localStorage.removeItem('token');
                 window.location.href = '/login';
                 throw new Error('Unauthorized. Please login.');
            }
            throw new Error(`Failed to add income source: ${response.statusText}`);
        }

        return await response.text();
    } catch (error) {
        console.error('Error adding income source:', error);
        throw error;
    }
};

const updateIncome = async (id: number, income: IncomeDTO): Promise<string> => {
    const token = localStorage.getItem('token');
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${BASE_URL}/update-income/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(income),
        });

        if (!response.ok) {
            if (response.status === 403) {
                 localStorage.removeItem('token');
                 window.location.href = '/login';
                 throw new Error('Unauthorized. Please login.');
            }
            throw new Error(`Failed to update income source: ${response.statusText}`);
        }

        return await response.text();
    } catch (error) {
        console.error('Error updating income source:', error);
        throw error;
    }
};

const getAllIncomes = async (): Promise<IncomeDTO[]> => {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${BASE_URL}/get-all-income`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            if (response.status === 403) {
                 localStorage.removeItem('token');
                 window.location.href = '/login';
                 throw new Error('Unauthorized. Please login.');
            }
            throw new Error(`Failed to fetch income sources: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching income sources:', error);
        throw error;
    }
};

const deleteIncome = async (id: number): Promise<string> => {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${BASE_URL}/delete-income/${id}`, {
            method: 'DELETE',
            headers,
        });

        if (!response.ok) {
            if (response.status === 403) {
                 localStorage.removeItem('token');
                 window.location.href = '/login';
                 throw new Error('Unauthorized. Please login.');
            }
            throw new Error(`Failed to delete income source: ${response.statusText}`);
        }

        return await response.text();
    } catch (error) {
        console.error('Error deleting income source:', error);
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
