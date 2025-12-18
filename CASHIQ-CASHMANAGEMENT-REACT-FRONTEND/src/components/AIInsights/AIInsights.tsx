import React from 'react';
import { Typography, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import Sidebar from '../Sidebar/Sidebar';
import AlertCard from './AlertCard/AlertCard';
import NarrativeSummaryCard from './NarrativeSummaryCard/NarrativeSummaryCard';
import './AIInsights.css';

const AIInsights: React.FC = () => {
    return (
        <div className="ai-insights-container">
            <Sidebar />
            
            <main className="ai-insights-main">
                {/* Header */}
                <div className="page-header">
                    <Typography variant="h5" fontWeight="bold">AI Financial Assistant & Insights</Typography>
                    <div className="header-subtitle">
                        Proactive analysis, smart suggestions, and answers to your money questions.
                    </div>
                </div>

                {/* Proactive Alerts Section */}
                <div className="section-container">
                    <Typography className="section-heading">Proactive Alerts & Suggestions</Typography>
                    <div className="alerts-grid">
                        <AlertCard 
                            title="Unusual Spending Detected" 
                            icon="⚠️" 
                            type="danger"
                            description="You spent $150 on 'Gaming' this week, which is 3x your normal average. Review this category?"
                            actionLabel="Review Transactions"
                        />
                        <AlertCard 
                            title="Savings Opportunity Found" 
                            icon="💡" 
                            type="success"
                            description="Based on your cash flow, you could safely move an extra $200 to your 'Europe Vacation' goal this month without impacting bills."
                            actionLabel="Move $200 Now"
                        />
                        <AlertCard 
                            title="Budget Forecast Warning" 
                            icon="📉" 
                            type="warning"
                            description="At your current pace, you will exceed your 'Dining/Coffee' budget by $85 in 5 days. Consider cooking at home."
                            actionLabel="See Budget Details"
                        />
                    </div>
                </div>

                {/* Chat Section */}
                <div className="section-container">
                    <Typography className="section-heading">Ask Your Financial AI</Typography>
                    <div className="chat-section">
                        <div className="chat-input-wrapper">
                            <input 
                                type="text" 
                                className="chat-input" 
                                placeholder="Ask anything... e.g., &quot;How much did I spend on Uber last month?&quot;, &quot;Can I afford a $500 purchase?&quot;, &quot;What's my biggest expense?&quot;"
                            />
                            <MicIcon className="chat-mic-icon" />
                            <IconButton className="chat-send-btn">
                                <SendIcon />
                            </IconButton>
                        </div>
                        <div className="suggested-prompts">
                            <span className="prompt-label">Suggested Prompts:</span>
                            <span className="prompt-pill">Analyze my spending habits</span>
                            <span className="prompt-pill">Project next month's savings</span>
                            <span className="prompt-pill">Find recurring subscriptions</span>
                        </div>
                    </div>
                </div>

                {/* Narrative Summary Section */}
                <div className="section-container">
                    <Typography className="section-heading">Monthly Narrative Summary</Typography>
                    <NarrativeSummaryCard />
                </div>

            </main>
        </div>
    );
};

export default AIInsights;
