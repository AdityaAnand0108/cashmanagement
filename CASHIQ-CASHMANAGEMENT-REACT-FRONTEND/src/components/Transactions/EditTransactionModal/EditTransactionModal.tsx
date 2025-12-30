import React, { useState, useEffect } from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    TextField, 
    Button, 
    MenuItem, 
    Select, 
    InputLabel, 
    FormControl,
    Box,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import TransactionService from '../../../services/TransactionService';
import type { TransactionDTO } from '../../../models/Transaction';
import { getCategoryIcon } from '../../../utils/CategoryIconUtils';
import './EditTransactionModal.css';

interface EditTransactionModalProps {
    open: boolean;
    transaction: TransactionDTO | null;
    onClose: () => void;
    onSuccess: () => void;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({ open, transaction, onClose, onSuccess }) => {
    const [formData, setFormData] = useState<TransactionDTO>({
        description: '',
        amount: 0,
        category: '',
        date: '',
        paymentSource: '',
        type: 'EXPENSE'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (transaction) {
            setFormData({
                ...transaction,
                // Ensure date is in YYYY-MM-DD format for input type="date"
                date: transaction.date ? new Date(transaction.date).toISOString().split('T')[0] : ''
            });
        }
    }, [transaction]);

    const handleChange = (field: keyof TransactionDTO, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        if (!formData.description || formData.amount <= 0) {
            toast.warning('Please provide a valid description and amount.');
            return;
        }

        try {
            setLoading(true);
            await TransactionService.updateTransaction(formData);
            toast.success('Transaction updated successfully');
            onSuccess();
        } catch (error) {
            console.error('Failed to update transaction', error);
            toast.error('Failed to update transaction');
        } finally {
            setLoading(false);
        }
    };

    if (!transaction) return null;

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle className="modal-title">
                    Edit Transaction
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
                        <TextField
                            label="Description"
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            fullWidth
                            variant="outlined"
                        />

                        <Box display="flex" gap={2} sx={{ mt: 2 }}>
                            <Box flex={1}>
                                <TextField
                                    label="Amount"
                                    type="number"
                                    value={formData.amount}
                                    onChange={(e) => handleChange('amount', parseFloat(e.target.value))}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                            <Box flex={1}>
                                <FormControl fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={formData.category}
                                        label="Category"
                                        onChange={(e) => handleChange('category', e.target.value)}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {getCategoryIcon(selected as string)}
                                                {selected as string}
                                            </Box>
                                        )}
                                    >
                                        {['Food', 'Transport', 'Utilities', 'Rent', 'Income', 'Shopping', 'Entertainment', 'Health', 'Transfer', 'Education'].map((cat) => (
                                            <MenuItem key={cat} value={cat}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    {getCategoryIcon(cat)}
                                                    {cat}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>

                        <Box display="flex" gap={2} sx={{ mt: 2 }}>
                            <Box flex={1}>
                                 <FormControl fullWidth>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        value={formData.type}
                                        label="Type"
                                        onChange={(e) => handleChange('type', e.target.value)}
                                    >
                                        <MenuItem value="EXPENSE">Expense</MenuItem>
                                        <MenuItem value="INCOME">Income</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box flex={1}>
                                <TextField
                                    label="Date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => handleChange('date', e.target.value)}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Box>
                        </Box>
                        
                         <TextField
                            label="Payment Source"
                            value={formData.paymentSource}
                            onChange={(e) => handleChange('paymentSource', e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                    </Box>
                </DialogContent>
                <DialogActions className="modal-actions">
                    <Button onClick={onClose} variant="outlined" color="inherit" disabled={loading}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        variant="contained" 
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditTransactionModal;
