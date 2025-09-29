import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { categories } from '../../../enum/categories';
import { paymentMethods } from '../../../enum/paymentMethods';
import { addExpense } from "../../../api/expenseApi";
import './AddExpenseSheet.css';

const initialFormState = {
  expenseName: '',
  amount: '',
  category: '',
  description: '',
  date: '',
  paymentMethod: '',
  recurring: false,
};

const AddExpenseSheet = ({ open, onClose }) => {
  const [form, setForm] = useState(initialFormState);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const resetForm = () => setForm(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addExpense(form);
      setSnackbar({ open: true, message: 'Expense saved successfully', severity: 'success' });
      resetForm();
      onClose();
    } catch {
      setSnackbar({ open: true, message: 'Failed to save expense', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        <Box className="expenseDrawer">
          <Box className="expenseDrawerHeader">
            <Typography variant="h6" className="expenseDrawerTitle">
              Add Expense
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <form onSubmit={handleSubmit} className="expenseForm">
            <TextField
              label="Expense Name"
              name="expenseName"
              fullWidth
              required
              margin="normal"
              value={form.expenseName}
              onChange={handleChange}
            />
            <TextField
              label="Amount"
              name="amount"
              type="number"
              fullWidth
              required
              margin="normal"
              value={form.amount}
              onChange={handleChange}
            />
            <TextField
              label="Category"
              name="category"
              select
              fullWidth
              required
              margin="normal"
              value={form.category}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Description"
              name="description"
              multiline
              rows={2}
              fullWidth
              margin="normal"
              value={form.description}
              onChange={handleChange}
            />
            <TextField
              label="Date"
              name="date"
              type="date"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={form.date}
              onChange={handleChange}
            />
            <TextField
              label="Payment Method"
              name="paymentMethod"
              select
              fullWidth
              required
              margin="normal"
              value={form.paymentMethod}
              onChange={handleChange}
            >
              {paymentMethods.map((method) => (
                <MenuItem key={method.value} value={method.value}>
                  {method.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.recurring}
                  onChange={handleChange}
                  name="recurring"
                  color="primary"
                />
              }
              label="Recurring"
              className="expenseCheckbox"
            />
            <Box mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                startIcon={loading ? <CircularProgress size={18} /> : null}
              >
                {loading ? 'Saving...' : 'Add Expense'}
              </Button>
            </Box>
          </form>
        </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      </>
  );
};

export default AddExpenseSheet;