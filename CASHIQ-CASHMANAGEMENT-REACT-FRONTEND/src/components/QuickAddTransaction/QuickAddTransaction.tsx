import React, { useState, useRef } from 'react';
import SmartExpenseService from '../../services/SmartExpenseService';
import TransactionService from '../../services/TransactionService';
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

        // Prepare DTO
        const transactionData: any = {
            description: description,
            amount: analyzedData?.amount || 0,
            category: analyzedData?.category || 'Uncategorized',
            date: analyzedData?.date || new Date().toISOString().split('T')[0],
            paymentSource: analyzedData?.payment_source || 'Unknown',
            type: 'EXPENSE' // Defaulting to EXPENSE for now, could infer from category/amount sign
        };

        // If no AI data, verify if we should ask user to fill details or just send defaults.
        // For Quick Add, we'll send what we have.

        try {
            await TransactionService.addTransaction(transactionData);
            toast.success('Transaction logged successfully!');
            setDescription('');
            setAnalyzedData(null);
        } catch (error) {
            toast.error('Failed to log transaction. Check backend connection.');
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

            <button className="log-button" onClick={handleLogIt}>
                Log it
            </button>
        </div>
    );
};

export default QuickAddTransaction;
