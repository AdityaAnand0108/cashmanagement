package com.cashiq.cashmanagement.controllers;

import com.cashiq.cashmanagement.dto.DebtEntryDTO;
import com.cashiq.cashmanagement.dto.DebtSummaryDTO;
import com.cashiq.cashmanagement.services.DebtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for managing Debt and IOU resources.
 */
@RestController
@RequestMapping("/api/debts")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DebtController {

    @Autowired
    private DebtService debtService;

    /**
     * Get summary of debts (Total Owed By vs Owed To) for a user.
     * EndPoint: GET /api/debts/summary?userId=123
     *
     * @param userId User ID.
     * @return DebtSummaryDTO.
     */
    @GetMapping("/summary")
    public ResponseEntity<DebtSummaryDTO> getDebtSummary(@RequestParam Long userId) {
        DebtSummaryDTO summary = debtService.getDebtSummary(userId);
        return ResponseEntity.ok(summary);
    }

    /**
     * Get list of all debts for a user.
     * EndPoint: GET /api/debts?userId=123
     *
     * @param userId User ID.
     * @return List of DebtEntryDTO.
     */
    @GetMapping
    public ResponseEntity<List<DebtEntryDTO>> getAllDebts(@RequestParam Long userId) {
        List<DebtEntryDTO> debts = debtService.getAllDebts(userId);
        return ResponseEntity.ok(debts);
    }

    /**
     * Create a new debt record.
     * EndPoint: POST /api/debts?userId=123
     *
     * @param userId       User ID.
     * @param debtEntryDTO Data payload.
     * @return Created DebtEntryDTO.
     */
    @PostMapping
    public ResponseEntity<DebtEntryDTO> createDebt(@RequestParam Long userId, @RequestBody DebtEntryDTO debtEntryDTO) {
        DebtEntryDTO createdDebt = debtService.createDebt(userId, debtEntryDTO);
        return ResponseEntity.status(201).body(createdDebt);
    }

    /**
     * Record a payment or partial settlement.
     * EndPoint: PUT /api/debts/{id}/payment?userId=123
     * Body: { "amount": 100.00 }
     *
     * @param id      Debt ID.
     * @param userId  User ID (for security check).
     * @param payload Map containing "amount".
     * @return Updated DebtEntryDTO.
     */
    @PutMapping("/{id}/payment")
    public ResponseEntity<DebtEntryDTO> recordPayment(
            @PathVariable Long id,
            @RequestParam Long userId,
            @RequestBody Map<String, BigDecimal> payload) {

        BigDecimal amount = payload.get("amount");
        DebtEntryDTO updatedDebt = debtService.recordPayment(userId, id, amount);
        return ResponseEntity.ok(updatedDebt);
    }

    /**
     * Delete a debt record.
     * EndPoint: DELETE /api/debts/{id}?userId=123
     *
     * @param id     Debt ID.
     * @param userId User ID (for security check).
     * @return Response status.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDebt(@PathVariable Long id, @RequestParam Long userId) {
        return debtService.deleteDebt(userId, id);
    }
}
