package com.cashiq.cashmanagement.repository;

import com.cashiq.cashmanagement.entity.Debt;
import com.cashiq.cashmanagement.enums.DebtStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for managing Debt entities.
 */
@Repository
public interface DebtRepository extends JpaRepository<Debt, Long> {

    /**
     * Find list of debts associated with a specific user.
     *
     * @param userId ID of the user.
     * @return List of Debt entities.
     */
    List<Debt> findByUserId(Long userId);

    /**
     * Find list of debts for a user with a specific status.
     *
     * @param userId ID of the user.
     * @param status Status of the debt (e.g., ACTIVE).
     * @return List of Debt entities.
     */
    List<Debt> findByUserIdAndStatus(Long userId, DebtStatus status);
}
