import React from 'react';
import { Chip } from '@mui/material';
import { formatCurrency } from '../../../utils/CurrencyUtils';
import type { TransactionDTO } from '../../../models/Transaction';
import IncomeTrendChart from '../IncomeTrendChart/IncomeTrendChart';
import './IncomeOverviewBanner.css';

interface IncomeOverviewBannerProps {
    totalIncome: number;
    growth: number;
    activeSourcesCount: number;
    recentTransactions: TransactionDTO[];
}

const IncomeOverviewBanner: React.FC<IncomeOverviewBannerProps> = ({ 
    totalIncome, 
    growth, 
    activeSourcesCount, 
    recentTransactions 
}) => {
    return (
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
                <p className="banner-subtext">Based on {activeSourcesCount} active sources.</p>
            </div>
            <div className="banner-chart">
                <IncomeTrendChart transactions={recentTransactions} />
            </div>
        </div>
    );
};

export default IncomeOverviewBanner;
