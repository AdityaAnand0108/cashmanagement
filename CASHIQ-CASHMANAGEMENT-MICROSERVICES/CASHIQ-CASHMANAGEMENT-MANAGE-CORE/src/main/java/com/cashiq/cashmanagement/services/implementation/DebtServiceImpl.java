package com.cashiq.cashmanagement.services.implementation;

import com.cashiq.cashmanagement.dto.DebtEntryDTO;
import com.cashiq.cashmanagement.dto.DebtSummaryDTO;
import com.cashiq.cashmanagement.entity.Debt;
import com.cashiq.cashmanagement.entity.Users;
import com.cashiq.cashmanagement.enums.DebtStatus;
import com.cashiq.cashmanagement.enums.DebtType;
import com.cashiq.cashmanagement.exception.ResourceNotFoundException;
import com.cashiq.cashmanagement.repository.DebtRepository;
import com.cashiq.cashmanagement.repository.UserRepository;
import com.cashiq.cashmanagement.services.DebtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of the DebtService.
 */
@Service
public class DebtServiceImpl implements DebtService {

    @Autowired
    private DebtRepository debtRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<DebtEntryDTO> getAllDebts(Long userId) {
        return debtRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DebtSummaryDTO getDebtSummary(Long userId) {
        List<Debt> debts = debtRepository.findByUserIdAndStatus(userId, DebtStatus.ACTIVE);

        BigDecimal totalOwedByUser = BigDecimal.ZERO;
        BigDecimal totalOwedToUser = BigDecimal.ZERO;

        for (Debt debt : debts) {
            if (debt.getDebtType() == DebtType.OWED_BY_USER) {
                totalOwedByUser = totalOwedByUser.add(debt.getCurrentBalance());
            } else if (debt.getDebtType() == DebtType.OWED_TO_USER) {
                totalOwedToUser = totalOwedToUser.add(debt.getCurrentBalance());
            }
        }

        return new DebtSummaryDTO(totalOwedByUser, totalOwedToUser);
    }

    @Override
    @Transactional
    public DebtEntryDTO createDebt(Long userId, DebtEntryDTO dto) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Debt debt = new Debt();
        debt.setUser(user);
        debt.setTitle(dto.getTitle());
        debt.setCounterparty(dto.getCounterparty());
        debt.setDebtType(dto.getDebtType());
        debt.setOriginalAmount(dto.getOriginalAmount());
        debt.setCurrentBalance(dto.getOriginalAmount()); // Initial balance = original amount
        debt.setInterestRate(dto.getInterestRate());
        debt.setDueDate(dto.getDueDate());
        debt.setNextPaymentDate(dto.getNextPaymentDate());
        debt.setNextPaymentAmount(dto.getNextPaymentAmount());
        debt.setStatus(DebtStatus.ACTIVE);

        Debt savedDebt = debtRepository.save(debt);
        return convertToDTO(savedDebt);
    }

    @Override
    @Transactional
    public DebtEntryDTO recordPayment(Long userId, Long debtId, BigDecimal amount) {
        Debt debt = debtRepository.findById(debtId)
                .orElseThrow(() -> new ResourceNotFoundException("Debt not found with id: " + debtId));

        if (!debt.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Debt does not belong to user with id: " + userId);
        }

        BigDecimal newBalance = debt.getCurrentBalance().subtract(amount);
        if (newBalance.compareTo(BigDecimal.ZERO) < 0) {
            newBalance = BigDecimal.ZERO;
        }

        debt.setCurrentBalance(newBalance);

        if (newBalance.compareTo(BigDecimal.ZERO) == 0) {
            debt.setStatus(DebtStatus.SETTLED);
        }

        Debt savedDebt = debtRepository.save(debt);
        return convertToDTO(savedDebt);
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteDebt(Long userId, Long debtId) {
        Debt debt = debtRepository.findById(debtId)
                .orElseThrow(() -> new ResourceNotFoundException("Debt not found with id: " + debtId));

        if (!debt.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Debt does not belong to user with id: " + userId);
        }

        debtRepository.delete(debt);
        return ResponseEntity.ok().build();
    }

    private DebtEntryDTO convertToDTO(Debt debt) {
        return new DebtEntryDTO(
                debt.getId(),
                debt.getUser().getId(),
                debt.getDebtType(),
                debt.getTitle(),
                debt.getCounterparty(),
                debt.getOriginalAmount(),
                debt.getCurrentBalance(),
                debt.getInterestRate(),
                debt.getDueDate(),
                debt.getNextPaymentDate(),
                debt.getNextPaymentAmount(),
                debt.getStatus());
    }
}
