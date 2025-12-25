import React, { useState } from 'react';
import { LinearProgress, IconButton, Button, TextField, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import './GoalCard.css';

interface GoalCardProps {
    id: number;
    title: string;
    icon?: React.ReactNode;
    currentAmount: number;
    targetAmount: number;
    progress: number; // 0 to 100
    message: string;
    color: string; // Hex code
    onDelete: (id: number) => void;
    onAddFunds: (id: number, amount: number) => void;
    onEdit: (id: number) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({
    id,
    title,
    icon,
    currentAmount,
    targetAmount,
    progress,
    message,
    color,
    onDelete,
    onAddFunds,
    onEdit
}) => {
    const [isAddingFunds, setIsAddingFunds] = useState(false);
    const [amountToAdd, setAmountToAdd] = useState('');

    const handleAddFundsSubmit = () => {
        const amount = parseFloat(amountToAdd);
        if (!isNaN(amount) && amount > 0) {
            onAddFunds(id, amount);
            setIsAddingFunds(false);
            setAmountToAdd('');
        }
    };

    return (
        <div className="goal-card">
            <div className="goal-header-row">
                <div className="goal-title">
                    {title} {icon}
                </div>
                <div className="goal-actions">
                    <IconButton size="small" aria-label="edit goal" onClick={() => onEdit(id)} title="Edit Goal">
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" aria-label="delete goal" color="error" onClick={() => onDelete(id)}>
                        <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>

            <LinearProgress 
                variant="determinate" 
                value={Math.min(progress, 100)} 
                sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: '#e2e8f0',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: color
                    }
                }}
            />
            
            <div className="goal-values">
                <span className="current-amount" style={{ color: color }}>₹{currentAmount.toLocaleString()}</span>
                <span className="target-amount"> / ₹{targetAmount.toLocaleString()}</span>
            </div>
            
            <div className="goal-message">
                Status: {message}
            </div>

            {/* Inline Add Funds Section */}
            {isAddingFunds ? (
                <Box mt={2} display="flex" gap={1} alignItems="center">
                    <TextField 
                        size="small" 
                        type="number" 
                        placeholder="Amount" 
                        value={amountToAdd}
                        onChange={(e) => setAmountToAdd(e.target.value)}
                        fullWidth
                        autoFocus
                    />
                    <IconButton size="small" color="primary" onClick={handleAddFundsSubmit} disabled={!amountToAdd}>
                        <AddIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => setIsAddingFunds(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            ) : (
                <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<AddIcon />} 
                    fullWidth 
                    sx={{ mt: 2, textTransform: 'none', borderRadius: 2 }}
                    onClick={() => setIsAddingFunds(true)}
                >
                    Add Funds
                </Button>
            )}
        </div>
    );
};

export default GoalCard;
