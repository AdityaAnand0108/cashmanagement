import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';


const SpendingOverview = () => {
  const [monthAmount, setMonthAmount] = useState(0);
  const [daySpent, setDaySpent] = useState(0);

  useEffect(() => {
    // Replace the URL with your actual backend endpoint
    axios.get('http://localhost:8080/cashmanagement/spending/overview')
      .then(response => {
          console.log(response.data);
        setMonthAmount(response.data.monthTotal);
        setDaySpent(response.data.todayTotal);
      })
      .catch(error => {
        console.error('Error fetching spending overview:', error);
        // Optionally set default or error values here
      });
  }, []);

  return (
    <Card>
      <CardContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              This Month
            </Typography>
            <Typography variant="h6">
              {monthAmount}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              This Day Spent
            </Typography>
            <Typography variant="h6">
              {daySpent}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SpendingOverview;