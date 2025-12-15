package com.cashiq.cashmanagement.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ExpenseAnalysisResponseDTO {

    private String status;

    // Matches the "parsed_data" object in JSON
    @JsonProperty("parsed_data")
    private ParsedData parsedData;

    @Data
    public static class ParsedData {
        private Double amount;
        private String category;
        private String date; // Python sends date as String

        @JsonProperty("payment_source")
        private String paymentSource;
    }
}
