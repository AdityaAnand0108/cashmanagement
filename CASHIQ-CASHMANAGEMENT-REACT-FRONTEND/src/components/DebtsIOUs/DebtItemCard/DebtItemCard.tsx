import React from 'react';
import { Button } from '@mui/material';
import './DebtItemCard.css';

interface DebtItemCardProps {
    title: string;
    icon?: string; // Emoji
    amount: number;
    details: string; // e.g., "Next payment: $100 on Dec 25"
    actionLabel: string;
    onAction: () => void;
    type: 'owe' | 'owed';
}

const DebtItemCard: React.FC<DebtItemCardProps> = ({ 
    title, 
    icon, 
    amount, 
    details, 
    actionLabel, 
    onAction, 
    type 
}) => {
    return (
        <div className="debt-item-card">
            <div className="debt-item-content">
                <div className="debt-title">
                    {title} {icon && <span>{icon}</span>}
                </div>
                <div>
                    <span className="debt-amount-label">
                        {type === 'owe' ? 'Balance:' : 'Amount:'}
                    </span>
                    <span className="debt-amount-value">₹{amount.toLocaleString()}</span>
                </div>
                <div className="debt-date">
                    {details}
                </div>
            </div>
            <div>
                <Button 
                    variant="outlined" 
                    className="debt-action-btn"
                    onClick={onAction}
                    sx={{
                        color: type === 'owe' ? '#3b82f6' : '#64748b',
                        borderColor: type === 'owe' ? '#3b82f6' : '#cbd5e1',
                        '&:hover': {
                            backgroundColor: type === 'owe' ? 'rgba(59, 130, 246, 0.04)' : 'rgba(100, 116, 139, 0.04)',
                            borderColor: type === 'owe' ? '#2563eb' : '#94a3b8',
                        }
                    }}
                >
                    {actionLabel}
                </Button>
            </div>
        </div>
    );
};

export default DebtItemCard;
