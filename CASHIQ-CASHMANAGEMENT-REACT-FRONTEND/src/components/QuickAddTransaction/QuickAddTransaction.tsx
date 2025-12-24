import React, { useState, useRef } from 'react';
import { CircularProgress } from '@mui/material';
import SmartExpenseService from '../../services/SmartExpenseService';
import TransactionService from '../../services/TransactionService';
import { type TransactionDTO } from '../../models/Transaction';
import { toast } from 'react-toastify';
import './QuickAddTransaction.css';

interface AnalyzedData {
    amount: number;
    category: string;
    date: string;
    payment_source: string;
}

const QuickAddTransaction: React.FC = () => {
    const [description, setDescription] = useState('');
    const [analyzedData, setAnalyzedData] = useState<AnalyzedData | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isLogging, setIsLogging] = useState(false);
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setDescription(value);

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        if (value.trim().length > 5) {
            setIsAnalyzing(true); // Show loading state early
            debounceTimerRef.current = setTimeout(() => {
                analyzeExpense(value);
            }, 1000); // Debounce for 1 second
        } else {
            setAnalyzedData(null);
            setIsAnalyzing(false);
        }
    };

    const analyzeExpense = async (text: string) => {
        try {
            const response = await SmartExpenseService.analyzeExpense(text);
            if (response && response.parsed_data) {
                setAnalyzedData(response.parsed_data);
            }
        } catch (error) {
            console.error("AI Analysis failed", error);
            // Silent fail for auto-analysis, or simple indicator
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleLogIt = async () => {
        if (!description.trim()) {
            toast.warning('Please enter a description');
            return;
        }

        setIsLogging(true);

        // Prepare DTO
        const transactionData: TransactionDTO = {
            description: description,
            amount: analyzedData?.amount || 0,
            category: analyzedData?.category || 'Uncategorized',
            date: analyzedData?.date || new Date().toISOString().split('T')[0],
            paymentSource: analyzedData?.payment_source || 'Unknown',
            type: 'EXPENSE' // Defaulting to EXPENSE for now, could infer from category/amount sign
        };

        try {
            // Artificial delay to simulate "thinking"
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            await TransactionService.addTransaction(transactionData);
            toast.success('Transaction logged successfully!');
            setDescription('');
            setAnalyzedData(null);
        } catch (error) {
            console.error(error); // Log error to fix unused variable
            toast.error('Failed to log transaction. Check backend connection.');
        } finally {
            setIsLogging(false);
        }
    };

    return (
        <div className="quick-add-container">
            <div className="quick-add-header">
                <h3 className="quick-add-title">Quick Add Transaction</h3>
                <span className="sparkle-icon">✨</span>
            </div>

            <div className="input-wrapper">
                <textarea
                    className="transaction-input"
                    placeholder="e.g., Starbucks ₹500, Uber ₹300 yesterday..."
                    value={description}
                    onChange={handleInputChange}
                    rows={2}
                />
                                {/* Tooltip appears when there is data or loading */}
                <div className={`ai-tooltip ${(analyzedData || isAnalyzing) && description.length > 0 ? 'visible' : ''}`}>
                    <div className="ai-tooltip-header">
                        <span>AI Detected:</span>
                        {isAnalyzing && <div className="ai-loading-spinner" />}
                    </div>
                    
                    {analyzedData && !isAnalyzing && (
                        <div className="ai-content">
                            <span className="ai-item">
                                <span className="ai-label">Amount:</span>
                                <span className="ai-value">₹{analyzedData.amount}</span>
                            </span>
                            <span className="ai-item">|</span>
                            <span className="ai-item">
                                <span className="ai-label">Merchant:</span>
                                <span className="ai-value">{analyzedData.payment_source || 'Unknown'}</span>
                            </span>
                             <span className="ai-item">|</span>
                            <span className="ai-item">
                                <span className="ai-label">Category:</span>
                                <span className="ai-value">{analyzedData.category} ☕</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <button 
                className={`log-button ${isLogging ? 'logging' : ''}`} 
                onClick={handleLogIt}
                disabled={isLogging}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
                {isLogging ? (
                    <>
                        <CircularProgress size={16} color="inherit" />
                        Analyzing...
                    </>
                ) : (
                    "Log it"
                )}
            </button>
        </div>
    );
};

export default QuickAddTransaction;
