

const BASE_URL = 'http://localhost:8080';

export interface TransactionDTO {
    description: string;
    amount: number;
    category: string;
    date: string; // YYYY-MM-DD
    paymentSource: string;
    type: 'INCOME' | 'EXPENSE';
}

const addTransaction = async (transaction: TransactionDTO): Promise<string> => {
    const token = localStorage.getItem('token');
     // Even if token is not strictly required by the snippet, it's good practice if security is enabled.
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${BASE_URL}/add-transaction`, {
            method: 'POST',
            headers,
            body: JSON.stringify(transaction),
        });

        if (!response.ok) {
            if (response.status === 403) {
                 throw new Error('Unauthorized. Please login.');
            }
            throw new Error(`Failed to add transaction: ${response.statusText}`);
        }

        return await response.text(); // Controller returns String
    } catch (error) {
        console.error('Error adding transaction:', error);
        throw error;
    }
};

const getAllTransactions = async (): Promise<TransactionDTO[]> => {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${BASE_URL}/get-all-transaction`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            if (response.status === 403) {
                 throw new Error('Unauthorized. Please login.');
            }
            throw new Error(`Failed to fetch transactions: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};

const TransactionService = {
    addTransaction,
    getAllTransactions,
};

export default TransactionService;
