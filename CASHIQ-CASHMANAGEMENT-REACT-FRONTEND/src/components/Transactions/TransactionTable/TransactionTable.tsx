import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EmptyState from "../../common/EmptyState/EmptyState";
import "./TransactionTable.css";
import TransactionService from "../../../services/TransactionService";
import type { TransactionDTO } from "../../../models/Transaction";
import { getCategoryIcon } from "../../../utils/CategoryIconUtils"; // Assuming this utility exists based on previous files

interface TransactionUI {
  id: string;
  date: string;
  merchant: string;
  category: string;
  categoryIcon: React.ReactNode;
  amount: number;
  type: "income" | "expense";
}

const TransactionTable: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await TransactionService.getAllTransactions();
        
        // Map DTO to UI model
        const mappedTransactions: TransactionUI[] = data.map((dto: TransactionDTO) => ({
            id: dto.id ? dto.id.toString() : Math.random().toString(), // Fallback if ID missing
            date: dto.date ? new Date(dto.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A',
            merchant: dto.description || "Unknown",
            category: dto.category || "Uncategorized",
            categoryIcon: getCategoryIcon(dto.category || "Uncategorized"),
            amount: dto.amount,
            type: (dto.type === 'INCOME' || dto.type === 'DEPOSIT') ? 'income' : 'expense'
        }));
        
        setTransactions(mappedTransactions);
      } catch (error) {
        console.error("Failed to load transactions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
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

  // Used for future edit/delete implementations
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _currentSelectedId = selectedId;

  if (loading) {
      return (
          <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
          </Box>
      );
  }

  return (
    <Paper className="transaction-table-container">
      <Box p={3} pb={1}>
        <Typography variant="h6" fontWeight="bold">
          All Transactions
        </Typography>
      </Box>

      {transactions.length === 0 ? (
        <Box px={3} pb={3}>
            <EmptyState
            title="No transactions yet"
            description="Your transactions will appear here once you start spending or earning."
            icon={<ReceiptLongIcon sx={{ fontSize: 60, color: '#94a3b8', mb: 2 }} />}
            />
        </Box>
      ) : (
        <>
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
                {transactions
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
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

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
