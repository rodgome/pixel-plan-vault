
import { useMemo } from 'react';
import { BaseData } from './DashboardData';

export const useDashboardCalculations = (baseData: BaseData) => {
  return useMemo(() => {
    // Reactive calculations - all derived from base data
    const monthlyData = {
      income: baseData.income,
      // Calculate actual amounts from categories - this will update when spending changes
      expenses: baseData.categories.filter(cat => cat.name === 'NEEDS' || cat.name === 'WANTS').reduce((sum, cat) => sum + cat.amount, 0),
      debt: baseData.categories.find(cat => cat.name === 'DEBT')?.amount || 0,
      savings: baseData.categories.find(cat => cat.name === 'SAVINGS')?.amount || 0,
      investing: baseData.categories.find(cat => cat.name === 'INVESTING')?.amount || 0,
      categories: baseData.categories,
      debts: baseData.debts,
      goals: baseData.goals
    };

    // Reactive financial calculations - these will update when spending changes
    const totalBudget = monthlyData.income;
    const totalSpent = monthlyData.categories.reduce((sum, cat) => sum + cat.amount, 0);
    const remaining = monthlyData.income - totalSpent;

    // Debt calculations
    const totalMinPayments = monthlyData.debts.reduce((sum, debt) => sum + debt.minPayment, 0);
    const totalPlannedPayments = monthlyData.debts.reduce((sum, debt) => sum + (debt.plannedPayment || debt.minPayment), 0);
    const totalPaid = monthlyData.debts.reduce((sum, debt) => sum + (debt.totalPaid || 0), 0);
    const maxTotalPayment = Math.max(totalMinPayments, totalPlannedPayments, totalPaid);

    // Validation checks (reactive) - Updated logic for debt payment consistency
    const isDebtPaymentConsistent = monthlyData.debt >= totalMinPayments;
    const isBudgetBalanced = totalSpent <= monthlyData.income;

    // Filter categories for spending analysis (exclude DEBT, SAVINGS, INVESTING)
    const spendingCategories = monthlyData.categories.filter(cat => cat.name === 'NEEDS' || cat.name === 'WANTS');

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
