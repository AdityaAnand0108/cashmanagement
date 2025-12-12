import React from 'react';
import { Box, Container, Grid, Typography, Link, TextField, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // Using arrow icon for newsletter
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <Box className="footer-container">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" className="footer-section-title">
              Quick Links
            </Typography>
            <Link href="#" className="footer-link">Home</Link>
            <Link href="#" className="footer-link">About Us</Link>
            <Link href="#" className="footer-link">Services</Link>
            <Link href="#" className="footer-link">Contact</Link>
          </Grid>

          {/* Contact Us */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" className="footer-section-title">
              Contact Us
            </Typography>
            <Typography className="footer-contact-info">Contact Us</Typography>
            <Typography className="footer-contact-info">+91 9797XXXXXXX</Typography>
            <Typography className="footer-contact-info">cashIQ@company.com</Typography>
            <Typography className="footer-contact-info">company@email.com</Typography>
          </Grid>

          {/* Follow Us */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" className="footer-section-title">
              Follow Us
            </Typography>
            <Box>
              <FacebookIcon className="footer-social-icon" />
              <TwitterIcon className="footer-social-icon" />
              <InstagramIcon className="footer-social-icon" />
              <YouTubeIcon className="footer-social-icon" />
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" className="footer-section-title">
              Newsletter
            </Typography>
            <Box className="footer-newsletter-box">
              <TextField 
                variant="outlined" 
                placeholder="Enter your email" 
                size="small" 
                fullWidth
                className="footer-newsletter-input"
              />
              <Button 
                variant="contained" 
                color="primary" 
                className="footer-newsletter-btn"
              >
                <ArrowForwardIosIcon fontSize="small" />
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box className="footer-copyright">
          Copyright © 2025. All rights reserved.
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
