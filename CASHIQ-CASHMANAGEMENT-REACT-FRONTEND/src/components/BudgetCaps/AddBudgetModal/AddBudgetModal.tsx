
import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    IconButton,
    InputAdornment,
    Box,
    Switch,
    FormControlLabel,
    Typography,
    Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// Icons
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import MovieIcon from '@mui/icons-material/Movie';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import HomeIcon from '@mui/icons-material/Home';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import './AddBudgetModal.css';
import { CategoryType } from '../../../models/CategoryType';

export interface BudgetCapData {
    category: CategoryType | '';
    limit: number;
    icon: string;
    startDate?: string;
    endDate?: string;
    periodType: 'MONTHLY' | 'CUSTOM';
}

interface AddBudgetModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: BudgetCapData) => void;
}

const icons = [
    { label: 'Dining', value: 'dining', icon: <FastfoodIcon /> },
    { label: 'Groceries', value: 'groceries', icon: <ShoppingCartIcon /> },
    { label: 'Transport', value: 'transport', icon: <LocalGasStationIcon /> },
    { label: 'Entertainment', value: 'entertainment', icon: <MovieIcon /> },
    { label: 'Utilities', value: 'utilities', icon: <LightbulbIcon /> },
    { label: 'Shopping', value: 'shopping', icon: <CheckroomIcon /> },
    { label: 'Rent', value: 'rent', icon: <HomeIcon /> },
    { label: 'Health', value: 'health', icon: <LocalHospitalIcon /> },
    { label: 'Education', value: 'education', icon: <SchoolIcon /> },
    { label: 'Transfer', value: 'transfer', icon: <SwapHorizIcon /> },
    { label: 'Income', value: 'income', icon: <AttachMoneyIcon /> },
];

const categoryToIconMap: Record<string, string> = {
    'FOOD': 'dining',
    'TRANSPORT': 'transport',
    'UTILITIES': 'utilities',
    'RENT': 'rent',
    'INCOME': 'income',
    'SHOPPING': 'shopping',
    'ENTERTAINMENT': 'entertainment',
    'HEALTH': 'health',
    'TRANSFER': 'transfer',
    'EDUCATION': 'education',
};

const AddBudgetModal: React.FC<AddBudgetModalProps> = ({ open, onClose, onSave }) => {
    const [category, setCategory] = useState<CategoryType | ''>('');
    const [limit, setLimit] = useState('');
    const [iconValue, setIconValue] = useState('dining'); // derived from category, internal use
    
    // Toggle for Fixed (Custom Dates) or Variable (Monthly Default)
    const [isCustomPeriod, setIsCustomPeriod] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleCategoryChange = (cat: CategoryType) => {
        setCategory(cat);
        const mapped = categoryToIconMap[cat];
        if (mapped) {
            setIconValue(mapped);
        }
    };

    const handleSave = () => {
        onSave({
            category,
            limit: parseFloat(limit),
            icon: iconValue,
            periodType: isCustomPeriod ? 'CUSTOM' : 'MONTHLY',
            startDate: isCustomPeriod ? startDate : undefined,
            endDate: isCustomPeriod ? endDate : undefined
        });
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setCategory('');
        setLimit('');
        setIconValue('dining');
        setIsCustomPeriod(false);
        setStartDate('');
        setEndDate('');
    }

    // Helper to render icon + text in Select
    const renderCategoryValue = (selected: unknown) => {
        // If nothing selected
        if (!selected) return <em>Select Category</em>;
        
        // Find icon for this category (using the map)
        const catKey = selected as CategoryType;
        const mappedIconKey = categoryToIconMap[catKey];
        const iconObj = icons.find(i => i.value === mappedIconKey);
        
        // For display we use the friendly value from the Enum
        const friendlyName = CategoryType[catKey as keyof typeof CategoryType] || selected;

        return (
            <Box className="icon-option">
                {iconObj?.icon} {friendlyName}
            </Box>
        );
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className="modal-title">
                Add New Budget Cap
                <IconButton onClick={onClose} className="close-button">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box component="form" className="modal-form">
                    
                    {/* Category Select with Icon */}
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="category-select-label">Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            label="Category"
                            value={category}
                            onChange={(e) => handleCategoryChange(e.target.value as CategoryType)}
                            renderValue={renderCategoryValue}
                        >
                            {Object.entries(CategoryType).map(([key, value]) => {
                                // Find icon to show in the dropdown list too
                                const mappedIconKey = categoryToIconMap[key];
                                const iconObj = icons.find(i => i.value === mappedIconKey);

                                return (
                                    <MenuItem key={key} value={key}>
                                        <Box className="icon-option">
                                            {iconObj?.icon} {value}
                                        </Box>
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>

                    {/* Limit Input */}
                    <TextField
                        margin="dense"
                        label="Monthly Limit"
                        placeholder="0.00"
                        type="number"
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        }}
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                    />

                    {/* Fixed vs Variable (Custom Period) Toggle */}
                    <Box className="switch-container">
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle1">Budget Period</Typography>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isCustomPeriod}
                                        onChange={(e) => setIsCustomPeriod(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label={isCustomPeriod ? "Fixed Dates" : "Monthly (Recurring)"}
                            />
                        </Box>
                        
                        <Typography variant="caption" color="text.secondary">
                            {isCustomPeriod 
                                ? "Set a specific start and end date for this budget." 
                                : "This budget will automatically renew every month."}
                        </Typography>
                    </Box>

                    {/* Conditional Date Inputs */}
                    {isCustomPeriod && (
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <TextField
                                    label="Start Date"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    label="End Date"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    )}

                </Box>
            </DialogContent>
            <DialogActions className="modal-actions">
                <Button onClick={onClose} variant="outlined" color="inherit">
                    Cancel
                </Button>
                <Button 
                    onClick={handleSave} 
                    variant="contained" 
                    disabled={!category || !limit || (isCustomPeriod && (!startDate || !endDate))}
                >
                    Save Budget
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBudgetModal;
