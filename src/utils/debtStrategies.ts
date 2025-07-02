
import { DebtItem } from '@/types/debt';

export type DebtStrategy = 'snowball' | 'avalanche';

export interface DebtWithStrategy extends DebtItem {
  recommendedPayment: number;
  priority: number;
}

export const calculateDebtStrategy = (
  debts: DebtItem[],
  strategy: DebtStrategy,
  totalBudget: number
): DebtWithStrategy[] => {
  // Calculate minimum payments total
  const totalMinPayments = debts.reduce((sum, debt) => sum + debt.minPayment, 0);
  const extraBudget = Math.max(0, totalBudget - totalMinPayments);

  // Sort debts based on strategy
  const sortedDebts = [...debts].sort((a, b) => {
    if (strategy === 'snowball') {
      // Snowball: smallest balance first
      return a.balance - b.balance;
    } else {
      // Avalanche: highest interest rate first
      return b.interestRate - a.interestRate;
    }
  });

  // Assign priorities and calculate recommended payments
  return sortedDebts.map((debt, index) => {
    const priority = index + 1;
    let recommendedPayment = debt.minPayment;

    // Give all extra budget to highest priority debt (first in sorted array)
    if (index === 0 && extraBudget > 0) {
      recommendedPayment += extraBudget;
    }

    return {
      ...debt,
      recommendedPayment,
      priority
    };
  });
};
