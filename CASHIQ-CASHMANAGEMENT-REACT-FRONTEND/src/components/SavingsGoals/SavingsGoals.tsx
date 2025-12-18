import React from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../Sidebar/Sidebar';
import GoalCard from './GoalCard/GoalCard';
import CompletedGoalCard from './CompletedGoalCard/CompletedGoalCard';
import './SavingsGoals.css';

const SavingsGoals: React.FC = () => {
    return (
        <div className="savings-goals-container">
            <Sidebar />
            
            <main className="savings-goals-main">
                {/* Header */}
                <div className="goals-header">
                    <Typography variant="h5" fontWeight="bold">Your Savings Goals</Typography>
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        className="add-goal-btn"
                    >
                        Add New Goal
                    </Button>
                </div>

                {/* Active Goals Grid */}
                <div className="goals-grid">
                    <GoalCard 
                        title="Europe Vacation" 
                        icon="✈️" 
                        currentAmount={3500} 
                        targetAmount={5000} 
                        progress={70} 
                        color="#16a34a" 
                        message="On track! Last contribution: ₹200 on Dec 15."
                    />
                    <GoalCard 
                        title="New Macbook" 
                        icon="💻" 
                        currentAmount={600} 
                        targetAmount={2000} 
                        progress={30} 
                        color="#3b82f6" 
                        message="Keep going. Last contribution: ₹50 on Dec 1."
                    />
                    <GoalCard 
                        title="Emergency Fund" 
                        icon="🛡️" 
                        currentAmount={1500} 
                        targetAmount={10000} 
                        progress={15} 
                        color="#f59e0b" 
                        message="Target date: Dec 2026."
                    />
                </div>

                {/* Completed Goals Section */}
                <div>
                    <Typography variant="h6" className="section-title">Completed Goals</Typography>
                    <div className="completed-goals-list">
                        <CompletedGoalCard 
                            title="Wedding Gift" 
                            icon="🎁" 
                            date="Nov 2025" 
                            amount={500} 
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SavingsGoals;
