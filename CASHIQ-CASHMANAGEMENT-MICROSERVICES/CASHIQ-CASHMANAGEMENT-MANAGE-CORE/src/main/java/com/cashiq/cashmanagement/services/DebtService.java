package com.cashiq.cashmanagement.services;

import com.cashiq.cashmanagement.dto.DebtEntryDTO;
import com.cashiq.cashmanagement.dto.DebtSummaryDTO;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;

/**
 * Service interface for managing Debt and IOU logic.
 */
public interface DebtService {

    /**
     * Retrieves all debts for a given user.
     *
     * @param userId ID of the user.
     * @return List of DebtEntryDTOs.
     */
    List<DebtEntryDTO> getAllDebts(Long userId);

    /**
     * Retrieves a summary of total debts owed by and to the user.
     *
     * @param userId ID of the user.
     * @return DebtSummaryDTO containing totals.
     */
    DebtSummaryDTO getDebtSummary(Long userId);

    /**
     * Creates a new debt record.
     *
     * @param userId       ID of the user.
     * @param debtEntryDTO Data for the new debt.
     * @return The created DebtEntryDTO.
     */
    DebtEntryDTO createDebt(Long userId, DebtEntryDTO debtEntryDTO);

    /**
     * Records a payment towards a specific debt, reducing the balance.
     *
     * @param userId ID of the user (for verification).
     * @param debtId ID of the debt to pay.
     * @param amount Amount to pay/reduce.
     * @return The updated DebtEntryDTO.
     */
    DebtEntryDTO recordPayment(Long userId, Long debtId, BigDecimal amount);

    /**
     * Deletes a debt record.
     *
     * @param userId ID of the user (for verification).
     * @param debtId ID of the debt to delete.
     * @return Response status.
     */
    ResponseEntity<?> deleteDebt(Long userId, Long debtId);
}
