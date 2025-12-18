import React from 'react';
import { CircularProgress } from '@mui/material';
import './GoalCard.css';

interface GoalCardProps {
    title: string;
    icon?: string; // Emoji or URL
    currentAmount: number;
    targetAmount: number;
    progress: number; // 0 to 100
    message: string;
    color: string; // Hex code for progress bar and amount
    isCompleted?: boolean;
}

const GoalCard: React.FC<GoalCardProps> = ({
    title,
    icon,
    currentAmount,
    targetAmount,
    progress,
    message,
    color,
}) => {
    return (
        <div className="goal-card">
            {/* Circular Progress */}
            <div className="goal-progress-wrapper">
                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={100}
                    thickness={4}
                    sx={{ color: '#e2e8f0', position: 'absolute' }} // Background ring
                />
                <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={100}
                    thickness={4}
                    sx={{ color: color, strokeLinecap: 'round' }}
                />
                <div className="goal-progress-text">
                    {progress}%
                </div>
            </div>

            {/* Details */}
            <div className="goal-details">
                <div className="goal-title">
                    {title} {icon && <span>{icon}</span>}
                </div>
                <div className="goal-amount">
                    <span style={{ color: color }}>₹{currentAmount.toLocaleString()}</span>
                    <span className="goal-target"> / ₹{targetAmount.toLocaleString()}</span>
                </div>
                <div className="goal-message">
                    {message}
                </div>
            </div>
        </div>
    );
};

export default GoalCard;
