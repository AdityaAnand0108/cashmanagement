import React from 'react';
import './Dashboard.css';

// Components
import MetricCard from './MetricCard/MetricCard';
import QuickAddTransaction from '../QuickAddTransaction/QuickAddTransaction';
import AtRiskBudgets from './AtRiskBudgets/AtRiskBudgets';
import RecentTransactions from './RecentTransactions/RecentTransactions';
import Goals from './Goals/Goals';
import Sidebar from '../Sidebar/Sidebar';

const Dashboard: React.FC = () => {
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
                            amount="₹5,200" 
                            subtext="+₹400 vs last month" 
                            subtextClass="positive" 
                            accentColor="#22c55e" 
                        />
                        <MetricCard 
                            title="Monthly Expenses" 
                            amount="₹3,150" 
                            subtext="You are at 60% of monthly budget" 
                            subtextClass="warning" 
                            accentColor="#f97316" 
                        />
                        <MetricCard 
                            title="Current Safe-to-Spend Balance" 
                            amount="₹1,450" 
                            accentColor="#3b82f6" 
                        />
                         <MetricCard 
                            title="Outstanding Debts (IOUs)" 
                            amount="₹250" 
                            subtext="Next payment due in 4 days" 
                            subtextClass="neutral" // or danger if late
                            accentColor="#dc2626" 
                        />
                    </div>

                    {/* Middle Row: Split 50/50 roughly */}
                    <div className="left-column">
                        <QuickAddTransaction />
                        <RecentTransactions />
                    </div>

                    <div className="right-column">
                        <AtRiskBudgets />
                        <Goals />
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
