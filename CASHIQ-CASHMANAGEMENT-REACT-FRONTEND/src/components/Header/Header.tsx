import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // Money related icon
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

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
        <Box className="header-actions">
          <IconButton size="large" edge="end" color="inherit">
            <SearchIcon className="header-action-icon" />
          </IconButton>
          <IconButton size="large" edge="end" color="inherit">
            <AccountCircleIcon className="header-action-icon" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
