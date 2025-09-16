package com.cash_management.cashmanagement.repository;

import com.cash_management.cashmanagement.entity.Dailyexpenses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DailyexpensesRepository extends JpaRepository<Dailyexpenses, Long> {

    /**
     * Find all daily expenses for a given exact date.
     */
    List<Dailyexpenses> findAllByDate(LocalDate date);

    /**
     * Find all daily expenses between two dates (inclusive).
     */
    List<Dailyexpenses> findAllByDateBetween(LocalDate start, LocalDate end);
}
