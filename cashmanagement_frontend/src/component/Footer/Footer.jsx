import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { footerSx } from "./footerStyles";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={footerSx.footer}>
      <Typography variant="body2" sx={footerSx.text}>
        © {currentYear} Cash Management. All rights reserved.
      </Typography>

      <Box sx={footerSx.links}>
        <Link href="#" underline="hover" sx={footerSx.link}>
          Privacy Policy
        </Link>
        <Link href="#" underline="hover" sx={footerSx.link}>
          Terms of Service
        </Link>
        <Link href="#" underline="hover" sx={footerSx.link}>
          Contact
        </Link>
      </Box>
    </Box>
  );
}
