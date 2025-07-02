
export type DebtType = 'credit_card' | 'loan' | 'mortgage' | 'other';

export interface DebtItem {
  name: string;
  balance: number;
  minPayment: number;
  interestRate: number;
  type: DebtType;
  plannedPayment: number;
  totalPaid: number;
}

export interface DebtSummary {
  totalDebt: number;
  totalMinPayments: number;
  totalPlannedPayments: number;
  totalPaid: number;
  averageInterestRate: number;
}
