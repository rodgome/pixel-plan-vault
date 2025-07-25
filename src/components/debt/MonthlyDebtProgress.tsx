
import { Progress } from '@/components/ui/progress';
import { DebtItem } from '@/types/debt';

interface MonthlyDebtProgressProps {
  debts: DebtItem[];
  budgetedAmount: number;
  spentAmount?: number;
}

const MonthlyDebtProgress = ({ debts, budgetedAmount, spentAmount = 0 }: MonthlyDebtProgressProps) => {
  const totalPaidThisMonth = debts.reduce((sum, debt) => sum + debt.totalPaid, 0);
  
  // Use spentAmount if provided, otherwise fall back to totalPaidThisMonth
  const actualSpent = spentAmount > 0 ? spentAmount : totalPaidThisMonth;
  const monthlyPaymentProgress = budgetedAmount > 0 ? (actualSpent / budgetedAmount) * 100 : 0;

  return (
    <div className="bg-black/20 p-4 rounded border border-slate-600">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-bold text-amber-400">MONTHLY DEBT PAYMENTS</div>
        <div className="text-xs text-slate-400">${actualSpent.toLocaleString()} / ${budgetedAmount.toLocaleString()}</div>
      </div>
      <Progress 
        value={Math.min(monthlyPaymentProgress, 100)} 
        className="h-3 bg-slate-700 [&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-emerald-400" 
      />
      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>$0</span>
        <span>{Math.round(monthlyPaymentProgress)}% Complete</span>
        <span>${budgetedAmount.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default MonthlyDebtProgress;
