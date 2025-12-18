import React, { useState } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Select, 
    MenuItem, 
    InputAdornment, 
    Typography,
    FormControl
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../Sidebar/Sidebar';
import TransactionTable from './TransactionTable/TransactionTable';
import './Transactions.css';
import type { SelectChangeEvent } from '@mui/material/Select';

const Transactions: React.FC = () => {
    const [dateRange, setDateRange] = useState('This Month');
    const [category, setCategory] = useState('All Categories');

    const handleDateRangeChange = (event: SelectChangeEvent) => {
        setDateRange(event.target.value as string);
    };

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    return (
        <div className="transactions-container">
            <Sidebar />
            
            <main className="transactions-main">
                {/* Header & Filters */}
                <Box className="transactions-header-filters">
                    
                    {/* Search */}
                    <TextField
                        className="search-field"
                        placeholder="Search transactions..."
                        variant="outlined"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#94a3b8' }} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {/* Filters */}
                    <div className="filter-group">
                        <div className="filter-item">
                            <Typography className="filter-label">Date Range</Typography>
                            <FormControl variant="outlined" className="filter-select">
                                <Select
                                    value={dateRange}
                                    onChange={handleDateRangeChange}
                                    displayEmpty
                                >
                                    <MenuItem value="This Month">This Month</MenuItem>
                                    <MenuItem value="Last Month">Last Month</MenuItem>
                                    <MenuItem value="Last 3 Months">Last 3 Months</MenuItem>
                                    <MenuItem value="This Year">This Year</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="filter-item">
                            <Typography className="filter-label">Category</Typography>
                            <FormControl variant="outlined" className="filter-select">
                                <Select
                                    value={category}
                                    onChange={handleCategoryChange}
                                    displayEmpty
                                >
                                    <MenuItem value="All Categories">All Categories</MenuItem>
                                    <MenuItem value="Dining">Dining</MenuItem>
                                    <MenuItem value="Shopping">Shopping</MenuItem>
                                    <MenuItem value="Rent">Rent</MenuItem>
                                    <MenuItem value="Income">Income</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    {/* Add Transaction Button */}
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        className="add-transaction-btn"
                    >
                        Add Transaction
                    </Button>
                </Box>

                {/* Transactions Table */}
                <TransactionTable />
            </main>
        </div>
    );
};

export default Transactions;
