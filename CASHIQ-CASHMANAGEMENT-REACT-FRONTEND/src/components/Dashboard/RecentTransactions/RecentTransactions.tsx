import type { TransactionDTO } from '../../../models/Transaction';
import './RecentTransactions.css';

interface RecentTransactionsProps {
    transactions?: TransactionDTO[]; // Optional to handle if parent doesn't pass it yet, but we will pass it
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions = [] }) => {
    // Transactions are already sorted descending by date in Dashboard logic or we should sort here? 
    // Dashboard fetched all. Let's sort here to be safe or assuming parent passed sorted.
    // Let's sort here to be safe to show most recent.
    
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const displayTransactions = sortedTransactions.slice(0, 5);

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
            {displayTransactions.length === 0 ? (
                <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>No recent transactions found.</td>
                </tr>
            ) : (
                displayTransactions.map((transaction, index) => (
                  <tr key={transaction.id || index}>
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
