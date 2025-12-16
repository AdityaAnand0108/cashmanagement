import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import SavingsIcon from '@mui/icons-material/Savings';
import PieChartIcon from '@mui/icons-material/PieChart';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const Sidebar: React.FC = () => {
    return (
        <aside className="app-sidebar">
            <NavLink to="/dashboard" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
                <DashboardIcon className="sidebar-icon" />
                <span>Dashboard</span>
            </NavLink>
            <NavLink to="/transactions" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
                <ReceiptLongIcon className="sidebar-icon" />
                <span>Transactions</span>
            </NavLink>
            <NavLink to="/income-sources" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
                <MonetizationOnIcon className="sidebar-icon" />
                <span>Income Sources</span>
            </NavLink>
            <NavLink to="/debts" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
                <MoneyOffIcon className="sidebar-icon" />
                <span>Debts & IOUs</span>
            </NavLink>
            <NavLink to="/savings-goals" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
                <SavingsIcon className="sidebar-icon" />
                <span>Savings Goals</span>
            </NavLink>
            <NavLink to="/budget-caps" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
                <PieChartIcon className="sidebar-icon" />
                <span>Budget Caps</span>
            </NavLink>
            <NavLink to="/ai-insights" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
                <SmartToyIcon className="sidebar-icon" />
                <span>AI Insights</span>
            </NavLink>
        </aside>
    );
};

export default Sidebar;
