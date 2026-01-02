import React, { useEffect, useState } from 'react';
import './Dashboard.css';

// Components
import MetricCard from './MetricCard/MetricCard';
import QuickAddTransaction from '../QuickAddTransaction/QuickAddTransaction';
import AtRiskBudgets from './AtRiskBudgets/AtRiskBudgets';
import RecentTransactions from './RecentTransactions/RecentTransactions';
import Goals from './Goals/Goals';
import Sidebar from '../Sidebar/Sidebar';

// Services & Models
import TransactionService from '../../services/TransactionService';
import BudgetService from '../../services/BudgetService';
import DebtService from '../../services/DebtService';
import SavingsService from '../../services/SavingsService';
import type { TransactionDTO } from '../../models/Transaction';
import type { BudgetDTO } from '../../models/Budget';
import { DebtType, DebtStatus } from '../../models/Debt';
import type { SavingGoalDTO } from '../../models/SavingGoal';
import { formatCurrency } from '../../utils/CurrencyUtils';

const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [monthlyExpense, setMonthlyExpense] = useState(0);
    const [outstandingDebt, setOutstandingDebt] = useState(0);
    const [budgets, setBudgets] = useState<BudgetDTO[]>([]);
    const [transactions, setTransactions] = useState<TransactionDTO[]>([]); // Store all for calculating budget usage if needed
    const [goals, setGoals] = useState<SavingGoalDTO[]>([]);
    
    // Income Metrics State
    const [incomeSubtext, setIncomeSubtext] = useState<{ text: string; type: 'positive' | 'warning' | 'neutral' }>({ text: 'This month', type: 'neutral' });

    const [incomeTitle, setIncomeTitle] = useState('Monthly Income');
    const [expenseSubtext, setExpenseSubtext] = useState('This month');

    useEffect(() => {
        const loadDashboardData = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) return;

            try {
                const numericUserId = parseInt(userId);
                
                // Fetch all data in parallel
                const [
                    fetchedTransactions,
                    fetchedBudgets,
                    fetchedDebts,
                    fetchedGoals
                ] = await Promise.all([
                    TransactionService.getAllTransactions(),
                    BudgetService.getUserBudgets(numericUserId),
                    DebtService.getAllDebts(numericUserId),
                    SavingsService.getUserGoals(numericUserId)
                ]);

                setTransactions(fetchedTransactions);
                setBudgets(fetchedBudgets);
                setGoals(fetchedGoals);

                // --- Calculate Metrics ---
                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();

                const prevDate = new Date();
                prevDate.setMonth(currentMonth - 1);
                const prevMonth = prevDate.getMonth();
                const prevYear = prevDate.getFullYear();

                let incomeSum = 0;
                let expenseSum = 0;
                let prevIncomeSum = 0;
                const incomeSources = new Set<string>();

                fetchedTransactions.forEach(t => {
                    const tDate = new Date(t.date);
                    const tMonth = tDate.getMonth();
                    const tYear = tDate.getFullYear();

                    if (tMonth === currentMonth && tYear === currentYear) {
                        if (t.type === 'INCOME') {
                            incomeSum += t.amount;
                            // Use paymentSource or fallback to description
                            if (t.paymentSource) incomeSources.add(t.paymentSource);
                        } else if (t.type === 'EXPENSE') {
                            expenseSum += Math.abs(t.amount);
                        }
                    } else if (tMonth === prevMonth && tYear === prevYear) {
                         if (t.type === 'INCOME') {
                            prevIncomeSum += t.amount;
                        }
                    }
                });

                // Update Income Context
                let subText = 'This month';
                let subType: 'positive' | 'warning' | 'neutral' = 'neutral';

                if (prevIncomeSum > 0) {
                    const diff = incomeSum - prevIncomeSum;
                    if (diff > 0) {
                        subText = `↑ ${formatCurrency(diff)} more than last month`;
                        subType = 'positive';
                    } else if (diff < 0) {
                        subText = `↓ ${formatCurrency(Math.abs(diff))} less than last month`;
                        subType = 'warning';
                    } else {
                        subText = 'Consistent with last month';
                    }
                } else if (incomeSum > 0 && prevIncomeSum === 0) {
                     subText = 'Good start to the month'; // Or just leave as "This month"
                     subType = 'positive';
                }

                setIncomeSubtext({ text: subText, type: subType });

                if (incomeSources.size === 1) {
                    setIncomeTitle('Primary Income');
                } else if (incomeSources.size > 1) {
                    setIncomeTitle('Multiple Income Sources');
                } else {
                     setIncomeTitle('Monthly Income');
                }

                // Expense Context
                const currentDay = now.getDate();
                const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                const newExpenseSubtext = `Day ${currentDay} of ${daysInMonth} • Spent so far`;
                setExpenseSubtext(newExpenseSubtext);

                setMonthlyIncome(incomeSum);
                setMonthlyExpense(expenseSum);

                // Calculate Outstanding Debt (IOUs owed BY user)
                const totalDebt = fetchedDebts
                    .filter(d => d.debtType === DebtType.OWED_BY_USER && d.status === DebtStatus.ACTIVE)
                    .reduce((sum, d) => sum + d.currentBalance, 0);
                
                setOutstandingDebt(totalDebt);

            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    const totalBudgetLimit = budgets.reduce((sum, b) => sum + b.limitAmount, 0);
    const safeToSpend = totalBudgetLimit - monthlyExpense;

    // Safe-to-Spend Context
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysRemaining = Math.max(1, daysInMonth - currentDay + 1);

    let safeToSpendSubtext = 'Budget exceeded';
    let safeToSpendClass: 'positive' | 'warning' | 'danger' | 'neutral' = 'danger';

    if (safeToSpend >= 0) {
        const dailySafeSpend = safeToSpend / daysRemaining;
        safeToSpendSubtext = `You can spend ${formatCurrency(dailySafeSpend)} / day`;
        safeToSpendClass = 'positive';
    }

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="dashboard-main">
                <div className="dashboard-grid">
                    
                    {/* Metrics Row */}
                    <div className="metrics-row">
                        <MetricCard 
                            title={incomeTitle} 
                            amount={formatCurrency(monthlyIncome)}
                            subtext={incomeSubtext.text} 
                            subtextClass={incomeSubtext.type} 
                            accentColor="#22c55e" 
                        />
                        <MetricCard 
                            title="Monthly Expenses" 
                            amount={formatCurrency(monthlyExpense)}
                            subtext={expenseSubtext} 
                            subtextClass="warning" 
                            accentColor="#f97316" 
                        />
                        <MetricCard 
                            title={safeToSpend < 0 ? "Over Budget By" : "Current Safe-to-Spend Balance"} 
                            amount={formatCurrency(Math.abs(safeToSpend))} 
                            subtext={safeToSpendSubtext}
                            subtextClass={safeToSpendClass}
                            accentColor={safeToSpend < 0 ? "#dc2626" : "#3b82f6"} 
                        />
                         <MetricCard 
                            title="Outstanding Debts" 
                            amount={formatCurrency(outstandingDebt)}
                            subtext="Active debts you owe" 
                            subtextClass="neutral" 
                            accentColor="#dc2626" 
                        />
                    </div>

                    {/* Middle Row: Split 50/50 roughly */}
                    <div className="left-column">
                        <QuickAddTransaction />
                        <RecentTransactions transactions={transactions} />
                    </div>

                    <div className="right-column">
                        {loading ? (
                            <div className="dashboard-loading">Loading widgets...</div>
                        ) : (
                            <>
                                <AtRiskBudgets budgets={budgets} transactions={transactions} />
                                <Goals goals={goals} />
                            </>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
