package com.cashiq.cashmanagement.repository;

import com.cashiq.cashmanagement.entity.Transaction;
import com.cashiq.cashmanagement.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    /**
     * Returns all transactions belonging to a specific user.
     */
    List<Transaction> findAllByUser(Users user);

    /**
     * Returns transactions for a user filtered by category and date range.
     * Used for custom-period budget spend calculations.
     */
    List<Transaction> findByUserAndCategoryAndDateBetween(Users user, String category, LocalDate startDate,
            LocalDate endDate);

    /**
     * Aggregates total spend per category for a user within a date range.
     * Returns a list of [category (String), totalAmount (Double)] pairs.
     *
     * Used by getUserBudgets to fetch all category totals in a single query,
     * avoiding the N+1 problem of querying spend separately for each budget.
     */
    @Query("SELECT t.category, SUM(t.amount) FROM Transaction t " +
           "WHERE t.user = :user AND t.date BETWEEN :startDate AND :endDate " +
           "GROUP BY t.category")
    List<Object[]> sumAmountByCategoryForUserAndDateBetween(
            @Param("user") Users user,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}
