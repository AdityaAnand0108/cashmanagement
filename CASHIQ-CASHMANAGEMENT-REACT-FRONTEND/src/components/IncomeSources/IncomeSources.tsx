import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Typography } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import './IncomeSources.css';
import AddIncomeSourceModal from './AddIncomeSourceModal/AddIncomeSourceModal';
import ConfirmationModal from '../common/ConfirmationModal/ConfirmationModal';
import EmptyState from '../common/EmptyState/EmptyState';
import IncomeService from '../../services/IncomeService';
import type { IncomeDTO } from '../../models/Income';
import TransactionService from '../../services/TransactionService';
import type { TransactionDTO } from '../../models/Transaction';
import { formatCurrency } from '../../utils/CurrencyUtils';
import { calculateSmartNextPayDay, daysAgo, formatReadableDate } from '../../utils/DateUtils';
import { Chip, Menu, MenuItem, Button } from '@mui/material'; // Importing Chip for the "Last paid" tag
import FilterListIcon from '@mui/icons-material/FilterList';

// Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin'; // Using Bitcoin icon as per design
import IncomeTrendChart from './IncomeTrendChart';
import { PaymentFrequency } from '../../models/PaymentFrequency';

const IncomeSources: React.FC = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingIncome, setEditingIncome] = useState<IncomeDTO | undefined>(undefined);
    const [incomes, setIncomes] = useState<IncomeDTO[]>([]);
    const [recentTransactions, setRecentTransactions] = useState<TransactionDTO[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [incomeToDelete, setIncomeToDelete] = useState<number | null>(null);

    // Filters State
    const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'FIXED' | 'VARIABLE'>('ALL');
    const [frequencyFilter, setFrequencyFilter] = useState<PaymentFrequency | 'ALL'>('ALL');
    const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

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

    // Calculate growth (placeholder logic assuming comparison to previous month - requires history we may not have fully)
    // Ideally we'd sum up *last month's* transactions vs *this month's*. 
    // Using recentTransactions:
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

    // Filtering Logic
    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setFilterAnchorEl(event.currentTarget);
    };

    const handleFilterClose = (frequency: PaymentFrequency | 'ALL' | null) => {
        setFilterAnchorEl(null);
        if (frequency) {
            setFrequencyFilter(frequency);
        }
    };

    const filteredTransactions = useMemo(() => {
        // Create a map for quick access to income details by name (Assuming paymentSource matches income name)
        const incomeMap = new Map(incomes.map(inc => [inc.name, inc]));

        return recentTransactions.filter(tx => {
            const income = incomeMap.get(tx.paymentSource);
            
            // Category Filter
            if (categoryFilter === 'FIXED') {
                if (!income || !income.isFixed) return false;
            } else if (categoryFilter === 'VARIABLE') { // Freelance/Variable
                if (!income || income.isFixed) return false;
            }

            // Frequency Filter
            if (frequencyFilter !== 'ALL') {
                if (!income || income.frequency !== frequencyFilter) return false;
            }

            return true;
        });
    }, [recentTransactions, incomes, categoryFilter, frequencyFilter]);

    return (
        <div className="income-sources-container">
            <Sidebar />
            <main className="income-main">
                <div className="content-scrollable">

                    {/* Total Income Banner */}
                    <div className="total-income-banner">
                        <div className="banner-content">
                            <h3>Total Monthly Income</h3>
                            <div className="growth-indicator-wrapper">
                                <div className="total-amount">{formatCurrency(totalIncome)}</div>
                                <Chip 
                                    label={`${growth >= 0 ? '+' : ''}${growth.toFixed(0)}%`}
                                    size="small"
                                    className={growth >= 0 ? 'growth-chip-positive' : 'growth-chip-negative'}
                                />
                            </div>
                            <p className="banner-subtext">Based on {incomes.length} active sources.</p>
                        </div>
                        <div className="banner-chart">
                            <IncomeTrendChart transactions={recentTransactions} />
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="action-bar">
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
                            <EmptyState 
                                title="No income sources set yet"
                                description="Let's get started! Add your salary, freelance work, or other income sources to track your cash flow."
                                actionLabel="Add Your First Income"
                                onAction={handleAddClick}
                            />
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
                                        <div className="source-amount">{formatCurrency(source.amount)}</div>
                                        <div className="source-next-date">
                                            Next payday: {formatReadableDate(calculateSmartNextPayDay(source.nextPayDay, source.frequency))}
                                            {daysAgo(source.nextPayDay) > 0 && source.frequency !== 'ONE_TIME' && (
                                                <div className="last-paid-wrapper">
                                                    <Chip 
                                                        label={`Last paid: ${daysAgo(source.nextPayDay)} days ago`} 
                                                        size="small" 
                                                        color="warning" 
                                                        variant="outlined"
                                                        className="last-paid-chip"
                                                    />
                                                </div>
                                            )}
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
                        <div className="recent-income-header">
                            <h3>Recent Income Transactions</h3>
                            <div className="income-filters">
                                <span className="filter-label">Category:</span>
                                <Chip 
                                    label="Fixed" 
                                    onClick={() => setCategoryFilter(categoryFilter === 'FIXED' ? 'ALL' : 'FIXED')}
                                    icon={<BusinessCenterIcon className="filter-icon-fixed" />}
                                    className={categoryFilter === 'FIXED' ? 'filter-chip-fixed-active' : 'filter-chip-fixed'}
                                />
                                <Chip 
                                    label="Freelance" 
                                    onClick={() => setCategoryFilter(categoryFilter === 'VARIABLE' ? 'ALL' : 'VARIABLE')}
                                    icon={<LaptopMacIcon className="filter-icon-variable" />}
                                    className={categoryFilter === 'VARIABLE' ? 'filter-chip-variable-active' : 'filter-chip-variable'}
                                />
                                
                                <Button 
                                    variant={frequencyFilter !== 'ALL' ? 'contained' : 'outlined'} 
                                    size="small"
                                    startIcon={<FilterListIcon />}
                                    onClick={handleFilterClick}
                                    className={frequencyFilter !== 'ALL' ? 'filter-button-active' : 'filter-button'}
                                >
                                    {frequencyFilter === 'ALL' ? 'Filter' : `Freq: ${frequencyFilter}`}
                                </Button>
                                <Menu
                                    anchorEl={filterAnchorEl}
                                    open={Boolean(filterAnchorEl)}
                                    onClose={() => handleFilterClose(null)}
                                >
                                    <MenuItem onClick={() => handleFilterClose('ALL')}>All Frequencies</MenuItem>
                                    {Object.values(PaymentFrequency).map(freq => (
                                        <MenuItem key={freq} onClick={() => handleFilterClose(freq)}>
                                            {freq}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        </div>
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
                                    {filteredTransactions.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="transaction-empty-cell">
                                                <div className="transaction-empty-wrapper">
                                                    <ReceiptLongIcon className="transaction-empty-icon" />
                                                    <Typography variant="body1" color="text.secondary">
                                                        No transactions found for this filter
                                                    </Typography>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTransactions.map((tx: TransactionDTO, idx: number) => (
                                            <tr key={idx}>
                                                <td>{tx.date}</td>
                                                <td>{tx.paymentSource}</td>
                                                <td className="amount-positive">+{formatCurrency(tx.amount)}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Upcoming Income & Growth Insights */}
                    <div className="insights-section">
                        <div className="insights-header">
                            <h3>Upcoming Income & Growth Insights</h3>
                            <p className="insights-description">
                                Predictive analysis and makes upcoming calculations, you can tap to manage how to increase your income.
                            </p>
                        </div>
                        <div className="insights-grid">
                            {/* Card 1: Predictive Income */}
                            <div className="insight-card">
                                <div className="insight-header-row">
                                    <div className="insight-icon-wrapper insight-icon-predictive">
                                        <TrendingUpIcon />
                                    </div>
                                    <div className="insight-text">
                                        <h4>Predictive Income Analysis</h4>
                                        <p>Predictive analysis and makes upcoming calculations, you can tap to manage how to increase your income.</p>
                                    </div>
                                </div>
                                <button className="insight-action-btn">View Details</button>
                            </div>

                            {/* Card 2: Tips */}
                            <div className="insight-card">
                                <div className="insight-header-row">
                                    <div className="insight-icon-wrapper insight-icon-tips">
                                        <CurrencyBitcoinIcon />
                                    </div>
                                    <div className="insight-text">
                                        <h4>Tips To Increase your Income</h4>
                                        <p>Actionable tips and strategies based on your profile and market trends.</p>
                                    </div>
                                </div>
                                <button className="insight-action-btn">See Tips</button>
                            </div>
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
