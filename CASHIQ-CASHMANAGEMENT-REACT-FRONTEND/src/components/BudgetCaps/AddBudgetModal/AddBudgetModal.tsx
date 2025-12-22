
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
    Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import MovieIcon from '@mui/icons-material/Movie';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import './AddBudgetModal.css';

export interface BudgetCapData {
    category: string;
    limit: number;
    icon: string;
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
];

const AddBudgetModal: React.FC<AddBudgetModalProps> = ({ open, onClose, onSave }) => {
    const [category, setCategory] = useState('');
    const [limit, setLimit] = useState('');
    const [icon, setIcon] = useState('dining');

    const handleSave = () => {
        onSave({
            category,
            limit: parseFloat(limit),
            icon
        });
        onClose();
        setCategory('');
        setLimit('');
        setIcon('dining');
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
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Category Name"
                        placeholder="e.g. Groceries"
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    
                    <FormControl fullWidth>
                        <InputLabel>Icon</InputLabel>
                        <Select
                            value={icon}
                            label="Icon"
                            onChange={(e) => setIcon(e.target.value)}
                            renderValue={(selected) => {
                                const i = icons.find(x => x.value === selected);
                                return (
                                    <Box className="icon-option">
                                        {i?.icon} {i?.label}
                                    </Box>
                                )
                            }}
                        >
                            {icons.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <Box className="icon-option">
                                        {option.icon} {option.label}
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

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
                </Box>
            </DialogContent>
            <DialogActions className="modal-actions">
                <Button onClick={onClose} variant="outlined" color="inherit">
                    Cancel
                </Button>
                <Button onClick={handleSave} variant="contained" disabled={!category || !limit}>
                    Save Budget
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBudgetModal;
