import { useState, useEffect } from 'react';
import './RecentTransactions.css';
import TransactionService, { type TransactionDTO } from '../../../services/TransactionService';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await TransactionService.getAllTransactions();
        // Sort by date descending (newest first)
        const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setTransactions(sortedData);
      } catch (error) {
        console.error("Failed to load transactions", error);
        // Optionally handle error state
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
      return <div className="recent-transactions-container">Loading transactions...</div>;
  }

  return (
    <div className="recent-transactions-container">
      <div className="recent-transactions-header">
        <h3>Recent Transactions</h3>
      </div>

      <div className="transactions-list">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Merchant</th>
              <th>Category</th>
              <th className="amount-header">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
                <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>No recent transactions found.</td>
                </tr>
            ) : (
                transactions.slice(0, 5).map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td className="transaction-merchant">{transaction.paymentSource}</td>
                    <td>
                      <span className="category-tag">{transaction.category}</span>
                    </td>
                    <td className={`amount-cell ${transaction.type === 'INCOME' ? 'positive' : 'negative'}`}>
                      {transaction.type === 'INCOME' ? '+' : '-'}₹{Math.abs(transaction.amount).toLocaleString()}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
