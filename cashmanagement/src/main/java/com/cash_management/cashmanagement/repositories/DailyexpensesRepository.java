package com.cash_management.cashmanagement.repositories;

import com.cash_management.cashmanagement.entities.DailyExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DailyexpensesRepository extends JpaRepository<DailyExpense, Long> {

    /**
     * Find all daily expenses for a given exact date.
     */
    List<DailyExpense> findAllByDate(LocalDate date);

    /**
     * Find all daily expenses between two dates (inclusive).
     */
    List<DailyExpense> findAllByDateBetween(LocalDate start, LocalDate end);
}
