
import { useMemo } from 'react';
import { BaseData } from '@/types/dashboard';
import { DashboardCalculations } from '@/types/dashboard';

/**
 * Custom hook for calculating dashboard metrics and derived data
 * Memoizes calculations for performance optimization
 * @param baseData - The base dashboard data
 * @returns Calculated dashboard metrics
 */
export const useDashboardCalculations = (baseData: BaseData): DashboardCalculations => {
  // Create stable reference for baseData to prevent unnecessary recalculations
  const stableBaseData = useMemo(() => baseData, [
    baseData.income,
    JSON.stringify(baseData.categories),
    JSON.stringify(baseData.debts),
    JSON.stringify(baseData.goals)
  ]);

  // Memoize debt calculations separately
  const debtCalculations = useMemo(() => {
    const actualDebtPayments = stableBaseData.debts.reduce((sum, debt) => sum + (debt.totalPaid || 0), 0);
    const totalMinPayments = stableBaseData.debts.reduce((sum, debt) => sum + debt.minPayment, 0);
    const totalPlannedPayments = stableBaseData.debts.reduce((sum, debt) => sum + (debt.plannedPayment || debt.minPayment), 0);
    const totalPaid = actualDebtPayments;
    const maxTotalPayment = Math.max(totalMinPayments, totalPlannedPayments, totalPaid);
    
    return {
      actualDebtPayments,
      totalMinPayments,
      totalPlannedPayments,
      totalPaid,
      maxTotalPayment
    };
  }, [stableBaseData.debts]);

  // Memoize goal calculations separately
  const goalCalculations = useMemo(() => {
    const totalMonthlyContributions = stableBaseData.goals.reduce(
      (sum, goal) => sum + goal.monthlyContribution,
      0
    );
    const totalPlannedContributions = stableBaseData.goals.reduce(
      (sum, goal) =>
        sum + (goal.plannedContribution ?? goal.monthlyContribution),
      0
    );

    return {
      totalMonthlyContributions,
      totalPlannedContributions
    };
  }, [stableBaseData.goals]);

  // Memoize updated categories separately
  const updatedCategories = useMemo(() => {
    return stableBaseData.categories.map(cat => {
      if (cat.name === 'DEBT') {
        return {
          ...cat,
          amount: debtCalculations.actualDebtPayments,
          budget: debtCalculations.totalPlannedPayments
        };
      }

      if (cat.name === 'GOALS') {
        return {
          ...cat,
          amount: goalCalculations.totalMonthlyContributions,
          budget: goalCalculations.totalPlannedContributions
        };
      }

      return cat;
    });
  }, [
    stableBaseData.categories,
    debtCalculations.actualDebtPayments,
    debtCalculations.totalPlannedPayments,
    goalCalculations.totalMonthlyContributions,
    goalCalculations.totalPlannedContributions
  ]);

  // Memoize monthly data
  const monthlyData = useMemo(() => {
    const expenses = updatedCategories
      .filter(cat => cat.name === 'NEEDS' || cat.name === 'WANTS')
      .reduce((sum, cat) => sum + cat.amount, 0);
    
    const goals = updatedCategories.find(cat => cat.name === 'GOALS')?.amount || 0;

    return {
      income: stableBaseData.income,
      expenses,
      debt: debtCalculations.actualDebtPayments,
      goals,
      categories: updatedCategories,
      debts: stableBaseData.debts,
      goalItems: stableBaseData.goals
    };
  }, [stableBaseData.income, stableBaseData.debts, stableBaseData.goals, updatedCategories, debtCalculations.actualDebtPayments]);

  // Memoize budget calculations
  const budgetCalculations = useMemo(() => {
    const totalBudget = monthlyData.income;
    const totalSpent = updatedCategories.reduce((sum, cat) => sum + cat.amount, 0);
    const remaining = monthlyData.income - totalSpent;
    
    // Debug logging to track calculation issues
    console.log('Dashboard Calculations - Budget calculations:', {
      totalBudget,
      totalSpent,
      remaining,
      updatedCategories: updatedCategories.map(cat => ({ name: cat.name, amount: cat.amount, budget: cat.budget }))
    });
    
    return {
      totalBudget,
      totalSpent,
      remaining
    };
  }, [monthlyData.income, updatedCategories]);

  // Memoize validation checks
  const validationChecks = useMemo(() => {
    const debtBudget = updatedCategories.find(cat => cat.name === 'DEBT')?.budget || 0;
    const totalBudgetAmount = updatedCategories.reduce((sum, cat) => sum + cat.budget, 0);
    const isDebtPaymentConsistent = debtBudget >= debtCalculations.totalMinPayments;
    const isBudgetBalanced = totalBudgetAmount <= monthlyData.income;
    
    return {
      isDebtPaymentConsistent,
      isBudgetBalanced
    };
  }, [
    updatedCategories,
    debtCalculations.totalMinPayments,
    monthlyData.income
  ]);

  // Return memoized final result
  return useMemo(() => ({
    monthlyData,
    totalBudget: budgetCalculations.totalBudget,
    totalSpent: budgetCalculations.totalSpent,
    remaining: budgetCalculations.remaining,
    totalMinPayments: debtCalculations.totalMinPayments,
    totalPlannedPayments: debtCalculations.totalPlannedPayments,
    totalPaid: debtCalculations.totalPaid,
    maxTotalPayment: debtCalculations.maxTotalPayment,
    isDebtPaymentConsistent: validationChecks.isDebtPaymentConsistent,
    isBudgetBalanced: validationChecks.isBudgetBalanced,
    spendingCategories: updatedCategories
  }), [
    monthlyData,
    budgetCalculations,
    debtCalculations,
    validationChecks,
    updatedCategories
  ]);
};
