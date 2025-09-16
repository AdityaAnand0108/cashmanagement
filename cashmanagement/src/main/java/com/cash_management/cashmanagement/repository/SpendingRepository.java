package com.cash_management.cashmanagement.repository;

import com.cash_management.cashmanagement.entity.Spending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;

public interface SpendingRepository extends JpaRepository<Spending, Long> {

    /**
     * Sum totalSpending for Spending records between two dates (inclusive).
     * Use LocalDate for start/end for better index usage in DB.
     */
    @Query("SELECT SUM(s.totalSpending) FROM Spending s WHERE s.date BETWEEN :startDate AND :endDate")
    Double getTotalSpendingForMonth(@Param("startDate") LocalDate startDate,
                                    @Param("endDate") LocalDate endDate);

    /**
     * Finds a Spending record by exact date (one record per date assumption).
     */
    Optional<Spending> findByDate(LocalDate date);
}
