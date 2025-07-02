
import { DebtItem } from './debt';
import { GoalItem } from './goals';
import { Category } from './categories';

/**
 * Dashboard-related type definitions
 */
export interface BaseData {
  income: number;
  categories: Category[];
  debts: DebtItem[];
  goals: GoalItem[];
}

export interface MonthlyData {
  income: number;
  expenses: number;
  debt: number;
  goals: number;
  categories: Category[];
  debts: DebtItem[];
  goalItems: GoalItem[];
}

export interface DashboardCalculations {
  monthlyData: MonthlyData;
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  totalMinPayments: number;
  totalPlannedPayments: number;
  totalPaid: number;
  maxTotalPayment: number;
  isDebtPaymentConsistent: boolean;
  isBudgetBalanced: boolean;
  spendingCategories: Category[];
}

export interface DataUpdateParams {
  income: number;
  categories: Category[];
}

export interface SpentUpdateParams {
  categories: Category[];
}
