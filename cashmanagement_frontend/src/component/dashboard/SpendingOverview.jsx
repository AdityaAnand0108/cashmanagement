import React, { useEffect, useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TodayIcon from '@mui/icons-material/Today';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
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
    <Grid container spacing={3} mb={4}>
         <Grid item xs={12} md={6}>
           <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
             <CardContent>
               <Box display="flex" alignItems="center" mb={1}>
                 <CalendarMonthIcon color="primary" sx={{ mr: 1 }} />
                 <Typography variant="subtitle1" fontWeight={500} color="text.secondary">
                   This Month
                 </Typography>
               </Box>
               <Typography variant="h4" fontWeight={700} color="primary">
                 ₹{monthAmount}
               </Typography>
             </CardContent>
           </Card>
         </Grid>
         <Grid item xs={12} md={6}>
           <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
             <CardContent>
               <Box display="flex" alignItems="center" mb={1}>
                 <TodayIcon color="primary" sx={{ mr: 1 }} />
                 <Typography variant="subtitle1" fontWeight={500} color="text.secondary">
                   This Day Spent
                 </Typography>
               </Box>
               <Typography variant="h4" fontWeight={700} color="primary">
                 ₹{daySpent}
               </Typography>
             </CardContent>
           </Card>
         </Grid>
       </Grid>
     );
};

export default SpendingOverview;