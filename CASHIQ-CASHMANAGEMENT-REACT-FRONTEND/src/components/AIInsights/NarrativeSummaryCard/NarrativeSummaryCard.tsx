import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './NarrativeSummaryCard.css';

const NarrativeSummaryCard: React.FC = () => {
    return (
        <div className="narrative-card">
            <div className="narrative-content">
                <div className="narrative-title">
                    Your November Financial Story <span>🗓️</span>
                </div>
                <div className="narrative-text">
                    Overall, November was a stable month. You earned ₹5,200 and spent ₹3,450, resulting in a net positive cash flow of ₹1,750. 
                    Your biggest expense was 'Rent' (₹1,200), followed by 'Groceries' (₹425). Good job staying within your 'Utilities' budget! 
                    However, your 'Entertainment' spending was 20% higher than October. You also successfully paid off ₹100 of your Student Loan. 
                    Your Net Worth increased by ₹1,100.
                </div>
            </div>
            
            <div className="narrative-stats">
                <div className="stat-box success">
                    <div className="stat-label">Net Cash Flow:</div>
                    <div className="stat-value green">
                        +₹1,750 <ArrowUpwardIcon fontSize="small" />
                    </div>
                </div>
                
                <div className="stat-box">
                    <div className="stat-label">Top Spending Category:</div>
                    <div className="stat-value">
                        Rent (₹1,200) <span>🏠</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NarrativeSummaryCard;
