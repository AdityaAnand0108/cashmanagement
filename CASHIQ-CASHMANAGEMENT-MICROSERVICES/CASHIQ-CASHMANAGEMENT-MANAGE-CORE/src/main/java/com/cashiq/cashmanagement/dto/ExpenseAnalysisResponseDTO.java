package com.cashiq.cashmanagement.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ExpenseAnalysisResponseDTO {

    private String status;
    @JsonProperty("parsed_data")
    private ParsedData parsedData;

    public String getCategory() {
        return parsedData != null ? parsedData.getCategory() : null;
    }

    public Double getConfidence() {
        return parsedData != null ? parsedData.getConfidence() : null;
    }

    @Data
    public static class ParsedData {
        private Double amount;
        private String category;
        private String date; // Python sends date as String
        private Double confidence;

        @JsonProperty("payment_source")
        private String paymentSource;
    }
}
