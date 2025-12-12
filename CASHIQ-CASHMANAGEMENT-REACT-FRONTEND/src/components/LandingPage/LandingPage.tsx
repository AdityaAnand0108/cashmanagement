import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SavingsIcon from '@mui/icons-material/Savings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate } from 'react-router-dom';
import DashboardPreview from '../../assets/dashboard previeew.png';
import MobilePreview from '../../assets/Mobile_AI_preview.png';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box className="landing-hero">
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Left Content: Text & CTA */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box className="landing-content-left">
                <Typography variant="h2" className="landing-h1">
                  Stop Manual Tracking.<br />
                  Start Financial Clarity.
                </Typography>
                <Typography className="landing-subtext">
                  AI-powered personal finance that replaces spreadsheets with smart automation and holistic insights.
                  Take control of your financial future today.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  className="landing-cta-btn"
                  onClick={handleSignupClick}
                >
                  Start Free Trial
                </Button>
              </Box>
            </Grid>

            {/* Right Content: Dashboard Image */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box className="hero-dashboard-mockup">
                <img 
                  src={DashboardPreview} 
                  alt="Dashboard Preview" 
                  className="hero-dashboard-img"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box className="features-section">
        <Container maxWidth="lg">
            <Box className="feature-header">
                <Typography variant="h4" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, color: '#1e293b' }}>
                    Why CashManagement?
                </Typography>
            </Box>
          <Grid container spacing={6} sx={{ textAlign: 'center' }}>
            {/* Feature 1 */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box className="feature-icon-box">
                <FlashOnIcon sx={{ fontSize: 48 }} />
              </Box>
              <Typography variant="h5" className="feature-title">
                3-Second Logging
              </Typography>
              <Typography className="feature-desc">
                Just type naturally. AI tags it instantly. No tedious dropdowns or manual entry required.
              </Typography>
            </Grid>

            {/* Feature 2 */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box className="feature-icon-box">
                <SavingsIcon sx={{ fontSize: 48 }} />
              </Box>
              <Typography variant="h5" className="feature-title">
                More Than Spending
              </Typography>
              <Typography className="feature-desc">
                Track debts (IOUs), savings goals, and income sources in one single place.
              </Typography>
            </Grid>

            {/* Feature 3 */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box className="feature-icon-box">
                <NotificationsActiveIcon sx={{ fontSize: 48 }} />
              </Box>
              <Typography variant="h5" className="feature-title">
                Proactive Alerts
              </Typography>
              <Typography className="feature-desc">
                Get notified before hitting budget caps. Turn data into action and never overspend again.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mobile Feature CTA */}
      <Box className="mobile-feature-section">
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, color: '#1e293b', mb: 3 }}>
                Frictionless Finance on the Go
            </Typography>
            <Typography sx={{ color: '#64748b', mb: 4 }}>
                Mobile finance stories on and off, bunch even it means is easy to use. Mobile can be annual manager a money speed station and afocia.
            </Typography>
            {/* Mockup Placeholder */}
            <Box sx={{ 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
            }}>
                <img 
                  src={MobilePreview} 
                  alt="Mobile Preview" 
                  style={{ maxWidth: '100%', maxHeight: '400px', height: 'auto', borderRadius: '16px' }} 
                />
            </Box>
        </Container>
      </Box>

      {/* Bottom CTA */}
      <Box className="bottom-cta-section">
        <Container maxWidth="md">
            <Typography variant="h3" className="bottom-cta-title">
                Ready to master your money automatically?
            </Typography>
            <Button 
                variant="contained" 
                size="large"
                sx={{ 
                    backgroundColor: '#fff', 
                    color: '#0f172a',
                    fontWeight: 700,
                    padding: '14px 40px',
                    fontSize: '1.1rem',
                    '&:hover': {
                        backgroundColor: '#f1f5f9'
                    }
                }}
                onClick={handleSignupClick}
            >
                Create Your Free Account
            </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
