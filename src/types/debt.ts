
export interface DebtItem {
  name: string;
  balance: number;
  minPayment: number;
  interestRate: number;
  type: 'credit_card' | 'loan' | 'mortgage' | 'other';
  plannedPayment: number;
  totalPaid: number;
}
