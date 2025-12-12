import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./Signup.css";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error on typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!formData.username || !formData.email || !formData.password || !formData.phone) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await AuthService.registerUser({
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      
      // On success, redirect or show success message
      alert("Registration successful! Please log in.");
      navigate("/"); // Redirect to landing or login (placeholder)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <Box className="signup-box">
        {/* Logo Section */}
        <Typography variant="h4" component="h1" className="signup-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          CashIQ <span style={{ fontSize: "0.8em" }}>➔</span>
        </Typography>

        <Typography variant="h6" className="signup-title">
          Create your account.
        </Typography>

        <form className="signup-form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            variant="outlined"
            size="medium"
            placeholder="Username"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            size="medium"
            placeholder="Email Address"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            variant="outlined"
            size="medium"
            placeholder="Phone Number"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            size="medium"
            placeholder="••••••••"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            variant="outlined"
            size="medium"
            placeholder="••••••••"
            InputLabelProps={{ shrink: true }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            className="signup-button"
            disableElevation
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
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
