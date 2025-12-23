import React, { useState, useRef, useEffect } from "react";
import { Typography, IconButton, CircularProgress } from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import Sidebar from "../Sidebar/Sidebar";
import AlertCard from "./AlertCard/AlertCard";
import NarrativeSummaryCard from "./NarrativeSummaryCard/NarrativeSummaryCard";
import "./AIInsights.css";
import AiInsightService from "../../services/AiInsightService";

interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}

const AIInsights: React.FC = () => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isLoading]);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue;
        setInputValue("");
        setChatHistory(prev => [...prev, { sender: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const aiResponse = await AiInsightService.analyze(userMessage);
            setChatHistory(prev => [...prev, { sender: 'ai', text: aiResponse }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setChatHistory(prev => [...prev, { 
                sender: 'ai', 
                text: "Sorry, I'm having trouble connecting to my brain right now. Please try again later." 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const handlePromptClick = (text: string) => {
        setInputValue(text);
        // Optionally auto-send
    };

  return (
    <div className="ai-insights-container">
      <Sidebar />

      <main className="ai-insights-main">
        {/* Header */}
        <div className="page-header">
          <Typography variant="h5" fontWeight="bold">
            AI Financial Assistant & Insights
          </Typography>
          <div className="header-subtitle">
            Proactive analysis, smart suggestions, and answers to your money
            questions.
          </div>
        </div>

        {/* Proactive Alerts Section */}
        <div className="section-container">
          <div className="alerts-grid">
            <AlertCard
              title="Unusual Spending Detected"
              icon="⚠️"
              type="danger"
              description="You spent ₹150 on 'Gaming' this week, which is 3x your normal average. Review this category?"
              actionLabel="Review Transactions"
            />
            <AlertCard
              title="Savings Opportunity Found"
              icon="💡"
              type="success"
              description="Based on your cash flow, you could safely move an extra ₹200 to your 'Europe Vacation' goal this month without impacting bills."
              actionLabel="Move ₹200 Now"
            />
            <AlertCard
              title="Budget Forecast Warning"
              icon="📉"
              type="warning"
              description="At your current pace, you will exceed your 'Dining/Coffee' budget by ₹85 in 5 days. Consider cooking at home."
              actionLabel="See Budget Details"
            />
          </div>
        </div>

        {/* Chat Section */}
        <div className="section-container">
          <Typography className="section-heading">
            Ask Your Financial AI
          </Typography>
          <div className="chat-section">
            
            {/* Chat History */}
            {chatHistory.length > 0 && (
                <div className="chat-history">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`chat-bubble ${msg.sender}`}>
                            {msg.text.split('\n').map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="chat-bubble ai typing-indicator">
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
            )}

            <div className="chat-input-wrapper">
              <input
                type="text"
                className="chat-input"
                placeholder="Ask anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <IconButton className="chat-send-btn" onClick={handleSend} disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
              </IconButton>
            </div>
            <div className="suggested-prompts">
              <span className="prompt-label">Suggested Prompts:</span>
              <span className="prompt-pill" onClick={() => handlePromptClick("Analyze my spending habits")}>Analyze my spending habits</span>
              <span className="prompt-pill" onClick={() => handlePromptClick("Project next month's savings")}>Project next month's savings</span>
              <span className="prompt-pill" onClick={() => handlePromptClick("Find recurring subscriptions")}>Find recurring subscriptions</span>
            </div>
          </div>
        </div>

        {/* Narrative Summary Section */}
        <div className="section-container">
          <Typography className="section-heading">
            Monthly Narrative Summary
          </Typography>
          <NarrativeSummaryCard />
        </div>
      </main>
    </div>
  );
};

export default AIInsights;
