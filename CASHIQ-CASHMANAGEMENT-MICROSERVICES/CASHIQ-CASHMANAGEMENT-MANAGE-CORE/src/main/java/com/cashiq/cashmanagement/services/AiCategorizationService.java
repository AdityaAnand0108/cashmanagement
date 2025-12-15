package com.cashiq.cashmanagement.services;

import com.cashiq.cashmanagement.dto.ExpenseAnalysisResponseDTO;

public interface AiCategorizationService {

    ExpenseAnalysisResponseDTO analyzeExpense(String userDescription);
}
