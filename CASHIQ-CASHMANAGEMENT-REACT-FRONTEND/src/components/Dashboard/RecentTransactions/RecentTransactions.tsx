import React from 'react';
import './RecentTransactions.css';

interface Transaction {
    id: string;
    date: string;
    merchant: string;
    category: string;
    amount: number;
    currency: string;
    type: 'income' | 'expense';
    icon?: string; // For category icon
}

const RecentTransactions: React.FC = () => {
    // Mock Data
    const transactions: Transaction[] = [
        { id: '1', date: 'Dec 12', merchant: 'Spotify', category: 'Subscriptions 🎵', amount: 10.99, currency: '₹', type: 'expense' },
        { id: '2', date: 'Dec 11', merchant: 'Uber', category: 'Transport 🚗', amount: 14.50, currency: '₹', type: 'expense' },
        { id: '3', date: 'Dec 11', merchant: "Trader Joe's", category: 'Groceries 🛒', amount: 78.20, currency: '₹', type: 'expense' },
        { id: '4', date: 'Dec 10', merchant: 'Electric Bill', category: 'Utilities 💡', amount: 120.00, currency: '₹', type: 'expense' },
        { id: '5', date: 'Dec 09', merchant: 'Salary', category: 'Income 💸', amount: 2600.00, currency: '₹', type: 'income' },
    ];

    return (
        <div className="recent-transactions-container">
            <div className="recent-transactions-header">
                <h3 className="recent-transactions-title">Recent Transactions</h3>
            </div>
            
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Merchant</th>
                        <th>Category</th>
                        <th style={{ textAlign: 'right' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(tx => (
                        <tr key={tx.id}>
                            <td>{tx.date}</td>
                            <td className="transaction-merchant">{tx.merchant}</td>
                            <td className="transaction-category">{tx.category}</td>
                            <td className={`transaction-amount ${tx.type === 'income' ? 'positive' : 'negative'}`}>
                                {tx.type === 'income' ? '+' : '-'}{tx.currency}{tx.amount.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentTransactions;
