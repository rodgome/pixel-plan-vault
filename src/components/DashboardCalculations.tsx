
import { useMemo } from 'react';
import { BaseData } from './DashboardData';

export const useDashboardCalculations = (baseData: BaseData) => {
  return useMemo(() => {
    // Calculate actual debt payments from individual debt items
    const actualDebtPayments = baseData.debts.reduce((sum, debt) => sum + (debt.totalPaid || 0), 0);
    
    // Update the debt category amount to reflect actual payments
    const updatedCategories = baseData.categories.map(cat => 
      cat.name === 'DEBT' 
        ? { ...cat, amount: actualDebtPayments }
        : cat
    );

    // Reactive calculations - all derived from base data
    const monthlyData = {
      income: baseData.income,
      // Calculate actual amounts from categories - this will update when spending changes
      expenses: updatedCategories.filter(cat => cat.name === 'NEEDS' || cat.name === 'WANTS').reduce((sum, cat) => sum + cat.amount, 0),
      debt: actualDebtPayments, // Use calculated debt payments directly
      goals: updatedCategories.find(cat => cat.name === 'GOALS')?.amount || 0,
      categories: updatedCategories, // Use updated categories with actual debt payments
      debts: baseData.debts,
      goalItems: baseData.goals
    };

    // Reactive financial calculations - these will update when spending changes
    const totalBudget = monthlyData.income;
    const totalSpent = updatedCategories.reduce((sum, cat) => sum + cat.amount, 0);
    const remaining = monthlyData.income - totalSpent;

    // Debt calculations
    const totalMinPayments = monthlyData.debts.reduce((sum, debt) => sum + debt.minPayment, 0);
    const totalPlannedPayments = monthlyData.debts.reduce((sum, debt) => sum + (debt.plannedPayment || debt.minPayment), 0);
    const totalPaid = monthlyData.debts.reduce((sum, debt) => sum + (debt.totalPaid || 0), 0);
    const maxTotalPayment = Math.max(totalMinPayments, totalPlannedPayments, totalPaid);

    // Validation checks (reactive) - Updated to use budget amounts instead of spent amounts
    const debtBudget = baseData.categories.find(cat => cat.name === 'DEBT')?.budget || 0;
    const totalBudgetAmount = baseData.categories.reduce((sum, cat) => sum + cat.budget, 0);
    const isDebtPaymentConsistent = debtBudget >= totalMinPayments;
    const isBudgetBalanced = totalBudgetAmount <= monthlyData.income;

    // Include all categories for spending analysis - this allows debt progress to update live
    const spendingCategories = updatedCategories;

    return {
      monthlyData,
      totalBudget,
      totalSpent,
      remaining,
      totalMinPayments,
      totalPlannedPayments,
      totalPaid,
      maxTotalPayment,
      isDebtPaymentConsistent,
      isBudgetBalanced,
      spendingCategories
    };
  }, [baseData]);
};
