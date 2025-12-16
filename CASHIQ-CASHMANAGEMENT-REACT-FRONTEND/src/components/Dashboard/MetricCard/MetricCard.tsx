import React from 'react';
import './MetricCard.css';

interface MetricCardProps {
    title: string;
    amount: string;
    subtext?: string;
    subtextClass?: 'positive' | 'warning' | 'danger' | 'neutral';
    accentColor: string; // e.g., '#22c55e'
}

const MetricCard: React.FC<MetricCardProps> = ({ title, amount, subtext, subtextClass = 'neutral', accentColor }) => {
    return (
        <div className="metric-card" style={{ borderLeftColor: accentColor }}>
            <div>
                <div className="metric-title">{title}</div>
                <div className="metric-amount">{amount}</div>
            </div>
            {subtext && (
                <div className={`metric-subtext ${subtextClass}`}>
                    {subtext}
                </div>
            )}
        </div>
    );
};

export default MetricCard;
