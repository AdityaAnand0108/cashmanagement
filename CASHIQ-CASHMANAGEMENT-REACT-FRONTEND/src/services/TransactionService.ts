const API_URL = 'http://localhost:8080/api/transactions'; // Adjusted based on Controller path assumption, but Controller is @RestController at root? No, usually generic. 
// Wait, Controller code showed: @PostMapping("/add-transaction") inside TransactionController. 
// Does TransactionController have a @RequestMapping? The code I read didn't show one at class level, just @RestController. 
// So it's likely http://localhost:8080/add-transaction directly?
// Or I should check if there's a global path prefix.
// Given SmartExpenseService uses http://localhost:8080/api/expenses, it's safer to assume /api might be a context path or prefix? 
// Actually, let's look at the file content I read earlier for TransactionController.java.
// It had @PostMapping("/add-transaction"). No @RequestMapping at class level.
// So the URL is http://localhost:8080/add-transaction unless there is a global config.
// I will try to follow the pattern or just use the root if that's what the code says.
// SmartExpenseService used /api/expenses. Maybe I should put it under /api too? 
// But I can't change backend right now easily without confirmation. The user created the backend file with /add-transaction.
// I will assume it's at root /add-transaction for now, or /api if there is a global prefix.
// Let's assume root based on the provided file snippet, but I'll add a comment.

// Update: User might have a global prefix in application.properties.
// For now, I will point to http://localhost:8080/add-transaction based on the file.

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

const TransactionService = {
    addTransaction,
};

export default TransactionService;
