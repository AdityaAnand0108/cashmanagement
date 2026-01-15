import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './IncomeSources.css';
import AddIncomeSourceModal from './AddIncomeSourceModal/AddIncomeSourceModal';
import ConfirmationModal from '../common/ConfirmationModal/ConfirmationModal';
import IncomeService from '../../services/IncomeService';
import type { IncomeDTO } from '../../models/Income';
import TransactionService from '../../services/TransactionService';
import type { TransactionDTO } from '../../models/Transaction';
import IncomeOverviewBanner from './IncomeOverviewBanner/IncomeOverviewBanner';
import IncomeSourceList from './IncomeSourceList/IncomeSourceList';
import RecentIncomeTransactions from './RecentIncomeTransactions/RecentIncomeTransactions';
import IncomeInsights from './IncomeInsights/IncomeInsights';

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
            const incomeTransactions = data.filter(tx => tx.type === 'INCOME');
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

    // Calculate growth
    const calculateGrowth = () => {
        if (!recentTransactions.length) return 0;
        
        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();
        
        const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonth = lastMonthDate.getMonth();
        const lastMonthYear = lastMonthDate.getFullYear();

        const thisMonthIncome = recentTransactions
            .filter(tx => {
                const d = new Date(tx.date!);
                return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
            })
            .reduce((sum, tx) => sum + tx.amount, 0);

        const lastMonthIncome = recentTransactions
            .filter(tx => {
                const d = new Date(tx.date!);
                return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
            })
            .reduce((sum, tx) => sum + tx.amount, 0);

        if (lastMonthIncome === 0) return thisMonthIncome > 0 ? 100 : 0;
        return ((thisMonthIncome - lastMonthIncome) / lastMonthIncome) * 100;
    };
    
    const growth = calculateGrowth();

    return (
        <div className="income-sources-container">
            <Sidebar />
            <main className="income-main">
                <div className="content-scrollable">
                    <IncomeOverviewBanner 
                        totalIncome={totalIncome}
                        growth={growth}
                        activeSourcesCount={incomes.length}
                        recentTransactions={recentTransactions}
                    />

                    <IncomeSourceList 
                        incomes={incomes}
                        loading={loading}
                        onAddClick={handleAddClick}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
                    />

                    <RecentIncomeTransactions 
                        recentTransactions={recentTransactions}
                        incomes={incomes}
                    />

                    <IncomeInsights />
                </div>
            </main>

            <AddIncomeSourceModal 
                open={isAddModalOpen} 
                onClose={handleCloseModal} 
                onSave={handleSaveIncome}
                incomeToEdit={editingIncome}
            />
            
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
