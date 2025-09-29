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
} from '@mui/material';
import { categories } from '../../../enum/categories';
import { paymentMethods } from '../../../enum/paymentMethods';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const AddExpenseSheet = ({ open, onClose }) => {
  const [form, setForm] = useState({
    expenseName: '',
    amount: '',
    category: '',
    description: '',
    date: '',
    paymentMethod: '',
    recurring: false,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/cashmanagement/add-expense', {
        ...form,
        amount: parseFloat(form.amount),
      });
      setSnackbarOpen(true);
      setForm({
        expenseName: '',
        amount: '',
        category: '',
        description: '',
        date: '',
        paymentMethod: '',
        recurring: false,
      });
      onClose();
    } catch (error) {
      // Handle error
    }
  };

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box sx={{ width: 380, p: 3, bgcolor: "#f6f9fb", height: "100%" }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" flexGrow={1}>
              Add Expense
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit}>
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
            />
            <Box mt={3}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Expense
              </Button>
            </Box>
          </form>

        </Box>
      </Drawer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Expense saved successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddExpenseSheet;
