import React from 'react';
import './AtRiskBudgets.css';

interface BudgetItem {
    name: string;
    used: number;
    total: number;
    color: string;
    warningMessage?: string;
}

const AtRiskBudgets: React.FC = () => {
    // Mock Data based on wireframe
    const budgets: BudgetItem[] = [
        { name: 'Groceries', used: 425, total: 500, color: '#f59e0b' }, // Yellow/Orange
        { name: 'Entertainment', used: 190, total: 200, color: '#dc2626', warningMessage: 'Slow down!' } // Red
    ];

    return (
        <div className="at-risk-container">
            <div className="at-risk-header">
                <h3 className="at-risk-title">At-Risk Budgets</h3>
                <span className="warning-icon">⚠️</span>
            </div>
            
            <div className="budgets-list">
                {budgets.map((budget, index) => {
                    const percent = Math.round((budget.used / budget.total) * 100);
                    return (
                        <div key={index} className="budget-item">
                            <div className="budget-info-row">
                                <span className="budget-name">{budget.name}</span>
                                <span className="budget-percent">{percent}%</span>
                            </div>
                            <div className="progress-bar-bg">
                                <div 
                                    className="progress-bar-fill" 
                                    style={{ width: `${percent}%`, backgroundColor: budget.color }}
                                />
                            </div>
                            <div className="budget-details-row">
                                <span className="budget-used-amount">₹{budget.used} / ₹{budget.total} used</span>
                                {budget.warningMessage && (
                                    <span className="budget-warning-text">. {budget.warningMessage}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AtRiskBudgets;
