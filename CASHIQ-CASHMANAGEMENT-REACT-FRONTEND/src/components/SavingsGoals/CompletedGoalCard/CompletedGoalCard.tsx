import React from 'react';
import './CompletedGoalCard.css';

interface CompletedGoalCardProps {
    title: string;
    icon: string;
    date: string;
    amount: number;
}

const CompletedGoalCard: React.FC<CompletedGoalCardProps> = ({ title, icon, date, amount }) => {
    return (
        <div className="completed-goal-card">
            <div className="completed-goal-content">
                <span className="completed-goal-text">
                    {title} <span className="completed-goal-icon">{icon}</span>
                </span>
                <span className="completed-goal-date">
                    - Achieved {date}
                </span>
                <span className="completed-goal-amount">
                    (₹{amount.toLocaleString()})
                </span>
            </div>
        </div>
    );
};

export default CompletedGoalCard;
