import React from 'react';
import './Goals.css';
import type { SavingGoalDTO } from '../../../models/SavingGoal';
import { formatCurrency } from '../../../utils/CurrencyUtils';

interface GoalsProps {
    goals: SavingGoalDTO[];
}

const Goals: React.FC<GoalsProps> = ({ goals }) => {
    // Show only top 2 goals for dashboard to fit space
    const displayGoals = goals ? goals.slice(0, 2) : [];

    return (
        <div className="goals-container">
             <div className="goals-header">
                <h3 className="goals-title">Your "Big Picture" Goals</h3>
                <span className="target-icon">🎯</span>
            </div>

            {displayGoals.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
                    No saving goals yet.
                </div>
            ) : (
                <div className="dashboard-goals-grid">
                    {displayGoals.map((goal, index) => {
                        const target = goal.targetAmount || 1; // avoid divide by zero
                        const saved = goal.currentAmount || 0;
                        const percentage = Math.min(100, Math.round((saved / target) * 100));
                        
                        // SVG Circle calculation
                        // Radius = 18 (viewbox 36) -> Circumference = 2 * PI * 18 ~= 113
                        const radius = 18;
                        const circumference = 2 * Math.PI * radius;
                        const dashArray = `${(percentage / 100) * circumference} ${circumference}`;

                        // Alternate colors for variety
                        const color = index % 2 === 0 ? '#22c55e' : '#3b82f6';

                        return (
                            <div key={goal.id || index} className="goal-item">
                                <svg viewBox="0 0 36 36" className="circular-chart">
                                    <path className="circle-bg"
                                        d="M18 2.0845
                                           a 15.9155 15.9155 0 0 1 0 31.831
                                           a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path className="circle"
                                        strokeDasharray={dashArray}
                                        stroke={color}
                                        d="M18 2.0845
                                           a 15.9155 15.9155 0 0 1 0 31.831
                                           a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="20.35" className="percentage">{percentage}%</text>
                                </svg>
                                <div className="goal-name">{goal.goalName}</div>
                                <div className="goal-amounts">{formatCurrency(saved)} / {formatCurrency(target)}</div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Goals;
