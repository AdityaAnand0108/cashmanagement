import { Chip, Avatar } from "@mui/material"; 
import type { TransactionDTO } from '../../../models/Transaction';
import { getCategoryIcon, getCategoryColor } from '../../../utils/CategoryIconUtils';
import { formatRelativeDate } from '../../../utils/DateUtils';
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
              <th>Transaction Details</th>
              <th>Source</th>
              <th className="amount-header">Amount</th>
            </tr>
          </thead>
          <tbody>
            {displayTransactions.length === 0 ? (
                <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>No recent transactions found.</td>
                </tr>
            ) : (
                displayTransactions.map((transaction, index) => {
                    const categoryColor = getCategoryColor(transaction.category);
                    return (
                  <tr key={transaction.id || index}>
                    <td>{formatRelativeDate(transaction.date)}</td>
                    <td>
                        <div className="transaction-details-wrapper">
                             <div className="transaction-category-row">
                                <Avatar 
                                    sx={{ 
                                        bgcolor: categoryColor.bg, 
                                        color: categoryColor.text, 
                                        width: 32, 
                                        height: 32,
                                        '& .MuiSvgIcon-root': { fontSize: '1.2rem' }
                                    }}
                                >
                                    {getCategoryIcon(transaction.category)}
                                </Avatar>
                                <span className="category-name">{transaction.category}</span>
                             </div>
                             <div className="transaction-description-subtext">
                                {transaction.description}
                             </div>
                        </div>
                    </td>
                    <td className="transaction-merchant">
                        <Chip 
                            label={transaction.paymentSource ? transaction.paymentSource.toUpperCase() : "UNKNOWN"} 
                            size="small" 
                            variant="outlined"
                            className="source-chip"
                        />
                    </td>
                    <td className={`amount-cell ${transaction.type === 'INCOME' ? 'positive' : 'negative'}`}>
                      {transaction.type === 'INCOME' ? '+' : '-'}₹{Math.abs(transaction.amount).toLocaleString()}
                    </td>
                  </tr>
                );
            })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
