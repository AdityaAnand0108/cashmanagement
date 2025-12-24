import React from 'react';
import { Button, Chip, Tooltip } from '@mui/material';
import './DebtItemCard.css';

interface DebtItemCardProps {
    title: string;
    icon?: string; // Emoji
    amount: number;
    details: string; // e.g., "Next payment: $100 on Dec 25"
    actionLabel: string;
    onAction: () => void;
    type: 'owe' | 'owed';
    urgencyTag?: string; // e.g., "Interest: 6%"
}

const DebtItemCard: React.FC<DebtItemCardProps> = ({ 
    title, 
    icon, 
    amount, 
    details, 
    actionLabel, 
    onAction, 
    type,
    urgencyTag
}) => {
    // Extract name for AI draft (simple logic: take word after "from" or "to")
    const getName = () => {
        const match = title.match(/(?:from|to)\s+(\w+)/i);
        return match ? match[1] : 'Friend';
    };

    const isRemind = actionLabel === 'Remind';
    const tooltipTitle = isRemind 
        ? `AI Draft: "Hey ${getName()}, just a nudge about the ${title.toLowerCase().includes('dinner') ? 'dinner split' : 'shared expense'}!"` 
        : "";

    const ActionButton = (
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
    );

    return (
        <div className="debt-item-card">
            <div className="debt-item-content">
                <div className="debt-title">
                    {title} {icon && <span>{icon}</span>}
                    {urgencyTag && (
                        <Chip 
                            label={urgencyTag} 
                            size="small" 
                            sx={{ 
                                height: 20, 
                                fontSize: '0.7rem', 
                                fontWeight: 600,
                                color: '#dc2626', 
                                backgroundColor: '#fee2e2',
                                ml: 1
                            }} 
                        />
                    )}
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
                {isRemind ? (
                    <Tooltip title={tooltipTitle} arrow placement="top">
                        {ActionButton}
                    </Tooltip>
                ) : (
                    ActionButton
                )}
            </div>
        </div>
    );
};

export default DebtItemCard;
