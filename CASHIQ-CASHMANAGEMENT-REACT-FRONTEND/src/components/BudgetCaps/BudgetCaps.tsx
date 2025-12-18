import React from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Sidebar from '../Sidebar/Sidebar';
import CategoryBudgetCard from './CategoryBudgetCard/CategoryBudgetCard';
import './BudgetCaps.css';

const BudgetCaps: React.FC = () => {
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
                    <CategoryBudgetCard 
                        category="Groceries" 
                        icon="🥦" 
                        spent={425} 
                        limit={500} 
                        status="At Risk. 2 weeks left." 
                        customProgressColor="#f97316" // Orange
                    />
                    <CategoryBudgetCard 
                        category="Dining/Coffee" 
                        icon="☕" 
                        spent={195} 
                        limit={300} 
                        status="On Track." 
                        customProgressColor="#f59e0b" // Amber
                    />
                    <CategoryBudgetCard 
                        category="Entertainment" 
                        icon="🎬" 
                        spent={190} 
                        limit={200} 
                        status="Slow Down! Near limit." 
                        statusColor="#dc2626"
                        customProgressColor="#dc2626" // Red
                    />
                    <CategoryBudgetCard 
                        category="Utilities" 
                        icon="💡" 
                        spent={120} 
                        limit={300} 
                        status="Great. Well under budget." 
                        customProgressColor="#16a34a" // Green
                    />
                    <CategoryBudgetCard 
                        category="Transport" 
                        icon="🚗" 
                        spent={150} 
                        limit={250} 
                        status="On Track." 
                        customProgressColor="#f59e0b" // Amber
                    />
                </div>
            </main>
        </div>
    );
};

export default BudgetCaps;
