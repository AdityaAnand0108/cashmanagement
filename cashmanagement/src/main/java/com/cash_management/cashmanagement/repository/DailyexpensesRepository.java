package com.cash_management.cashmanagement.repository;

import com.cash_management.cashmanagement.entity.Dailyexpenses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyexpensesRepository extends JpaRepository<Dailyexpenses, Long> {
}
