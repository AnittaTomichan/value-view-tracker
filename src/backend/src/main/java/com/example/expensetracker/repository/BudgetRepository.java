
package com.example.expensetracker.repository;

import com.example.expensetracker.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByUserIdAndYearMonth(Long userId, YearMonth yearMonth);
    Optional<Budget> findByUserIdAndCategoryAndYearMonth(Long userId, String category, YearMonth yearMonth);
}
