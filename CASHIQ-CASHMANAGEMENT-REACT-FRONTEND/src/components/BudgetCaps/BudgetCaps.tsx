import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Sidebar from '../Sidebar/Sidebar';
import CategoryBudgetCard from './CategoryBudgetCard/CategoryBudgetCard';
import AddBudgetModal,{type BudgetCapData } from './AddBudgetModal/AddBudgetModal';
import './BudgetCaps.css';

// Icons for new budgets
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import MovieIcon from '@mui/icons-material/Movie';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckroomIcon from '@mui/icons-material/Checkroom';

const iconMap: Record<string, React.ReactNode> = {
    'dining': <FastfoodIcon />,
    'groceries': <ShoppingCartIcon />,
    'transport': <LocalGasStationIcon />,
    'entertainment': <MovieIcon />,
    'utilities': <LightbulbIcon />,
    'shopping': <CheckroomIcon />
};

interface Budget {
    id: number;
    category: string;
    icon: React.ReactNode;
    spent: number;
    limit: number;
    status: string;
    statusColor?: string;
    customProgressColor?: string;
}

const BudgetCaps: React.FC = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [budgets, setBudgets] = useState<Budget[]>([
        { 
            id: 1, 
            category: "Groceries", 
            icon: "🥦", 
            spent: 425, 
            limit: 500, 
            status: "At Risk. 2 weeks left.", 
            customProgressColor: "#f97316" 
        },
        { 
            id: 2, 
            category: "Dining/Coffee", 
            icon: "☕", 
            spent: 195, 
            limit: 300, 
            status: "On Track.", 
            customProgressColor: "#f59e0b" 
        },
        { 
            id: 3, 
            category: "Entertainment", 
            icon: "🎬", 
            spent: 190, 
            limit: 200, 
            status: "Slow Down! Near limit.", 
            statusColor: "#dc2626",
            customProgressColor: "#dc2626" 
        },
        { 
            id: 4, 
            category: "Utilities", 
            icon: "💡", 
            spent: 120, 
            limit: 300, 
            status: "Great. Well under budget.", 
            customProgressColor: "#16a34a" 
        },
        { 
            id: 5, 
            category: "Transport", 
            icon: "🚗", 
            spent: 150, 
            limit: 250, 
            status: "On Track.", 
            customProgressColor: "#f59e0b" 
        }
    ]);

    const handleSaveBudget = (data: BudgetCapData) => {
        const newBudget: Budget = {
            id: Date.now(),
            category: data.category,
            icon: iconMap[data.icon] || "💰",
            spent: 0,
            limit: data.limit,
            status: "Fresh Start",
            customProgressColor: "#16a34a" // Green
        };
        setBudgets([...budgets, newBudget]);
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
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        Add New Budget Cap
                    </Button>
                </div>

                {/* Summary Cards */}
                <div className="summary-grid">
                    <div className="summary-card">
                        <div>
                            <div className="summary-title">Total Budget:</div>
                            <div className="summary-value">₹4,000 / Month</div>
                        </div>
                    </div>
                    
                    <div className="summary-card">
                        <div>
                            <div className="summary-title">Spent so far:</div>
                            <div className="summary-value amber">₹3,150 (78%)</div>
                        </div>
                        <div className="summary-icon">
                            <WarningAmberIcon sx={{ color: '#d97706', fontSize: 28 }} />
                        </div>
                    </div>
                    
                    <div className="summary-card">
                        <div>
                            <div className="summary-title">Remaining:</div>
                            <div className="summary-value green">₹850</div>
                            <div className="summary-subtext">(Safe for 13 days)</div>
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
                        />
                    ))}
                </div>

                <AddBudgetModal 
                    open={isAddModalOpen} 
                    onClose={() => setIsAddModalOpen(false)} 
                    onSave={handleSaveBudget} 
                />
            </main>
        </div>
    );
};

export default BudgetCaps;
