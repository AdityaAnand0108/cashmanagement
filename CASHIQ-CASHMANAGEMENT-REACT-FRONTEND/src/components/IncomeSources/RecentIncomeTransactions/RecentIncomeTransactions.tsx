import React, { useState, useMemo } from 'react';
import { Typography, Chip, Button, Menu, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import type { TransactionDTO } from '../../../models/Transaction';
import type { IncomeDTO } from '../../../models/Income';
import { PaymentFrequency } from '../../../models/PaymentFrequency';
import { formatCurrency } from '../../../utils/CurrencyUtils';
import './RecentIncomeTransactions.css';

interface RecentIncomeTransactionsProps {
    recentTransactions: TransactionDTO[];
    incomes: IncomeDTO[];
}

const RecentIncomeTransactions: React.FC<RecentIncomeTransactionsProps> = ({ 
    recentTransactions, 
    incomes 
}) => {
    // Filters State managed internally
    const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'FIXED' | 'VARIABLE'>('ALL');
    const [frequencyFilter, setFrequencyFilter] = useState<PaymentFrequency | 'ALL'>('ALL');
    const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

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
        // Create a map for quick access to income details by name
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
    );
};

export default RecentIncomeTransactions;
