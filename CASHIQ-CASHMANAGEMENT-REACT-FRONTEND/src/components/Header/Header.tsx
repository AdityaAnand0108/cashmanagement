import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // Money related icon
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <AppBar position="static" className="header-appbar" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box 
          className="header-logo" 
          onClick={() => navigate('/')}
        >
          <AccountBalanceWalletIcon className="header-logo-icon" />
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 800, 
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#1976d2', // Brand Blue
              letterSpacing: '-0.5px'
            }}
          >
            CashIQ <span style={{ fontSize: '0.8em' }}>➔</span>
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button className="header-nav-link" onClick={() => navigate('/')}>Home</Button>
          <Button className="header-nav-link">About</Button>
          <Button className="header-nav-link">Services</Button>
          <Button className="header-nav-link">Contact</Button>
        </Box>

        {/* Action Icons */}
        <Box className="header-actions" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {token ? (
             <IconButton onClick={handleLogout} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: '#1976d2' }}>
                  {username ? username.charAt(0).toUpperCase() : 'U'}
                </Avatar>
             </IconButton>
          ) : (
            <>
              <Button 
                variant="outlined" 
                color="inherit" 
                onClick={() => navigate('/login')}
                sx={{ textTransform: 'none', borderColor: '#1976d2', color: '#1976d2', '&:hover': { borderColor: '#115293', backgroundColor: 'rgba(25, 118, 210, 0.04)' } }}
              >
                Sign In
              </Button>
              <Button 
                variant="contained" 
                disableElevation
                onClick={() => navigate('/signup')}
                sx={{ textTransform: 'none', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
