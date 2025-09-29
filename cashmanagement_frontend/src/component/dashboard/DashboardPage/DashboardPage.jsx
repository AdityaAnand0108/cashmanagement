import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Fab, Drawer } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import "./DashboardPage.css";
import AddExpenseSheet from "../AddExpenseSheet/AddExpenseSheet";
import SpendingOverview from "../SpendingOverview/SpendingOverview";
import TodaysSpendingTable from "../TodaysSpendingTable/TodaysSpendingTable";

const StatCard = ({ label, amount }) => (
  <Card className="stat-card">
    <CardContent>
      <Box className="stat-card-header">
        <Box className="stat-card-icon">
          <CalendarTodayRoundedIcon className="calendar-icon" />
        </Box>
        <Typography variant="subtitle2" className="stat-label">
          {label}
        </Typography>
      </Box>

      <Typography variant="h4" className="stat-amount">
        ₹{amount}
      </Typography>
    </CardContent>
  </Card>
);

export default function DashboardHeader() {
  const [open, setOpen] = useState(false);

  return (
    <Box className="dashboard-container">
      <Box className="dashboard-content">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <SpendingOverview />
        </Grid>
        <TodaysSpendingTable />
      </Box>

      {/* Floating Add Expense Button */}
      <Fab
        variant="extended"
        color="primary"
        aria-label="add-expense"
        className="add-expense-btn"
        onClick={() => setOpen(true)}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add Expense
      </Fab>

      {/* Side Sheet Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <AddExpenseSheet onClose={() => setOpen(false)} />
      </Drawer>
    </Box>
  );
}
