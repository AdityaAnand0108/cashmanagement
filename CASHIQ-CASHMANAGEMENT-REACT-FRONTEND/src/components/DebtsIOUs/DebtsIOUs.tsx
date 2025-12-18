import React from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../Sidebar/Sidebar';
import DebtSummaryCard from './DebtSummaryCard/DebtSummaryCard';
import DebtItemCard from './DebtItemCard/DebtItemCard';
import './DebtsIOUs.css';

const DebtsIOUs: React.FC = () => {
    const handlePay = (id: string) => {
        console.log(`Pay debt ${id}`);
    };

    const handleSettle = (id: string) => {
        console.log(`Settle debt ${id}`);
    };

    const handleRemind = (id: string) => {
        console.log(`Remind IOU ${id}`);
    };

    return (
        <div className="debts-ious-container">
            <Sidebar />
            
            <main className="debts-ious-main">
                {/* Header */}
                <div className="debts-header">
                    <Typography variant="h5" fontWeight="bold">Your Debts & IOUs</Typography>
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        className="add-debt-btn"
                    >
                        Add New Debt / IOU
                    </Button>
                </div>

                {/* Summary Section */}
                <div className="debt-summary-section">
                    <DebtSummaryCard 
                        type="owe" 
                        amount={1450} 
                        breakdown="Loans: ₹1,200 | IOUs to friends: ₹250." 
                    />
                    <DebtSummaryCard 
                        type="owed" 
                        amount={300} 
                        breakdown="IOUs from friends: ₹300." 
                    />
                </div>

                {/* Debts You Owe */}
                <div className="debt-list-section">
                    <Typography className="section-title">Debts You Owe (Money Out)</Typography>
                    <div className="debt-cards-grid">
                        <DebtItemCard 
                            title="Student Loan" 
                            icon="🎓" 
                            amount={1200} 
                            details="Next payment: ₹100 on Dec 25." 
                            actionLabel="Pay" 
                            type="owe"
                            onAction={() => handlePay('1')}
                        />
                        <DebtItemCard 
                            title="IOU to Sarah (Concert tickets)" 
                            icon="🎟️" 
                            amount={250} 
                            details="Due date: Jan 1, 2026." 
                            actionLabel="Settle" 
                            type="owe"
                            onAction={() => handleSettle('2')}
                        />
                    </div>
                </div>

                {/* IOUs Owed to You */}
                <div className="debt-list-section">
                    <Typography className="section-title">IOUs Owed to You (Money In)</Typography>
                    <div className="debt-cards-grid">
                        <DebtItemCard 
                            title="IOU from Mike (Dinner split)" 
                            icon="🍽️" 
                            amount={300} 
                            details="Status: Pending since Nov 30." 
                            actionLabel="Remind" 
                            type="owed"
                            onAction={() => handleRemind('3')}
                        />
                    </div>
                </div>

            </main>
        </div>
    );
};

export default DebtsIOUs;
