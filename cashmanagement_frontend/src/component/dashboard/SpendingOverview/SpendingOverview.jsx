import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TodayIcon from "@mui/icons-material/Today";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useSpendingOverview } from "../../../hooks/useSpendingOverview";

import "./SpendingOverview.css";

const SpendingOverview = () => {
  const { data, loading, error } = useSpendingOverview();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" className="sp-overview-loading">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Grid container spacing={3} className="sp-overview-grid" mb={4}>
      <Grid item xs={12} md={6}>
        <Card className="sp-stat-card">
          <CardContent className="sp-card-content">
            <Box className="sp-card-header">
              <CalendarMonthIcon className="sp-icon" />
              <Typography variant="subtitle1" className="sp-label">
                This Month
              </Typography>
            </Box>

            <Typography variant="h4" className="sp-amount">
              ₹{data?.monthTotal ?? 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card className="sp-stat-card">
          <CardContent className="sp-card-content">
            <Box className="sp-card-header">
              <TodayIcon className="sp-icon" />
              <Typography variant="subtitle1" className="sp-label">
                This Day Spent
              </Typography>
            </Box>

            <Typography variant="h4" className="sp-amount">
              ₹{data?.todayTotal ?? 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SpendingOverview;
