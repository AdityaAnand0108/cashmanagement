import React, { useMemo } from 'react';
import './AtRiskBudgets.css';
import type { BudgetDTO } from '../../../models/Budget';
import type { TransactionDTO } from '../../../models/Transaction';
import { formatCurrency } from '../../../utils/CurrencyUtils';
import { Avatar } from '@mui/material';
import { getCategoryIcon, getCategoryColor } from '../../../utils/CategoryIconUtils';

interface AtRiskBudgetsProps {
    budgets: BudgetDTO[];
    transactions: TransactionDTO[];
}

const AtRiskBudgets: React.FC<AtRiskBudgetsProps> = ({ budgets, transactions }) => {
    
    // Calculate usage for each budget
    const budgetUsage = useMemo(() => {
        if (!budgets || budgets.length === 0) return [];

        return budgets.map(budget => {
            // Filter transactions for this budget's category AND within budget range (simplification: current month)
            // Ideally we check budget.startDate/endDate, but for now assuming monthly budgets matching current month trans.
            const now = new Date();
            const currentMonthTransactions = transactions.filter(t => {
                const tDate = new Date(t.date);
                return t.category === budget.category && 
                       t.type === 'EXPENSE' &&
                       tDate.getMonth() === now.getMonth() &&
                       tDate.getFullYear() === now.getFullYear();
            });

            const usedAmount = currentMonthTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
            const percentage = budget.limitAmount > 0 ? (usedAmount / budget.limitAmount) * 100 : 0;
            
            return {
                ...budget,
                usedAmount,
                percentage
            };
        }).sort((a, b) => b.percentage - a.percentage); // Sort by highest usage
    }, [budgets, transactions]);

    const atRiskBudgets = budgetUsage.slice(0, 3); // Show top 3 most used

    if (budgets.length === 0) {
        return (
            <div className="at-risk-container empty">
                 <div className="at-risk-header">
                    <h3 className="at-risk-title">Budgets</h3>
                </div>
                <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                    No budgets set.
                </div>
            </div>
        );
    }

    return (
        <div className="at-risk-container">
            <div className="at-risk-header">
                <h3 className="at-risk-title">Budget Status</h3>
            </div>
            
            <div className="budgets-list">
                {atRiskBudgets.map((budget, index) => {
                    const percent = Math.round(budget.percentage);
                    let color = '#22c55e'; // Green
                    if (percent > 80) color = '#dc2626'; // Red
                    else if (percent > 50) color = '#f59e0b'; // Yellow

                    // Fix: Normalize category to Title Case (e.g. "FOOD" -> "Food") to match utils expectations
                    const formattedCategory = budget.category 
                        ? budget.category.charAt(0).toUpperCase() + budget.category.slice(1).toLowerCase()
                        : '';

                    const categoryColor = getCategoryColor(formattedCategory);

                    return (
                        <div key={index} className="budget-item">
                            <div className="budget-info-row">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Avatar 
                                        sx={{ 
                                            bgcolor: categoryColor.bg, 
                                            color: categoryColor.text, 
                                            width: 28, 
                                            height: 28,
                                            '& .MuiSvgIcon-root': { fontSize: '1rem' }
                                        }}
                                    >
                                        {getCategoryIcon(formattedCategory)}
                                    </Avatar>
                                    <span className="budget-name">
                                        {formattedCategory}
                                    </span>
                                </div>
                                <span className="budget-percent">{percent}%</span>
                            </div>
                            <div className="progress-bar-bg">
                                <div 
                                    className="progress-bar-fill" 
                                    style={{ width: `${Math.min(percent, 100)}%`, backgroundColor: color }}
                                />
                            </div>
                            <div className="budget-details-row">
                                <span className="budget-used-amount">
                                    {formatCurrency(budget.usedAmount)} / {formatCurrency(budget.limitAmount)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AtRiskBudgets;
