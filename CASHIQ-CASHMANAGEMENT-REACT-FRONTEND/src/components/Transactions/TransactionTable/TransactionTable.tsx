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
  Typography,
  Box,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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
  rawDescription: string;
  category: string;
  categoryIcon: React.ReactNode;
  amount: number;
  type: "income" | "expense";
  isoDate: string;
}

interface TransactionTableProps {
  refreshTrigger?: boolean;
  onEdit?: (transaction: TransactionUI) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ refreshTrigger, onEdit }) => {
  const [transactions, setTransactions] = useState<TransactionUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await TransactionService.getAllTransactions();
        
        // Map DTO to UI model
        const mappedTransactions: TransactionUI[] = data.map((dto: TransactionDTO) => ({
            id: dto.id ? dto.id.toString() : Math.random().toString(), // Fallback if ID missing
            date: dto.date ? new Date(dto.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A',
            merchant: dto.paymentSource || "Unknown",
            rawDescription: dto.description || "",
            category: dto.category || "Uncategorized",
            categoryIcon: getCategoryIcon(dto.category || "Uncategorized"),
            amount: dto.amount,
            type: (dto.type === 'INCOME' || dto.type === 'DEPOSIT') ? 'income' : 'expense',
            isoDate: dto.date ? dto.date.toString() : ''
        }));
        
        setTransactions(mappedTransactions);
      } catch (error) {
        console.error("Failed to load transactions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [refreshTrigger]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };





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
                      <TableCell>
                        <Typography variant="body1" fontWeight="bold">
                            {row.merchant}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            {row.rawDescription}
                        </Typography>
                      </TableCell>
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
                        <Box className="transaction-actions">
                          <IconButton 
                              aria-label="edit" 
                              size="small"
                              onClick={() => onEdit && onEdit(row)}
                          >
                              <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton aria-label="delete" size="small" color="error">
                              <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </Box>
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


    </Paper>
  );
};

export default TransactionTable;
