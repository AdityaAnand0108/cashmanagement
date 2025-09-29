package com.cash_management.cashmanagement.repositories;

import com.cash_management.cashmanagement.entities.Spending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

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
    Spending findByDate(LocalDate date);

    List<Spending> findAllByDateBetween(LocalDate startDate, LocalDate endDate);
}
