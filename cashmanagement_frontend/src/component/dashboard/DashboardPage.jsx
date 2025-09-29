import React, { useState } from 'react';
import { Box, Typography, Button, AppBar, Toolbar, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SpendingOverview from './SpendingOverview';
import AddExpenseSheet from './AddExpenseSheet/AddExpenseSheet';

const DashboardPage = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 0,
      }}
      className="dashboard-container"
    >
      <Box sx={{ p: 4 }}>
        <SpendingOverview />
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ position: 'fixed', right: 32, boxShadow: 3, borderRadius: 3, fontWeight: 600 }}
        onClick={() => setSheetOpen(true)}
      >
        Add Expense
      </Button>
      <AddExpenseSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </Box>
  );
};

export default DashboardPage;