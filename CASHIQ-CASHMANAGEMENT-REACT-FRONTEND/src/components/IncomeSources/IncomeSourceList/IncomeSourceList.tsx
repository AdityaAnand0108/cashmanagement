import React from 'react';
import { Typography, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { IncomeDTO } from '../../../models/Income';
import { formatCurrency } from '../../../utils/CurrencyUtils';
import { calculateSmartNextPayDay, daysAgo, formatReadableDate } from '../../../utils/DateUtils';
import EmptyState from '../../common/EmptyState/EmptyState';
import './IncomeSourceList.css';

interface IncomeSourceListProps {
    incomes: IncomeDTO[];
    loading: boolean;
    onAddClick: () => void;
    onEditClick: (income: IncomeDTO) => void;
    onDeleteClick: (id: number) => void;
}

const IncomeSourceList: React.FC<IncomeSourceListProps> = ({ 
    incomes, 
    loading, 
    onAddClick, 
    onEditClick, 
    onDeleteClick 
}) => {
    return (
        <>
            {/* Action Bar */}
            <div className="action-bar">
                <Typography variant="h5" fontWeight="bold">Your Income Sources</Typography>
                <button className="add-source-btn" onClick={onAddClick}>
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
                        onAction={onAddClick}
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
                            <button className="edit-btn" onClick={() => onEditClick(source)}>
                                <EditIcon fontSize="small" /> Edit
                            </button>
                            <button className="delete-btn" onClick={() => (source.id !== undefined && onDeleteClick(source.id))}>
                                <DeleteIcon fontSize="small" /> Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default IncomeSourceList;
