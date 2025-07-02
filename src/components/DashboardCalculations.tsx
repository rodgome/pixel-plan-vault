
import { useMemo } from 'react';
import { BaseData } from './DashboardData';

export const useDashboardCalculations = (baseData: BaseData) => {
  // Memoize debt calculations separately
  const debtCalculations = useMemo(() => {
    const actualDebtPayments = baseData.debts.reduce((sum, debt) => sum + (debt.totalPaid || 0), 0);
    const totalMinPayments = baseData.debts.reduce((sum, debt) => sum + debt.minPayment, 0);
    const totalPlannedPayments = baseData.debts.reduce((sum, debt) => sum + (debt.plannedPayment || debt.minPayment), 0);
    const totalPaid = actualDebtPayments;
    const maxTotalPayment = Math.max(totalMinPayments, totalPlannedPayments, totalPaid);
    
    return {
      actualDebtPayments,
      totalMinPayments,
      totalPlannedPayments,
      totalPaid,
      maxTotalPayment
    };
  }, [baseData.debts]);

  // Memoize updated categories separately
  const updatedCategories = useMemo(() => {
    return baseData.categories.map(cat => 
      cat.name === 'DEBT' 
        ? { ...cat, amount: debtCalculations.actualDebtPayments }
        : cat
    );
  }, [baseData.categories, debtCalculations.actualDebtPayments]);

  // Memoize monthly data
  const monthlyData = useMemo(() => {
    const expenses = updatedCategories
      .filter(cat => cat.name === 'NEEDS' || cat.name === 'WANTS')
      .reduce((sum, cat) => sum + cat.amount, 0);
    
    const goals = updatedCategories.find(cat => cat.name === 'GOALS')?.amount || 0;

    return {
      income: baseData.income,
      expenses,
      debt: debtCalculations.actualDebtPayments,
      goals,
      categories: updatedCategories,
      debts: baseData.debts,
      goalItems: baseData.goals
    };
  }, [baseData.income, baseData.debts, baseData.goals, updatedCategories, debtCalculations.actualDebtPayments]);

  // Memoize budget calculations
  const budgetCalculations = useMemo(() => {
    const totalBudget = monthlyData.income;
    const totalSpent = updatedCategories.reduce((sum, cat) => sum + cat.amount, 0);
    const remaining = monthlyData.income - totalSpent;
    
    return {
      totalBudget,
      totalSpent,
      remaining
    };
  }, [monthlyData.income, updatedCategories]);

  // Memoize validation checks
  const validationChecks = useMemo(() => {
    const debtBudget = baseData.categories.find(cat => cat.name === 'DEBT')?.budget || 0;
    const totalBudgetAmount = baseData.categories.reduce((sum, cat) => sum + cat.budget, 0);
    const isDebtPaymentConsistent = debtBudget >= debtCalculations.totalMinPayments;
    const isBudgetBalanced = totalBudgetAmount <= monthlyData.income;
    
    return {
      isDebtPaymentConsistent,
      isBudgetBalanced
    };
  }, [baseData.categories, debtCalculations.totalMinPayments, monthlyData.income]);

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
