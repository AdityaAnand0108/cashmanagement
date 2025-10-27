import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { headerSx } from "./headerStyles";
import logo from "../../assets/data-analysis.png";
import { Home, Info, Logout } from "@mui/icons-material";
import { NavLink } from "react-router";
import { Button } from "@mui/material";
import About from "../About/About";

// default export a single React component (ready to import)
export default function Header({
  title = "Cash Management",
  onMenuClick = () => {},
  onProfileClick = () => {},
  onLogout = () => {},
  notificationCount = 0,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={headerSx.appBar}>
      <Toolbar sx={headerSx.toolbar}>
        <IconButton
          edge="start"
          aria-label="menu"
          onClick={onMenuClick}
          sx={headerSx.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}
        >
          <Box
            component="img"
            src={logo}
            alt="Cash Management Logo"
            sx={{
              height: 40,
              width: "auto",
              cursor: "pointer",
              borderRadius: 1,
            }}
          />
          <Typography variant="h6" component="div" sx={headerSx.title}>
            {title}
          </Typography>
        </Box>
        <Box sx={headerSx.actions}>
          < NavLink
            to="/"
            style={({ isActive }) => ({
              textDecorationColor: isActive ? "Orange" : "none",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Home />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                px: 2,
                "&.MuiButton-contained": {
                  backgroundColor: "#1976d2",
                },
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Home
            </Button>
          </NavLink>
           < NavLink
            to="/about"
             style={({ isActive }) => ({
              textDecorationColor: isActive ? "Orange" : "none",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Info />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                px: 2,
                "&.MuiButton-contained": {
                  backgroundColor: "#1976d2",
                },
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              About
            </Button>
          </NavLink>
          <IconButton aria-label="notifications" sx={headerSx.iconButton}>
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            edge="end"
            aria-controls={open ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleAvatarClick}
            sx={headerSx.avatarButton}
          >
            <Avatar sx={headerSx.avatar}>A</Avatar>
          </IconButton>

          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                onProfileClick();
              }}
            >
              <AccountCircle sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                onLogout();
              }}
            >
              {" "}
              <Logout sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
