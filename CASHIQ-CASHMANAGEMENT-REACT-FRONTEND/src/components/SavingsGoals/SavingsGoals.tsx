import React from 'react';
import { Button, Typography, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FlightIcon from '@mui/icons-material/Flight';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import SecurityIcon from '@mui/icons-material/Security';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Sidebar from '../Sidebar/Sidebar';
import GoalCard from './GoalCard/GoalCard';
import CompletedGoalCard from './CompletedGoalCard/CompletedGoalCard';
import './SavingsGoals.css';

const SavingsGoals: React.FC = () => {
    // Static calculation for demo, normally dynamic
    const totalGoal = 17000;
    const totalSaved = 5600;
    const remaining = totalGoal - totalSaved;
    const savedPercentage = (totalSaved / totalGoal) * 100;
    
    return (
        <div className="savings-goals-container">
            <Sidebar />
            
            <main className="savings-goals-main">
                {/* Summary Cards */}
                <div className="summary-grid">
                    <div className="summary-card">
                        <div>
                            <div className="summary-title">Total Goal:</div>
                            <div className="summary-value">₹{totalGoal.toLocaleString()}</div>
                        </div>
                    </div>
                    
                    <div className="summary-card">
                        <div style={{ width: '100%', paddingRight: '1rem' }}>
                            <div className="summary-title">Saved so far:</div>
                            <div className="summary-value green">
                                ₹{totalSaved.toLocaleString()}
                                <span style={{ fontSize: '0.9rem', marginLeft: '0.5rem', color: '#64748b' }}>
                                    ({Math.round(savedPercentage)}%)
                                </span>
                            </div>
                            <LinearProgress 
                                variant="determinate" 
                                value={savedPercentage} 
                                sx={{ 
                                    mt: 2,
                                    height: 8, 
                                    borderRadius: 4,
                                    backgroundColor: '#e2e8f0',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#16a34a'
                                    }
                                }}
                            />
                        </div>
                    </div>
                    
                    <div className="summary-card">
                         <div>
                            <div className="summary-title">Remaining:</div>
                            <div className="summary-value amber">
                                ₹{remaining.toLocaleString()}
                            </div>
                            <div className="summary-subtext">
                                (Keep going!)
                            </div>
                        </div>
                    </div>
                </div>

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
                        icon={<FlightIcon sx={{ color: '#0ea5e9' }} />} 
                        currentAmount={3500} 
                        targetAmount={5000} 
                        progress={70} 
                        color="#f59e0b" 
                        message="On track! Last contribution: ₹200 on Dec 15."
                    />
                    <GoalCard 
                        title="New Macbook" 
                        icon={<LaptopMacIcon sx={{ color: '#64748b' }} />} 
                        currentAmount={600} 
                        targetAmount={2000} 
                        progress={30} 
                        color="#f59e0b" 
                        message="Keep going. Last contribution: ₹50 on Dec 1."
                    />
                    <GoalCard 
                        title="Emergency Fund" 
                        icon={<SecurityIcon sx={{ color: '#ef4444' }} />} 
                        currentAmount={1500} 
                        targetAmount={10000} 
                        progress={15} 
                        color="#ef4444" 
                        message="Target date: Dec 2026."
                    />
                </div>

                {/* Completed Goals Section */}
                <div>
                    <Typography variant="h6" className="section-title">Completed Goals</Typography>
                    <div className="completed-goals-list">
                        <CompletedGoalCard 
                            title="Wedding Gift" 
                            icon={<CardGiftcardIcon sx={{ color: '#d97706', fontSize: 20 }} />} 
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
