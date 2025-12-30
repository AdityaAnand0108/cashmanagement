import React, { useEffect, useState, useCallback } from 'react';
import { Button, Typography, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../Sidebar/Sidebar';
import DebtSummaryCard from './DebtSummaryCard/DebtSummaryCard';
import DebtItemCard from './DebtItemCard/DebtItemCard';
import './DebtsIOUs.css';
import DebtService from '../../services/DebtService';
import { DebtType, DebtStatus } from '../../models/Debt';
import type { DebtEntryDTO, DebtSummaryDTO } from '../../models/Debt';
import AddDebtModal from './AddDebtModal/AddDebtModal';
import { toast } from 'react-toastify';
import { formatCurrency } from '../../utils/CurrencyUtils';
import { formatReadableDate } from '../../utils/DateUtils';
import EmptyState from '../common/EmptyState/EmptyState';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

/**
 * Main page component for managing Debts and IOUs.
 * Displays summary cards and lists of debts.
 */
const DebtsIOUs: React.FC = () => {
    const [debts, setDebts] = useState<DebtEntryDTO[]>([]);
    const [summary, setSummary] = useState<DebtSummaryDTO>({ totalOwedByUser: 0, totalOwedToUser: 0 });
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);

    // Initial User ID Check
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(parseInt(storedUserId));
        }
    }, []);

    // Data Fetching
    const loadData = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const [debtsData, summaryData] = await Promise.all([
                DebtService.getAllDebts(userId),
                DebtService.getDebtSummary(userId)
            ]);
            setDebts(debtsData);
            setSummary(summaryData);
        } catch (error) {
            console.error("Failed to load debts:", error);
            toast.error("Failed to load debts.");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        loadData();
    }, [loadData]);


    const handleSaveDebt = async (newDebt: DebtEntryDTO) => {
        if (!userId) return;
        try {
            await DebtService.createDebt(userId, newDebt);
            toast.success("Debt created successfully!");
            setIsAddModalOpen(false);
            loadData();
        } catch (error) {
            console.error("Failed to save debt:", error);
            toast.error("Failed to save debt.");
        }
    };

    const handlePay = async (id: number, amount: number) => {
        if (!userId) return;
        try {
           await DebtService.recordPayment(userId, id, amount);
           toast.success("Payment recorded!");
           loadData(); // Refresh to see updated balance/status
        } catch (error) {
            console.error("Failed to record payment:", error);
            toast.error("Failed to record payment.");
        }
    };

    const handleSettle = async (id: number, currentBalance: number) => {
        // Quick settle full amount
        handlePay(id, currentBalance);
    };

    const handleRemind = (id: number) => {
        console.log(`Remind logic for ${id}`);
        toast.info("Reminder feature coming soon!");
    };

    // Keep for future use or remove if strict cleanup is needed.
    // const handleDelete = async (id: number) => { ... }


    const debtsOwedByUser = debts.filter(d => d.debtType === DebtType.OWED_BY_USER && d.status !== DebtStatus.SETTLED);
    const debtsOwedToUser = debts.filter(d => d.debtType === DebtType.OWED_TO_USER && d.status !== DebtStatus.SETTLED);

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
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        Add New Debt / IOU
                    </Button>
                </div>

                {/* Summary Section */}
                <div className="debt-summary-section">
                    <DebtSummaryCard 
                        type="owe" 
                        amount={summary.totalOwedByUser} 
                        breakdown={`${debtsOwedByUser.length} active debts.`} 
                    />
                    <DebtSummaryCard 
                        type="owed" 
                        amount={summary.totalOwedToUser} 
                        breakdown={`${debtsOwedToUser.length} active IOUs.`} 
                    />
                </div>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        {/* Debts You Owe */}
                        <div className="debt-list-section">
                            <Typography className="section-title">Debts You Owe (Money Out)</Typography>
                            {debtsOwedByUser.length === 0 ? (
                                <EmptyState 
                                    message="You are debt free! 🎉" 
                                    description="Great job! You don't owe anyone anything right now."
                                    icon={<SentimentVerySatisfiedIcon fontSize="inherit" />}
                                />
                            ) : (
                                <div className="debt-cards-grid">
                                    {debtsOwedByUser.map(debt => (
                                        <DebtItemCard 
                                            key={debt.id}
                                            title={debt.title} 
                                            icon="💸" 
                                            amount={debt.currentBalance} // Pass raw number
                                            formattedAmount={formatCurrency(debt.currentBalance)} // Pass formatted string
                                            details={debt.dueDate ? `Due: ${formatReadableDate(debt.dueDate)}` : 'No due date'} 
                                            actionLabel="Pay" 
                                            type="owe"
                                            urgencyTag={debt.interestRate ? `Interest: ${debt.interestRate}%` : undefined}
                                            onAction={() => handleSettle(debt.id!, debt.currentBalance)} 
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* IOUs Owed to You */}
                        <div className="debt-list-section">
                            <Typography className="section-title">IOUs Owed to You (Money In)</Typography>
                             {debtsOwedToUser.length === 0 ? (
                                <EmptyState 
                                    message="No active IOUs" 
                                    description="No one owes you money right now. Track a new IOU above."
                                    icon={<AccountBalanceWalletIcon fontSize="inherit" />}
                                />
                            ) : (
                                <div className="debt-cards-grid">
                                    {debtsOwedToUser.map(debt => (
                                        <DebtItemCard 
                                            key={debt.id}
                                            title={debt.title} 
                                            icon="💰" 
                                            amount={debt.currentBalance}
                                            formattedAmount={formatCurrency(debt.currentBalance)}
                                            details={`Counterparty: ${debt.counterparty || 'Unknown'}`} 
                                            actionLabel="Remind" 
                                            type="owed"
                                            onAction={() => handleRemind(debt.id!)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                <AddDebtModal 
                    open={isAddModalOpen} 
                    onClose={() => setIsAddModalOpen(false)} 
                    onSave={handleSaveDebt} 
                />

            </main>
        </div>
    );
};

export default DebtsIOUs;
