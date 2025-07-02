
/**
 * Budget category type definitions
 */
export type CategoryName = 'NEEDS' | 'WANTS' | 'DEBT' | 'GOALS';

export interface Category {
  name: CategoryName;
  amount: number;
  budget: number;
  color: string;
}

export interface CategorySummary {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  categoryBreakdown: Category[];
}
