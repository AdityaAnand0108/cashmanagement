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
  TableSortLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EmptyState from "../../common/EmptyState/EmptyState";
import "./TransactionTable.css";
import TransactionService from "../../../services/TransactionService";
import type { TransactionDTO } from "../../../models/Transaction";
import BudgetService from "../../../services/BudgetService";
import type { BudgetDTO } from "../../../models/Budget";
import { getCategoryIcon } from "../../../utils/CategoryIconUtils";
import { extractMerchant } from "../../../utils/SmartParser";
import ConfirmationModal from "../../common/ConfirmationModal/ConfirmationModal";
import { toast } from "react-toastify";
import { Chip } from "@mui/material";

interface TransactionUI {
  id: string;
  date: string;
  merchant: string;
  rawDescription: string;
  paymentSource: string;
  category: string;
  categoryIcon: React.ReactNode;
  amount: number;
  type: "income" | "expense";
  isoDate: string;
}

interface TransactionTableProps {
  refreshTrigger?: boolean;
  onEdit?: (transaction: TransactionUI) => void;
  filterDateRange?: string;
  filterCategory?: string;
  filterSearchQuery?: string;
}

type Order = 'asc' | 'desc';

const TransactionTable: React.FC<TransactionTableProps> = ({ 
    refreshTrigger, 
    onEdit,
    filterDateRange = 'This Month',
    filterCategory = 'All Categories',
    filterSearchQuery = ''
}) => {
  const [transactions, setTransactions] = useState<TransactionUI[]>([]);
  const [budgets, setBudgets] = useState<BudgetDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof TransactionUI>('date');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactionsAndBudgets = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('userId');
        const [transData, budgetData] = await Promise.all([
             TransactionService.getAllTransactions(),
             userId ? BudgetService.getUserBudgets(Number(userId)) : Promise.resolve([])
        ]);
        
        // Map DTO to UI model
        const mappedTransactions: TransactionUI[] = transData.map((dto: TransactionDTO) => {
            const extractedMerchant = extractMerchant(dto.description || "");
            const displayMerchant = (extractedMerchant !== "Unknown Merchant") 
                ? extractedMerchant 
                : (dto.paymentSource || "Unknown");

            return {
                id: dto.id ? dto.id.toString() : Math.random().toString(), // Fallback if ID missing
                date: dto.date ? new Date(dto.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A',
                merchant: displayMerchant,
                rawDescription: dto.description || "",
                paymentSource: dto.paymentSource || "",
                category: dto.category || "Uncategorized",
                categoryIcon: getCategoryIcon(dto.category || "Uncategorized"),
                amount: dto.amount,
                type: (dto.type === 'INCOME' || dto.type === 'DEPOSIT') ? 'income' : 'expense',
                isoDate: dto.date ? dto.date.toString() : ''
            };
        });
        
        setTransactions(mappedTransactions);
        setBudgets(budgetData);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionsAndBudgets();
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

  const handleRequestSort = (property: keyof TransactionUI) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property: keyof TransactionUI) => () => {
    handleRequestSort(property);
  };

  const filteredTransactions = React.useMemo(() => {
    return transactions.filter((transaction) => {
        // 1. Search Filter
        const searchLower = filterSearchQuery.toLowerCase();
        const matchesSearch = 
            transaction.merchant.toLowerCase().includes(searchLower) ||
            transaction.rawDescription.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;

        // 2. Category Filter
        if (filterCategory !== 'All Categories' && transaction.category !== filterCategory) {
            return false;
        }

        // 3. Date Range Filter
        const transDate = new Date(transaction.isoDate);
        const now = new Date();
        
        // Helper to check if dates are in the same month/year
        const isSameMonth = (d1: Date, d2: Date) => d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
        
        if (filterDateRange === 'This Month') {
            if (!isSameMonth(transDate, now)) return false;
        } else if (filterDateRange === 'Last 7 Days') {
            const sevenDaysAgo = new Date(now);
            sevenDaysAgo.setDate(now.getDate() - 7);
            if (transDate < sevenDaysAgo) return false;
        } else if (filterDateRange === 'Last Month') {
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            if (!isSameMonth(transDate, lastMonth)) return false;
        } else if (filterDateRange === 'Last 3 Months') {
            const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
            if (transDate < threeMonthsAgo) return false;
        } else if (filterDateRange === 'This Year') {
             if (transDate.getFullYear() !== now.getFullYear()) return false;
        }

        return true;
    }).sort((a, b) => {
        // Sorting logic (currently only handling date primarily)
        if (orderBy === 'date') {
            const dateA = new Date(a.isoDate).getTime();
            const dateB = new Date(b.isoDate).getTime();
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        }
        return 0;
    });
  }, [transactions, filterSearchQuery, filterCategory, filterDateRange, order, orderBy]);

  const handleDeleteClick = (id: string) => {
    setSelectedTransactionId(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedTransactionId) return;

    try {
        await TransactionService.deleteTransaction(Number(selectedTransactionId));
        toast.success("Transaction deleted successfully");
        setTransactions(prev => prev.filter(t => t.id !== selectedTransactionId));
    } catch (error) {
        console.error("Failed to delete transaction", error);
        toast.error("Failed to delete transaction");
    } finally {
        setDeleteConfirmOpen(false);
        setSelectedTransactionId(null);
    }
  };





  if (loading) {
      return (
          <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
          </Box>
      );
  }

  return (
    <>
    <Paper className="transaction-table-container">
      <Box p={3} pb={1}>
        <Typography variant="h6" fontWeight="bold">
          All Transactions
        </Typography>
      </Box>

      {filteredTransactions.length === 0 ? (
        <Box px={3} pb={3}>
            <EmptyState
            title="No transactions found"
            description="Try adjusting your filters or search query."
            icon={<ReceiptLongIcon sx={{ fontSize: 60, color: '#94a3b8', mb: 2 }} />}
            />
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="transaction table">
              <TableHead className="transaction-table-head">
                <TableRow>
                  <TableCell align="left" width="15%">
                      <TableSortLabel
                        active={orderBy === 'date'}
                        direction={orderBy === 'date' ? order : 'asc'}
                        onClick={createSortHandler('date')}
                      >
                        Date
                      </TableSortLabel>
                  </TableCell>
                  <TableCell align="left" width="35%">Description</TableCell>
                  <TableCell align="left" width="20%">Category</TableCell>
                  <TableCell align="right" width="15%">Amount</TableCell>
                  <TableCell align="right" width="15%">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      className="transaction-row"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="left">
                        {row.date}
                      </TableCell>
                      <TableCell align="left">
                        <Box display="flex" flexDirection="column" gap={0.5}>
                            {/* Full Description (Grey/Small as requested) */}
                            <Typography 
                                variant="body2" 
                                color="text.primary" 
                                sx={{ textTransform: 'capitalize' }}
                            >
                                {row.rawDescription}
                            </Typography>

                            {/* Payment Source Badge */}
                            {row.paymentSource && (
                                <Box display="flex" alignItems="center" gap={1} mt={1}>
                                    <Chip 
                                        label={row.paymentSource.toUpperCase()} 
                                        size="small" 
                                        variant="outlined" 
                                        sx={{ 
                                            height: '20px', 
                                            fontSize: '0.7rem', 
                                            fontWeight: '600',
                                            color: '#64748b',
                                            borderColor: '#e2e8f0',
                                            backgroundColor: '#f8fafc'
                                        }} 
                                    />
                                </Box>
                            )}
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Box className="category-chip" mb={0.5}>
                          {row.category}
                          {row.categoryIcon}
                        </Box>
                        {(() => {
                           // Find budget for this category
                           const budget = budgets.find(b => b.category === row.category);
                           if (budget && budget.limitAmount > 0) {
                               const spent = budget.spentAmount || 0;
                               const percent = Math.min(Math.round((spent / budget.limitAmount) * 100), 100);
                               return (
                                   <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                       {percent}% of {row.category} Budget
                                   </Typography>
                               );
                           }
                           return null;
                        })()}
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
                          <IconButton 
                            aria-label="delete" 
                            size="small" 
                            color="error"
                            onClick={() => handleDeleteClick(row.id)}
                          >
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
            count={filteredTransactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}


    </Paper>
      <ConfirmationModal
        open={deleteConfirmOpen}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default TransactionTable;
