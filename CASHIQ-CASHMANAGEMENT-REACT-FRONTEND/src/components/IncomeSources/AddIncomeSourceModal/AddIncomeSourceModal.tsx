import React, { useState, useEffect } from 'react';
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
    Switch,
    FormControlLabel,
    Typography,
    Box,
    IconButton,
    Grid,
    InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WorkIcon from '@mui/icons-material/Work';
import LaptopIcon from '@mui/icons-material/Laptop';
import StoreIcon from '@mui/icons-material/Store';
import HomeIcon from '@mui/icons-material/Home';
import './AddIncomeSourceModal.css';
import type { IncomeDTO } from '../../../models/Income';
import { PaymentFrequency } from '../../../models/PaymentFrequency';

interface AddIncomeSourceModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (income: IncomeDTO) => Promise<void>;
    incomeToEdit?: IncomeDTO;
}

const icons = [
    { label: 'Briefcase', value: 'briefcase', icon: <WorkIcon /> },
    { label: 'Laptop', value: 'laptop', icon: <LaptopIcon /> },
    { label: 'Store', value: 'store', icon: <StoreIcon /> },
    { label: 'House', value: 'house', icon: <HomeIcon /> },
];

const frequencies = [
    { label: 'Monthly', value: PaymentFrequency.MONTHLY },
    { label: 'Bi-Weekly', value: PaymentFrequency.BIWEEKLY },
    { label: 'Weekly', value: PaymentFrequency.WEEKLY },
    { label: 'One-time', value: PaymentFrequency.ONE_TIME },
];

const AddIncomeSourceModal: React.FC<AddIncomeSourceModalProps> = ({ open, onClose, onSave, incomeToEdit }) => {
    const [isFixed, setIsFixed] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [icon, setIcon] = useState('briefcase');
    const [frequency, setFrequency] = useState<PaymentFrequency>(PaymentFrequency.MONTHLY);
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsFixed(event.target.checked);
    };

    useEffect(() => {
        if (open) {
            if (incomeToEdit) {
                setName(incomeToEdit.name);
                setAmount(incomeToEdit.amount.toString());
                setIcon(incomeToEdit.icon);
                setFrequency(incomeToEdit.frequency);
                setDate(incomeToEdit.nextPayDay);
                setIsFixed(incomeToEdit.isFixed);
            } else {
                // Reset form for "Add New"
                setName('');
                setAmount('');
                setIcon('briefcase');
                setFrequency(PaymentFrequency.MONTHLY);
                setDate('');
                setIsFixed(false);
            }
        }
    }, [open, incomeToEdit]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const newIncome: IncomeDTO = {
                id: incomeToEdit?.id,
                name,
                amount: parseFloat(amount),
                icon,
                frequency,
                nextPayDay: date,
                isFixed
            };
            await onSave(newIncome);
            onClose();
        } catch (error) {
            console.error("Failed to save income:", error);
            // Optionally handle error here (e.g. show toast)
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className="modal-title">
                {incomeToEdit ? 'Edit Income Source' : 'Add New Income Source'}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    className="close-button"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box component="form" className="modal-form">
                    {/* Row 1: Identity */}
                    <Grid container spacing={2}>
                        <Grid size={8}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Source Name"
                                placeholder="e.g., Main Salary, Freelance Client A..."
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid size={4}>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="icon-select-label">Icon</InputLabel>
                                <Select
                                    labelId="icon-select-label"
                                    id="icon-select"
                                    value={icon}
                                    label="Icon"
                                    onChange={(e) => setIcon(e.target.value)}
                                    renderValue={(selected) => {
                                        const selectedIcon = icons.find(i => i.value === selected);
                                        return (
                                            <Box className="icon-option">
                                                {selectedIcon?.icon} {selectedIcon?.label}
                                            </Box>
                                        );
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
                        </Grid>
                    </Grid>

                    {/* Row 2: Numbers & Frequency */}
                    <Grid container spacing={2}>
                        <Grid size={4}>
                            <TextField
                                margin="dense"
                                id="amount"
                                label="Estimated Amount"
                                placeholder="0.00"
                                type="number"
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                }}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Grid>
                        <Grid size={4}>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="frequency-select-label">Frequency</InputLabel>
                                <Select
                                    labelId="frequency-select-label"
                                    id="frequency-select"
                                    value={frequency}
                                    label="Frequency"
                                    onChange={(e) => setFrequency(e.target.value as PaymentFrequency)}
                                >
                                    {frequencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={4}>
                            <TextField
                                margin="dense"
                                id="date"
                                label="Next Pay Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    {/* Row 3: Stability Switch */}
                    <Box className="switch-container">
                        <Typography variant="subtitle2" gutterBottom>
                            Is this amount fixed & guaranteed?
                        </Typography>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isFixed}
                                    onChange={handleSwitchChange}
                                    color="success"
                                />
                            }
                            label={
                                <Typography
                                    className={isFixed ? 'status-fixed' : 'status-variable'}
                                >
                                    {isFixed ? 'Fixed Salary' : 'Variable / Fluctuating'}
                                </Typography>
                            }
                        />
                        {!isFixed && (
                            <Typography variant="caption" display="block" className="helper-text">
                                Note: We will use the amount above as an estimated average for your forecasts.
                            </Typography>
                        )}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions className="modal-actions">
                <Button onClick={onClose} variant="outlined" color="inherit" disabled={loading}>
                    Cancel
                </Button>
                <Button onClick={handleSave} variant="contained" color="primary" disabled={loading}>
                    {loading ? 'Saving...' : (incomeToEdit ? 'Update Source' : 'Save Source')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddIncomeSourceModal;
