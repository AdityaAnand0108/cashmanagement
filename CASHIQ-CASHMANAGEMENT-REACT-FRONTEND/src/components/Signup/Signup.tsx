import React from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import "./Signup.css";

const Signup: React.FC = () => {
  return (
    <div className="signup-container">
      <Box className="signup-box">
        {/* Logo Section */}
        <Typography variant="h4" component="h1" className="signup-logo">
          CashIQ <span style={{ fontSize: "0.8em" }}>➔</span>
        </Typography>

        <Typography variant="h6" className="signup-title">
          Create your account.
        </Typography>

        <form className="signup-form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            size="medium"
            placeholder="Username"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            size="medium"
            placeholder="Email Address"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            size="medium"
            placeholder="Phone Number"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            size="medium"
            placeholder="••••••••"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            size="medium"
            placeholder="••••••••"
            InputLabelProps={{ shrink: true }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            className="signup-button"
            disableElevation
          >
            Sign Up
          </Button>
        </form>

        <Box className="signup-footer">
          Already have an account?{" "}
          <Link href="#" className="signup-link">
            Log in.
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default Signup;
