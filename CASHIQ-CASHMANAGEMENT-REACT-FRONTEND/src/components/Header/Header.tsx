import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HexagonIcon from '@mui/icons-material/Hexagon'; // Using Hexagon as a placeholder for the logo icon
import './Header.css';

const Header: React.FC = () => {
  return (
    <AppBar position="static" className="header-appbar" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo Section */}
        <Box className="header-logo">
          <HexagonIcon className="header-logo-icon" />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            CashIQ
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button className="header-nav-link">Home</Button>
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
