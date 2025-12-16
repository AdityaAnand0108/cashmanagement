import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./Login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("Please enter both username and password");
      return;
    }

    setLoading(true);
    try {
      const token = await AuthService.login({
        username: formData.username,
        password: formData.password,
      });

      localStorage.setItem('token', token);
      toast.success("Login successful!");
      
      navigate("/dashboard"); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Box className="login-box">
        {/* Logo Section */}
        <Typography variant="h4" component="h1" className="login-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          CashIQ <span style={{ fontSize: "0.8em" }}>➔</span>
        </Typography>

        <Typography variant="h6" className="login-title">
          Welcome back.
        </Typography>

        <form className="login-form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            className="login-button"
            disableElevation
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <Box className="login-footer">
          Don't have an account?{" "}
          <Link onClick={() => navigate('/signup')} className="login-link">
            Sign up.
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
