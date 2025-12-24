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
                <div className="narrative-text" dangerouslySetInnerHTML={{
                    __html: `Overall, November was a stable month. You earned <b>₹5,200</b> and spent <b>₹3,450</b>, resulting in a <span style="color: #16a34a; font-weight: 600;">net positive cash flow of ₹1,750</span>. 
                    Your biggest expense was <b>'Rent' (₹1,200)</b>, followed by <b>'Groceries' (₹425)</b>. Good job staying within your <span style="color: #16a34a;">'Utilities'</span> budget! 
                    However, your <span style="color: #ef4444;">'Entertainment' spending was 20% higher</span> than October. You also successfully paid off ₹100 of your Student Loan. 
                    Your Net Worth increased by <span style="color: #16a34a; font-weight: 600;">₹1,100</span>.`
                }} />
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
