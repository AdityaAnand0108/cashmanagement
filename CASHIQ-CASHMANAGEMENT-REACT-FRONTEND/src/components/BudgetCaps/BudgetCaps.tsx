
import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Sidebar from '../Sidebar/Sidebar';
import CategoryBudgetCard from './CategoryBudgetCard/CategoryBudgetCard';
import AddBudgetModal, { type BudgetCapData } from './AddBudgetModal/AddBudgetModal';
import './BudgetCaps.css';
import BudgetService from '../../services/BudgetService';
import { toast } from 'react-toastify';
import { CategoryType } from '../../models/CategoryType';

// Icons for new budgets
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import MovieIcon from '@mui/icons-material/Movie';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import HomeIcon from '@mui/icons-material/Home';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const iconMap: Record<string, React.ReactNode> = {
    [CategoryType.FOOD]: <FastfoodIcon />,
    [CategoryType.TRANSPORT]: <LocalGasStationIcon />,
    [CategoryType.UTILITIES]: <LightbulbIcon />,
    [CategoryType.RENT]: <HomeIcon />,
    [CategoryType.INCOME]: <AttachMoneyIcon />,
    [CategoryType.SHOPPING]: <CheckroomIcon />,
    [CategoryType.ENTERTAINMENT]: <MovieIcon />,
    [CategoryType.HEALTH]: <LocalHospitalIcon />,
    [CategoryType.TRANSFER]: <SwapHorizIcon />,
    [CategoryType.EDUCATION]: <SchoolIcon />
};

interface Budget {
    id: number;
    category: string;
    categoryKey: CategoryType; // Store raw key for editing
    icon: React.ReactNode;
    spent: number;
    limit: number;
    status: string;
    statusColor?: string;
    customProgressColor?: string;
    startDate?: string;
    endDate?: string;
    periodType?: string;
}

const BudgetCaps: React.FC = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [editingBudget, setEditingBudget] = useState<BudgetCapData | undefined>(undefined);
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchBudgets = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        try {
            const data = await BudgetService.getUserBudgets(Number(userId));
            const mappedBudgets: Budget[] = data.map(b => ({
                id: b.id || 0,
                category: CategoryType[b.category as keyof typeof CategoryType] || b.category,
                categoryKey: b.category as CategoryType,
                icon: iconMap[b.category] || <AttachMoneyIcon />,
                spent: b.spentAmount || 0,
                limit: b.limitAmount,
                status: b.status || "On Track",
                customProgressColor: (b.status === 'Exceeded' || b.status === 'At Risk') ? "#dc2626" : "#16a34a",
                startDate: b.startDate,
                endDate: b.endDate,
                periodType: b.periodType
            }));
            setBudgets(mappedBudgets);
        } catch (error) {
            console.error("Failed to fetch budgets", error);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const handleEditBudget = (budget: Budget) => {
        setEditingId(budget.id);
        setEditingBudget({
            category: budget.categoryKey,
            limit: budget.limit,
            icon: 'dining',
            periodType: (budget.periodType as 'MONTHLY' | 'CUSTOM') || 'MONTHLY',
            startDate: budget.startDate,
            endDate: budget.endDate
        });
        setIsAddModalOpen(true);
    };

    const handleSaveBudget = async (data: BudgetCapData) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            toast.error("User not authenticated");
            return;
        }

        try {
            if (editingId) {
                await BudgetService.updateBudget(Number(userId), editingId, {
                    category: data.category as CategoryType,
                    limitAmount: data.limit,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    periodType: data.periodType
                });
                toast.success("Budget updated successfully!");
            } else {
                await BudgetService.addBudget(Number(userId), {
                    category: data.category as CategoryType,
                    limitAmount: data.limit,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    periodType: data.periodType
                });
                toast.success("Budget added successfully!");
            }
            fetchBudgets();
            handleCloseModal();
        } catch (error) {
            console.error(error);
            toast.error("Failed to save budget");
        }
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setEditingId(null);
        setEditingBudget(undefined);
    };

    return (
        <div className="budget-caps-container">
            <Sidebar />
            
            <main className="budget-caps-main">
                {/* Header */}
                <div className="budget-header">
                    <Typography variant="h5" fontWeight="bold">Your Monthly Budget Caps</Typography>
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        className="add-budget-btn"
                        onClick={() => {
                            setEditingId(null);
                            setEditingBudget(undefined);
                            setIsAddModalOpen(true);
                        }}
                    >
                        Add New Budget Cap
                    </Button>
                </div>

                {/* Summary Cards (Note: These are hardcoded for now, can be updated later) */}
                {/* Dynamic Summary Cards */}
                <div className="summary-grid">
                    <div className="summary-card">
                        <div>
                            <div className="summary-title">Total Budget:</div>
                            <div className="summary-value">₹{budgets.reduce((acc, b) => acc + b.limit, 0).toLocaleString()} / Month</div>
                        </div>
                    </div>
                    
                    <div className="summary-card">
                        <div>
                            <div className="summary-title">Spent so far:</div>
                            <div className="summary-value amber">
                                ₹{budgets.reduce((acc, b) => acc + b.spent, 0).toLocaleString()} 
                                ({budgets.length > 0 ? Math.round((budgets.reduce((acc, b) => acc + b.spent, 0) / budgets.reduce((acc, b) => acc + b.limit, 0)) * 100) : 0}%)
                            </div>
                        </div>
                        <div className="summary-icon">
                            <WarningAmberIcon sx={{ color: '#d97706', fontSize: 28 }} />
                        </div>
                    </div>
                    
                    <div className="summary-card">
                        <div>
                            <div className="summary-title">Remaining:</div>
                            <div className="summary-value green">
                                ₹{(budgets.reduce((acc, b) => acc + b.limit, 0) - budgets.reduce((acc, b) => acc + b.spent, 0)).toLocaleString()}
                            </div>
                            <div className="summary-subtext">
                                (Safe for {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate()} days)
                            </div>
                        </div>
                        <div className="summary-icon">
                            <CheckCircleOutlineIcon sx={{ color: '#16a34a', fontSize: 28 }} />
                        </div>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="category-grid">
                    {budgets.map((budget) => (
                        <CategoryBudgetCard 
                            key={budget.id}
                            category={budget.category} 
                            icon={budget.icon} 
                            spent={budget.spent} 
                            limit={budget.limit} 
                            status={budget.status} 
                            statusColor={budget.statusColor}
                            customProgressColor={budget.customProgressColor}
                            onEdit={() => handleEditBudget(budget)}
                        />
                    ))}
                    {budgets.length === 0 && (
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 2, ml: 1 }}>
                            No budgets set yet. Click "Add New Budget Cap" to get started.
                        </Typography>
                    )}
                </div>

                <AddBudgetModal 
                    open={isAddModalOpen} 
                    onClose={handleCloseModal} 
                    onSave={handleSaveBudget} 
                    budgetToEdit={editingBudget}
                />
            </main>
        </div>
    );
};

export default BudgetCaps;
