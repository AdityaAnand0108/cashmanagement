import React from 'react';
import './Goals.css';

interface Goal {
    id: string;
    name: string;
    saved: number;
    target: number;
    color: string;
}

const Goals: React.FC = () => {
    // Mock Data
    const goals: Goal[] = [
        { id: '1', name: 'Europe Vacation', saved: 3500, target: 5000, color: '#22c55e' }, // Green
        { id: '2', name: 'New Macbook', saved: 600, target: 2000, color: '#3b82f6' }    // Blue
    ];

    return (
        <div className="goals-container">
             <div className="goals-header">
                <h3 className="goals-title">Your "Big Picture" Goals</h3>
                <span className="target-icon">🎯</span>
            </div>

            <div className="goals-grid">
                {goals.map(goal => {
                    const percentage = Math.round((goal.saved / goal.target) * 100);
                    // SVG Circle calculation
                    // Radius = 18 (viewbox 36) -> Circumference = 2 * PI * 18 ~= 113
                    const radius = 18;
                    const circumference = 2 * Math.PI * radius;
                    const dashArray = `${(percentage / 100) * circumference} ${circumference}`;

                    return (
                        <div key={goal.id} className="goal-item">
                            <svg viewBox="0 0 36 36" className="circular-chart">
                                <path className="circle-bg"
                                    d="M18 2.0845
                                       a 15.9155 15.9155 0 0 1 0 31.831
                                       a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path className="circle"
                                    strokeDasharray={dashArray}
                                    stroke={goal.color}
                                    d="M18 2.0845
                                       a 15.9155 15.9155 0 0 1 0 31.831
                                       a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <text x="18" y="20.35" className="percentage">{percentage}%</text>
                            </svg>
                            <div className="goal-name">{goal.name}</div>
                            <div className="goal-amounts">₹{goal.saved.toLocaleString()} / ₹{goal.target.toLocaleString()} saved</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Goals;
