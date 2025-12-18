import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  TablePagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import "./TransactionTable.css";

interface Transaction {
  id: string;
  date: string;
  merchant: string;
  category: string;
  categoryIcon: React.ReactNode;
  amount: number;
  type: "income" | "expense";
}

// Dummy Data
const dummyTransactions: Transaction[] = [
  {
    id: "1",
    date: "Dec 18, 2025",
    merchant: "Starbucks",
    category: "Dining/Coffee",
    categoryIcon: <LocalCafeIcon color="action" fontSize="small" />,
    amount: 6.5,
    type: "expense",
  },
  {
    id: "2",
    date: "Dec 17, 2025",
    merchant: "Amazon",
    category: "Shopping",
    categoryIcon: <ShoppingCartIcon color="action" fontSize="small" />,
    amount: 45.2,
    type: "expense",
  },
  {
    id: "3",
    date: "Dec 15, 2025",
    merchant: "Landlord",
    category: "Rent",
    categoryIcon: <HomeIcon color="action" fontSize="small" />,
    amount: 1200.0,
    type: "expense",
  },
  {
    id: "4",
    date: "Dec 14, 2025",
    merchant: "Salary",
    category: "Income",
    categoryIcon: <AttachMoneyIcon color="success" fontSize="small" />,
    amount: 2600.0,
    type: "income",
  },
  {
    id: "5",
    date: "Dec 12, 2025",
    merchant: "Trader Joe's",
    category: "Groceries",
    categoryIcon: <RestaurantIcon color="action" fontSize="small" />,
    amount: 89.35,
    type: "expense",
  },
  {
    id: "6",
    date: "Dec 10, 2025",
    merchant: "Uber",
    category: "Transport",
    categoryIcon: <DirectionsCarIcon color="action" fontSize="small" />,
    amount: 18.75,
    type: "expense",
  },
];

const TransactionTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  return (
    <Paper className="transaction-table-container">
      <Box p={3} pb={1}>
        <Typography variant="h6" fontWeight="bold">
          All Transactions
        </Typography>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="transaction table">
          <TableHead className="transaction-table-head">
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Merchant</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyTransactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  className="transaction-row"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{row.merchant}</TableCell>
                  <TableCell>
                    <Box className="category-chip">
                      {row.category}
                      {row.categoryIcon}
                    </Box>
                  </TableCell>
                  <TableCell
                    align="right"
                    className={
                      row.type === "income"
                        ? "amount-positive"
                        : "amount-negative"
                    }
                  >
                    {row.type === "income" ? "+" : "-"}₹{row.amount.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      aria-controls={`action-menu-${row.id}`}
                      aria-haspopup="true"
                      onClick={(e) => handleMenuOpen(e, row.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={dummyTransactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
          Delete
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default TransactionTable;
