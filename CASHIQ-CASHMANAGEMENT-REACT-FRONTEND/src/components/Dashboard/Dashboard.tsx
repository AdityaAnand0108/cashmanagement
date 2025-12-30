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

                let incomeSum = 0;
                let expenseSum = 0;

                fetchedTransactions.forEach(t => {
                    const tDate = new Date(t.date);
                    if (tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear) {
                        if (t.type === 'INCOME') {
                            incomeSum += t.amount;
                        } else if (t.type === 'EXPENSE') {
                            expenseSum += Math.abs(t.amount);
                        }
                    }
                });

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

    const safeToSpend = monthlyIncome - monthlyExpense;

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
                            title="Monthly Income" 
                            amount={formatCurrency(monthlyIncome)}
                            subtext="This month" 
                            subtextClass="positive" 
                            accentColor="#22c55e" 
                        />
                        <MetricCard 
                            title="Monthly Expenses" 
                            amount={formatCurrency(monthlyExpense)}
                            subtext="This month" 
                            subtextClass="warning" 
                            accentColor="#f97316" 
                        />
                        <MetricCard 
                            title="Current Safe-to-Spend Balance" 
                            amount={formatCurrency(safeToSpend)} 
                            accentColor="#3b82f6" 
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
