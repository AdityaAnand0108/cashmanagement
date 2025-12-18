import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './DebtSummaryCard.css';

interface DebtSummaryCardProps {
    type: 'owe' | 'owed';
    amount: number;
    breakdown: string;
}

const DebtSummaryCard: React.FC<DebtSummaryCardProps> = ({ type, amount, breakdown }) => {
    const isOwe = type === 'owe';
    const borderColor = isOwe ? '#dc2626' : '#16a34a';
    const amountClass = isOwe ? 'red' : 'green';
    const Icon = isOwe ? ArrowDownwardIcon : ArrowUpwardIcon;

    return (
        <div className="debt-summary-card" style={{ borderLeftColor: borderColor }}>
            <div className="debt-summary-content">
                <div className="summary-title">
                    {isOwe ? 'Total You Owe:' : 'Total Owed to You:'} <span className={`summary-amount ${amountClass}`}>₹{amount.toLocaleString()}</span>
                </div>
                <div className="summary-breakdown">
                    {breakdown}
                </div>
            </div>
            <div className="summary-icon">
                <Icon sx={{ fontSize: 40, color: borderColor }} />
            </div>
        </div>
    );
};

export default DebtSummaryCard;
