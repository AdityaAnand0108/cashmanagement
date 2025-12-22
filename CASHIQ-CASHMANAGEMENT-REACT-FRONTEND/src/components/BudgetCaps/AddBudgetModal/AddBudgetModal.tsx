
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
import './AddBudgetModal.css';
import { CategoryType } from '../../../models/CategoryType';
import { getCategoryIcon } from '../../../utils/CategoryIconUtils';

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
    budgetToEdit?: BudgetCapData;
}

const AddBudgetModal: React.FC<AddBudgetModalProps> = ({ open, onClose, onSave, budgetToEdit }) => {
    const [category, setCategory] = useState<CategoryType | ''>('');
    const [limit, setLimit] = useState('');
    // iconValue is kept for interface compatibility but basically unused/derived
    const [iconValue, setIconValue] = useState('dining'); 
    
    // Toggle for Fixed (Custom Dates) or Variable (Monthly Default)
    const [isCustomPeriod, setIsCustomPeriod] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Load data when budgetToEdit changes or modal opens
    React.useEffect(() => {
        if (budgetToEdit) {
            setCategory(budgetToEdit.category || '');
            setLimit(budgetToEdit.limit.toString());
            setIconValue(budgetToEdit.icon || 'dining');
            
            setIsCustomPeriod(budgetToEdit.periodType === 'CUSTOM');
            setStartDate(budgetToEdit.startDate || '');
            setEndDate(budgetToEdit.endDate || '');
        } else {
            // Reset if opening new
            setCategory('');
            setLimit('');
            setIconValue('dining');
            setIsCustomPeriod(false);
            setStartDate('');
            setEndDate('');
        }
    }, [budgetToEdit, open]);

    const handleCategoryChange = (cat: CategoryType) => {
        setCategory(cat);
        // We can just set iconValue to the category name or ignored
        setIconValue(cat); 
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
        
        const catKey = selected as CategoryType;
        // For display we use the friendly value from the Enum
        const friendlyName = CategoryType[catKey as keyof typeof CategoryType] || selected;

        return (
            <Box className="icon-option">
                {getCategoryIcon(friendlyName)} {friendlyName}
            </Box>
        );
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className="modal-title">
                {budgetToEdit ? 'Edit Budget Cap' : 'Add New Budget Cap'}
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
                                return (
                                    <MenuItem key={key} value={key}>
                                        <Box className="icon-option">
                                            {getCategoryIcon(value)} {value}
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
