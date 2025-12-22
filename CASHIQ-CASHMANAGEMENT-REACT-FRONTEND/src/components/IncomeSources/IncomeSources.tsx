import React, { useEffect, useState, useCallback } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import './IncomeSources.css';
import AddIncomeSourceModal from './AddIncomeSourceModal/AddIncomeSourceModal';
import ConfirmationModal from '../common/ConfirmationModal/ConfirmationModal';
import IncomeService from '../../services/IncomeService';
import type { IncomeDTO } from '../../models/Income';
import TransactionService from '../../services/TransactionService';
import type { TransactionDTO } from '../../models/Transaction';

// Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const IncomeSources: React.FC = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingIncome, setEditingIncome] = useState<IncomeDTO | undefined>(undefined);
    const [incomes, setIncomes] = useState<IncomeDTO[]>([]);
    const [recentTransactions, setRecentTransactions] = useState<TransactionDTO[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [incomeToDelete, setIncomeToDelete] = useState<number | null>(null);

    const fetchIncomes = useCallback(async () => {
        try {
            const data = await IncomeService.getAllIncomes();
            setIncomes(data);
        } catch (error) {
            console.error("Failed to fetch incomes", error);
        }
    }, []);

    const fetchTransactions = useCallback(async () => {
        try {
            const data = await TransactionService.getAllTransactions();
            console.log("Fetched Transactions:", data); // DEBUG: Check raw data
            const incomeTransactions = data.filter(tx => tx.type === 'INCOME');
            console.log("Filtered Income Transactions:", incomeTransactions); // DEBUG: Check filtered data
            // Sort by date descending if needed, but assuming backend order or basic list for now
            setRecentTransactions(incomeTransactions);
        } catch (error) {
           console.error("Failed to fetch transactions", error);
        }
    }, []);

    const loadData = useCallback(async () => {
        setLoading(true);
        await Promise.all([fetchIncomes(), fetchTransactions()]);
        setLoading(false);
    }, [fetchIncomes, fetchTransactions]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleAddClick = () => {
        setEditingIncome(undefined);
        setIsAddModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setEditingIncome(undefined);
    };

    const handleSaveIncome = async (income: IncomeDTO) => {
        if (income.id) {
            await IncomeService.updateIncome(income.id, income);
        } else {
            await IncomeService.addIncome(income);
        }
        await fetchIncomes();
    };

    const handleEditClick = (income: IncomeDTO) => {
        setEditingIncome(income);
        setIsAddModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setIncomeToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (incomeToDelete) {
            try {
                await IncomeService.deleteIncome(incomeToDelete);
                await fetchIncomes();
                setIsDeleteModalOpen(false);
                setIncomeToDelete(null);
            } catch (error) {
                console.error("Failed to delete income", error);
            }
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setIncomeToDelete(null);
    };

    // Calculate total income
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

    return (
        <div className="income-sources-container">
            <Sidebar />
            <main className="income-main">
                <div className="content-scrollable">


                    {/* Total Income Banner */}
                    <div className="total-income-banner">
                        <div className="banner-content">
                            <h3>Total Monthly Income</h3>
                            <div className="total-amount">₹{totalIncome.toFixed(2)}</div>
                            <p className="banner-subtext">Based on {incomes.length} active sources.</p>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="action-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <Typography variant="h5" fontWeight="bold">Your Income Sources</Typography>
                        <button className="add-source-btn" onClick={handleAddClick}>
                            <AddIcon fontSize="small" /> Add New Income Source
                        </button>
                    </div>

                    {/* Income Sources List */}
                    <div className="sources-list">
                        {loading ? (
                            <p>Loading income sources...</p>
                        ) : incomes.length === 0 ? (
                            <Box className="empty-state-container">
                                <SmartToyIcon className="empty-state-icon" />
                                <Typography variant="h6" className="empty-state-title">
                                    No income sources set yet
                                </Typography>
                                <Typography variant="body1" className="empty-state-text">
                                    Let's get started! Add your salary, freelance work, or other income sources to track your cash flow.
                                </Typography>
                                <Button 
                                    variant="outlined" 
                                    startIcon={<AddIcon />}
                                    onClick={handleAddClick}
                                >
                                    Add Your First Income
                                </Button>
                            </Box>
                        ) : (
                            incomes.map((source) => (
                                <div key={source.id} className="source-card">
                                    <div className="source-icon-wrapper">
                                        <span className="source-icon">
                                            {/* Simple icon mapping based on string value could be improved */}
                                            {source.icon === 'briefcase' ? '💼' :
                                             source.icon === 'laptop' ? '💻' :
                                             source.icon === 'store' ? '🏪' : '🏠'}
                                        </span>
                                    </div>
                                    <div className="source-details">
                                        <h4 className="source-name">{source.name}</h4>
                                        <p className="source-meta">
                                            {source.frequency} · {source.isFixed ? 'Fixed' : 'Variable'}
                                        </p>
                                    </div>
                                    <div className="source-financials">
                                        <div className="source-amount">₹{source.amount.toFixed(2)}</div>
                                        <div className="source-next-date">
                                            Next payday: {source.nextPayDay}
                                        </div>
                                    </div>
                                    <button className="edit-btn" onClick={() => handleEditClick(source)}>
                                        <EditIcon fontSize="small" /> Edit
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDeleteClick(source.id!)}>
                                        <DeleteIcon fontSize="small" /> Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Recent Transactions Table */}
                    <div className="recent-income-section">
                        <h3>Recent Income Transactions</h3>
                        <div className="table-container">
                            <table className="income-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Source</th>
                                        <th className="text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentTransactions.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="transaction-empty-cell">
                                                <div className="transaction-empty-wrapper">
                                                    <ReceiptLongIcon className="transaction-empty-icon" />
                                                    <Typography variant="body1" color="text.secondary">
                                                        No recent income transactions found
                                                    </Typography>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        recentTransactions.map((tx, idx) => (
                                            <tr key={idx}>
                                                <td>{tx.date}</td>
                                                <td>{tx.paymentSource}</td>
                                                <td className="amount-positive">+₹{tx.amount}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {/* Add/Edit Income Modal */}
            <AddIncomeSourceModal 
                open={isAddModalOpen} 
                onClose={handleCloseModal} 
                onSave={handleSaveIncome}
                incomeToEdit={editingIncome}
            />
            {/* Confirmation Modal */}
            <ConfirmationModal 
                open={isDeleteModalOpen}
                title="Delete Income Source"
                message="Are you sure you want to delete this income source? This action cannot be undone."
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                confirmText="Delete"
            />
        </div>
    );
};

export default IncomeSources;
