
package com.example.expensetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetResponse {
    private Long id;
    private String category;
    private BigDecimal amount;
    private Integer year;
    private Integer month;
    private BigDecimal spentAmount;
}
