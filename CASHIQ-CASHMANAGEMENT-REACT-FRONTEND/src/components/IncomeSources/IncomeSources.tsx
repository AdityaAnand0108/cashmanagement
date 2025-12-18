import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './IncomeSources.css';
import AddIncomeSourceModal from './AddIncomeSourceModal/AddIncomeSourceModal';
import IncomeService from '../../services/IncomeService';
import type { IncomeDTO } from '../../services/IncomeService';
import TransactionService from '../../services/TransactionService';
import type { TransactionDTO } from '../../services/TransactionService';

// Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const IncomeSources: React.FC = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingIncome, setEditingIncome] = useState<IncomeDTO | undefined>(undefined);
    const [incomes, setIncomes] = useState<IncomeDTO[]>([]);
    const [recentTransactions, setRecentTransactions] = useState<TransactionDTO[]>([]);
    const [loading, setLoading] = useState(true);

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
            const incomeTransactions = data.filter(tx => tx.type === 'INCOME');
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
                    <div className="action-bar">
                        <button className="add-source-btn" onClick={handleAddClick}>
                            <AddIcon fontSize="small" /> Add New Income Source
                        </button>
                    </div>

                    {/* Income Sources List */}
                    <div className="sources-list">
                        {loading ? (
                            <p>Loading income sources...</p>
                        ) : incomes.length === 0 ? (
                            <p>No income sources added yet.</p>
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
                                            <td colSpan={3} style={{textAlign: 'center'}}>No recent income transactions found.</td>
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
        </div>
    );
};

export default IncomeSources;
