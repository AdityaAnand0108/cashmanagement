import React, { useEffect, useState } from 'react';
import { Button, Typography, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FlightIcon from '@mui/icons-material/Flight';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import SecurityIcon from '@mui/icons-material/Security';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Sidebar from '../Sidebar/Sidebar';
import GoalCard from './GoalCard/GoalCard';
import CompletedGoalCard from './CompletedGoalCard/CompletedGoalCard';
import './SavingsGoals.css';
import SavingsService from '../../services/SavingsService';
import type { SavingGoalDTO } from '../../models/SavingGoal';

const SavingsGoals: React.FC = () => {
    const [goals, setGoals] = useState<SavingGoalDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openFundsDialog, setOpenFundsDialog] = useState(false);
    const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);
    const [newGoal, setNewGoal] = useState({
        goalName: '',
        targetAmount: '',
        targetDate: ''
    });
    const [fundsAmount, setFundsAmount] = useState('');

    const userId = 1; // Retrieve from auth context or local storage in real app

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const data = await SavingsService.getUserGoals(userId);
            setGoals(data);
        } catch (error) {
            console.error("Error fetching goals:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateGoal = async () => {
        try {
            const goalData: SavingGoalDTO = {
                userId: userId,
                goalName: newGoal.goalName,
                targetAmount: parseFloat(newGoal.targetAmount),
                targetDate: newGoal.targetDate,
            };
            await SavingsService.createGoal(userId, goalData);
            setOpenAddDialog(false);
            setNewGoal({ goalName: '', targetAmount: '', targetDate: '' });
            fetchGoals();
        } catch (error) {
            console.error("Error creating goal:", error);
        }
    };

    const handleDeleteGoal = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this goal?")) {
            try {
                await SavingsService.deleteGoal(userId, id);
                fetchGoals();
            } catch (error) {
                console.error("Error deleting goal:", error);
            }
        }
    };

    const handleOpenFundsDialog = (id: number) => {
        setSelectedGoalId(id);
        setOpenFundsDialog(true);
    };

    const handleAddFunds = async () => {
        if (selectedGoalId && fundsAmount) {
            try {
                await SavingsService.addFunds(userId, selectedGoalId, parseFloat(fundsAmount));
                setOpenFundsDialog(false);
                setFundsAmount('');
                fetchGoals();
            } catch (error) {
                console.error("Error adding funds:", error);
            }
        }
    };

    const activeGoals = goals.filter(g => g.status !== 'COMPLETED');
    const completedGoals = goals.filter(g => g.status === 'COMPLETED');

    const totalGoal = goals.reduce((acc, curr) => acc + curr.targetAmount, 0);
    const totalSaved = goals.reduce((acc, curr) => acc + (curr.currentAmount || 0), 0);
    const remaining = totalGoal - totalSaved;
    const savedPercentage = totalGoal > 0 ? (totalSaved / totalGoal) * 100 : 0;

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
                        onClick={() => setOpenAddDialog(true)}
                    >
                        Add New Goal
                    </Button>
                </div>

                {/* Active Goals Grid */}
                <div className="goals-grid">
                    {loading ? (
                        <p>Loading goals...</p>
                    ) : activeGoals.length > 0 ? (
                        activeGoals.map(goal => (
                            <GoalCard 
                                key={goal.id}
                                id={goal.id!}
                                title={goal.goalName}
                                icon={<FlightIcon sx={{ color: '#0ea5e9' }} />} // Ideally dynamic icon
                                currentAmount={goal.currentAmount || 0}
                                targetAmount={goal.targetAmount}
                                progress={goal.targetAmount > 0 ? ((goal.currentAmount || 0) / goal.targetAmount) * 100 : 0}
                                color="#f59e0b"
                                message={`Target date: ${goal.targetDate}`}
                                onDelete={handleDeleteGoal}
                                onAddFunds={handleOpenFundsDialog}
                            />
                        ))
                    ) : (
                        <p>No active goals found.</p>
                    )}
                </div>

                {/* Completed Goals Section */}
                {completedGoals.length > 0 && (
                    <div>
                        <Typography variant="h6" className="section-title">Completed Goals</Typography>
                        <div className="completed-goals-list">
                            {completedGoals.map(goal => (
                                <CompletedGoalCard 
                                    key={goal.id}
                                    title={goal.goalName}
                                    icon={<CardGiftcardIcon sx={{ color: '#d97706', fontSize: 20 }} />} 
                                    date={goal.updatedAt || 'Recently'}
                                    amount={goal.targetAmount}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Add Goal Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Add New Savings Goal</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Goal Name"
                        type="text"
                        fullWidth
                        value={newGoal.goalName}
                        onChange={(e) => setNewGoal({ ...newGoal, goalName: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Target Amount"
                        type="number"
                        fullWidth
                        value={newGoal.targetAmount}
                        onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Target Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={newGoal.targetDate}
                        onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                    <Button onClick={handleCreateGoal} variant="contained">Create</Button>
                </DialogActions>
            </Dialog>

            {/* Add Funds Dialog */}
            <Dialog open={openFundsDialog} onClose={() => setOpenFundsDialog(false)}>
                <DialogTitle>Add Funds</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Amount to Add"
                        type="number"
                        fullWidth
                        value={fundsAmount}
                        onChange={(e) => setFundsAmount(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenFundsDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddFunds} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SavingsGoals;
