import React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import './IncomeInsights.css';

const IncomeInsights: React.FC = () => {
    return (
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
    );
};

export default IncomeInsights;
