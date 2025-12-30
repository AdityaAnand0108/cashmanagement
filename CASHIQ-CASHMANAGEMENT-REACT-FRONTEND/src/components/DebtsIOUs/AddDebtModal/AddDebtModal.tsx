import React, { useState } from 'react';
import { 
    Dialog, DialogTitle, DialogContent, DialogActions, 
    Button, TextField, ToggleButton, ToggleButtonGroup, 
    IconButton, Typography, Box 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';
import HandshakeIcon from '@mui/icons-material/Handshake';
import HomeIcon from '@mui/icons-material/Home';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { DebtType, type DebtEntryDTO, DebtStatus } from '../../../models/Debt';
import './AddDebtModal.css';

interface AddDebtModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (debt: DebtEntryDTO) => void;
}

/**
 * Modal component for adding a new Debt or IOU.
 * Features a toggle for Debt/IOU type and category selection.
 */
const AddDebtModal: React.FC<AddDebtModalProps> = ({ open, onClose, onSave }) => {
    const [debtType, setDebtType] = useState<DebtType>(DebtType.OWED_BY_USER);
    const [title, setTitle] = useState('');
    const [counterparty, setCounterparty] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('Other');

    const handleTypeChange = (
        _event: React.MouseEvent<HTMLElement>,
        newType: DebtType | null,
    ) => {
        if (newType !== null) {
            setDebtType(newType);
        }
    };

    const handleSave = () => {
        if (!title || !amount) {
            // Simple validation
            return;
        }

        const newDebt: DebtEntryDTO = {
            debtType: debtType,
            title: title + (selectedCategory !== 'Other' ? ` (${selectedCategory})` : ''), // Appending category for now or could handle separately
            counterparty: counterparty,
            originalAmount: parseFloat(amount),
            currentBalance: parseFloat(amount),
            interestRate: interestRate ? parseFloat(interestRate) : undefined,
            dueDate: dueDate || undefined,
            status: DebtStatus.ACTIVE
        };

        onSave(newDebt);
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setCounterparty('');
        setAmount('');
        setDueDate('');
        setInterestRate('');
        setSelectedCategory('Other');
        setDebtType(DebtType.OWED_BY_USER);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle className="add-debt-modal-title">
                Add New Debt or IOU
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <div className="add-debt-toggle-group-container">
                    <ToggleButtonGroup
                        value={debtType}
                        exclusive
                        onChange={handleTypeChange}
                        aria-label="debt type"
                        fullWidth
                    >
                        <ToggleButton value={DebtType.OWED_BY_USER} color="primary">
                            I Owe (Debt)
                        </ToggleButton>
                        <ToggleButton value={DebtType.OWED_TO_USER} color="primary">
                            Owed to Me (IOU)
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <Typography variant="subtitle2" gutterBottom>
                    {debtType === DebtType.OWED_BY_USER ? "Title / Description" : "What is this for?"}
                </Typography>
                <TextField 
                    fullWidth 
                    placeholder={debtType === DebtType.OWED_BY_USER ? "e.g., Student Loan, Dinner" : "e.g., Lunch, Concert Tickets"} 
                    variant="outlined" 
                    size="small" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="add-debt-input-field"
                />

                <Typography variant="subtitle2" gutterBottom>
                    {debtType === DebtType.OWED_BY_USER ? "Counterparty (Lender)" : "Who owes you? (Counterparty)"}
                </Typography>
                <TextField 
                    fullWidth 
                    placeholder={debtType === DebtType.OWED_BY_USER ? "e.g., Bank, Friend's Name" : "e.g., John Doe"} 
                    variant="outlined" 
                    size="small" 
                    value={counterparty}
                    onChange={(e) => setCounterparty(e.target.value)}
                    className="add-debt-input-field"
                />

                <div className="add-debt-row">
                    <div className="add-debt-row-item">
                        <Typography variant="subtitle2" gutterBottom>Total Amount</Typography>
                        <TextField 
                            fullWidth 
                            placeholder="₹" 
                            type="number" 
                            variant="outlined" 
                            size="small" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="add-debt-row-item">
                        <Typography variant="subtitle2" gutterBottom>Due Date</Typography>
                        <TextField 
                            fullWidth 
                            type="date" 
                            variant="outlined" 
                            size="small" 
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>
                    <div className="add-debt-row-item">
                        <Typography variant="subtitle2" gutterBottom>Interest Rate (%)</Typography>
                        <TextField 
                            fullWidth 
                            placeholder="%" 
                            type="number" 
                            variant="outlined" 
                            size="small" 
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                        />
                    </div>
                </div>

                <Box>
                    <div className="add-debt-category-header">
                        <Typography variant="subtitle2" gutterBottom>Category / Icon</Typography>
                        <Button size="small" sx={{ textTransform: 'none' }}>Select...</Button>
                    </div>
                    <div className="add-debt-category-icons">
                        <IconButton 
                            color={selectedCategory === 'Education' ? 'primary' : 'default'} 
                            onClick={() => setSelectedCategory('Education')}
                            className={`category-icon-btn ${selectedCategory === 'Education' ? 'selected' : ''}`}
                        >
                            <SchoolIcon />
                        </IconButton>
                        <IconButton 
                            color={selectedCategory === 'Social' ? 'primary' : 'default'} 
                            onClick={() => setSelectedCategory('Social')}
                            className={`category-icon-btn ${selectedCategory === 'Social' ? 'selected' : ''}`}
                        >
                            <HandshakeIcon />
                        </IconButton>
                        <IconButton 
                            color={selectedCategory === 'Housing' ? 'primary' : 'default'} 
                            onClick={() => setSelectedCategory('Housing')}
                            className={`category-icon-btn ${selectedCategory === 'Housing' ? 'selected' : ''}`}
                        >
                            <HomeIcon />
                        </IconButton>
                        <IconButton 
                            color={selectedCategory === 'Credit' ? 'primary' : 'default'} 
                            onClick={() => setSelectedCategory('Credit')}
                            className={`category-icon-btn ${selectedCategory === 'Credit' ? 'selected' : ''}`}
                        >
                            <CreditCardIcon />
                        </IconButton>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="inherit">Cancel</Button>
                <Button onClick={handleSave} variant="contained" disabled={!title || !amount}>Save Debt</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddDebtModal;
