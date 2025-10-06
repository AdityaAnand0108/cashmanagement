import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, IconButton,
  Menu, MenuItem, Skeleton, Box
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "./TodaysSpendingTable.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

/**
 *   TodaysSpendingTable
 * - Externalized CSS to CSS module for maintainability
 * - Improved loading UX (skeleton), formatting, accessibility
 * - Responsive overflow and sticky header
 */
export default function TodaysSpendingTable({ endpoint = "http://localhost:8080/cashmanagement/spending" }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    setLoading(true);
    setError(null);

    fetch(`${endpoint}?date=${today}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setExpenses(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch spending data:", err);
        setError("Failed to load spending.");
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  // memoize formatted rows to avoid recalculation on renders
  const formattedExpenses = useMemo(() => {
    return expenses.map((e, i) => {
      const date = e.time ? new Date(e.time) : null;
      const timeStr = date
        ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : e.time || "-";
      const amount = Number(e.amount) || 0;
      // localized currency formatting
      const formattedAmount = amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      });
      return { ...e, _timeStr: timeStr, _formattedAmount: formattedAmount, _key: e.id ?? i };
    });
  }, [expenses]);

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleView = () => {
    // Replace with modal or route navigation
    // added safe access and fallback
    alert(`Viewing: ${selectedRow?.description ?? "—"}`);
    handleMenuClose();
  };

  const handleEdit = () => {
    // Replace with modal or route navigation
    alert(`Editing: ${selectedRow?.description ?? "—"}`);
    handleMenuClose();
  };

  return (
    <section className={styles.wrapper} aria-labelledby="todays-spending-title">
      <Paper elevation={2} className={styles.card}>
        <Box className={styles.header}>
          <Typography id="todays-spending-title" variant="h6" component="h2" className={styles.title}>
            Today's Spending
          </Typography>
        </Box>

        <TableContainer className={styles.tableContainer} component="div" role="region" aria-label="Today's spending table">
          <Table className={styles.table} aria-describedby="todays-spending-desc">
            <TableHead className={styles.tableHead}>
              <TableRow>
                <TableCell className={styles.colDescription}>Description</TableCell>
                <TableCell className={styles.colCategory}>Category</TableCell>
                <TableCell className={styles.colTime}>Time</TableCell>
                <TableCell align="right" className={styles.colAmount}>Amount (₹)</TableCell>
                <TableCell align="center" className={styles.colActions} aria-hidden>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                // show 4 skeleton rows for loading
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`} className={styles.row}>
                    <TableCell><Skeleton variant="text" width="80%" /></TableCell>
                    <TableCell><Skeleton variant="text" width="60%" /></TableCell>
                    <TableCell><Skeleton variant="text" width="40%" /></TableCell>
                    <TableCell align="right"><Skeleton variant="text" width="60px" /></TableCell>
                    <TableCell align="center"><Skeleton variant="circular" width={36} height={36} /></TableCell>
                  </TableRow>
                ))
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" className={styles.error}>
                    {error}
                  </TableCell>
                </TableRow>
              ) : formattedExpenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" className={styles.empty}>
                    No spending recorded today.
                  </TableCell>
                </TableRow>
              ) : (
                formattedExpenses.map((exp) => (
                  <TableRow key={exp._key} className={styles.row} tabIndex={0}>
                    <TableCell className={styles.descriptionCell}>{exp.description ?? "-"}</TableCell>
                    <TableCell>{exp.category ?? "-"}</TableCell>
                    <TableCell>{exp._timeStr}</TableCell>
                    <TableCell align="right" className={styles.amountCell}>{exp._formattedAmount}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label={`actions for ${exp.description ?? "row"}`}
                        onClick={(e) => handleMenuOpen(e, exp)}
                        size="small"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleView} className={styles.menuItemIcon}>
            <VisibilityIcon fontSize="small" />
            View
          </MenuItem>
          <MenuItem onClick={handleEdit} className={styles.menuItemIcon}>
            <EditIcon fontSize="small" />
            Edit
          </MenuItem>
        </Menu>

      </Paper>
      <Typography id="todays-spending-desc" variant="caption" className={styles.smallNote}>
        Data is pulled for today in YYYY-MM-DD. Times shown in local device time.
      </Typography>
    </section>
  );
}

TodaysSpendingTable.propTypes = {
  /** Base endpoint for fetching today's spending. Default mirrors existing backend. */
  endpoint: PropTypes.string,
};
