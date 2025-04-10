
package com.example.expensetracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class BudgetRequest {
    @NotBlank
    private String category;
    
    @NotNull
    @Positive
    private BigDecimal amount;
    
    @NotNull
    private Integer year;
    
    @NotNull
    private Integer month;
}
