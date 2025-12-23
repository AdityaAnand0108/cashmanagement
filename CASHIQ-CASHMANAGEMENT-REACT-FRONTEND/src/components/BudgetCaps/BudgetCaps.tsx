
import React, { useState, useEffect } from 'react';
import { Button, Typography, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import Sidebar from '../Sidebar/Sidebar';
import CategoryBudgetCard from './CategoryBudgetCard/CategoryBudgetCard';
import AddBudgetModal, { type BudgetCapData } from './AddBudgetModal/AddBudgetModal';
import './BudgetCaps.css';
import BudgetService from '../../services/BudgetService';
import { toast } from 'react-toastify';
import { CategoryType } from '../../models/CategoryType';
import ConfirmationModal from '../common/ConfirmationModal/ConfirmationModal';
import EmptyState from '../common/EmptyState/EmptyState';
import { getCategoryIcon } from '../../utils/CategoryIconUtils';

interface BudgetUI {
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
    const [budgets, setBudgets] = useState<BudgetUI[]>([]);
    const [editingBudget, setEditingBudget] = useState<BudgetCapData | undefined>(undefined);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const fetchBudgets = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        try {
            const data = await BudgetService.getUserBudgets(Number(userId));
            const mappedBudgets: BudgetUI[] = data.map(b => {
                const friendlyCategory = CategoryType[b.category as keyof typeof CategoryType] || b.category;
                return {
                    id: b.id || 0,
                    category: friendlyCategory,
                    categoryKey: b.category as CategoryType,
                    icon: getCategoryIcon(friendlyCategory),
                    spent: b.spentAmount || 0,
                    limit: b.limitAmount,
                    status: b.status || "On Track",
                    customProgressColor: (b.status === 'Exceeded' || b.status === 'At Risk') ? "#dc2626" : "#16a34a",
                    startDate: b.startDate,
                    endDate: b.endDate,
                    periodType: b.periodType
                };
            });
            setBudgets(mappedBudgets);
        } catch (error) {
            console.error("Failed to fetch budgets", error);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const handleEditBudget = (budget: BudgetUI) => {
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
            toast.error("User not found");
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

    const handleDeleteClick = (id: number) => {
        setDeletingId(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deletingId) return;
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        try {
            await BudgetService.deleteBudget(Number(userId), deletingId);
            toast.success("Budget deleted successfully");
            fetchBudgets();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete budget");
        } finally {
            setIsDeleteModalOpen(false);
            setDeletingId(null);
        }
    };

    // Calculations for Summary Cards
    const totalLimit = budgets.reduce((acc, b) => acc + b.limit, 0);
    const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
    const spentPercentage = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;
    
    // Dynamic Icon Logic for Spent Card
    let spentIcon = <InfoIcon sx={{ color: '#3b82f6', fontSize: 28 }} />;
    let spentColorClass = 'blue'; 
    let progressBarColor: "primary" | "secondary" | "error" | "info" | "success" | "warning" = "info";

    if (spentPercentage > 90) {
        spentIcon = <ErrorIcon sx={{ color: '#ef4444', fontSize: 28 }} />;
        spentColorClass = 'red';
        progressBarColor = "error";
    } else if (spentPercentage > 50) {
        spentIcon = <WarningAmberIcon sx={{ color: '#f59e0b', fontSize: 28 }} />;
        spentColorClass = 'amber';
        progressBarColor = "warning";
    } else {
        // 0-50%
        spentIcon = <CheckCircleOutlineIcon sx={{ color: '#22c55e', fontSize: 28 }} />;
        spentColorClass = 'green';
        progressBarColor = "success";
    }

    // Runway Logic
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const currentDay = new Date().getDate();
    const daysRemaining = daysInMonth - currentDay;

    return (
        <div className="budget-caps-container">
            <Sidebar />
            
            <main className="budget-caps-main">
                {/* Summary Cards */}
                <div className="summary-grid">
                    <div className="summary-card">
                        <div>
                            <div className="summary-title">Total Budget:</div>
                            <div className="summary-value">₹{totalLimit.toLocaleString()} / Month</div>
                        </div>
                    </div>
                    
                    <div className="summary-card">
                        <div style={{ width: '100%', paddingRight: '1rem' }}>
                            <div className="summary-title">Spent so far:</div>
                            <div className={`summary-value ${spentColorClass}`}>
                                ₹{totalSpent.toLocaleString()} 
                                <span style={{ fontSize: '0.9rem', marginLeft: '0.5rem', color: '#64748b' }}>
                                    ({Math.round(spentPercentage)}%)
                                </span>
                            </div>
                             <LinearProgress 
                                variant="determinate" 
                                value={Math.min(spentPercentage, 100)} 
                                color={progressBarColor}
                                sx={{ marginTop: '0.5rem', borderRadius: 4, height: 8 }}
                            />
                        </div>
                        <div className="summary-icon">
                            {spentIcon}
                        </div>
                    </div>
                    
                    <div className="summary-card">
                         <div>
                            <div className="summary-title">Remaining:</div>
                            <div className="summary-value green">
                                ₹{(totalLimit - totalSpent).toLocaleString()}
                            </div>
                            <div className="summary-subtext">
                                {totalLimit > 0 
                                    ? `(Safe for ${daysRemaining} days)` 
                                    : "(Set a budget to calculate runway)"}
                            </div>
                        </div>
                        <div className="summary-icon">
                            <CheckCircleOutlineIcon sx={{ color: '#16a34a', fontSize: 28 }} />
                        </div>
                    </div>
                </div>

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
                            onDelete={() => handleDeleteClick(budget.id)}
                        />
                    ))}
                    
                    {/* Empty State */}
                    {budgets.length === 0 && (
                        <EmptyState 
                            title="No budgets set yet"
                            description="Let's get proactive! Set a budget limit to track your spending and let our AI help you save more."
                            actionLabel="Set Your First Budget"
                            onAction={() => {
                                setEditingId(null);
                                setEditingBudget(undefined);
                                setIsAddModalOpen(true);
                            }}
                        />
                    )}
                </div>

                <AddBudgetModal 
                    open={isAddModalOpen} 
                    onClose={handleCloseModal} 
                    onSave={handleSaveBudget} 
                    budgetToEdit={editingBudget}
                />

                <ConfirmationModal 
                    open={isDeleteModalOpen}
                    title="Delete Budget Cap"
                    message="Are you sure you want to delete this budget cap? This action cannot be undone."
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    confirmText="Delete"
                />
            </main>
        </div>
    );
};

export default BudgetCaps;
