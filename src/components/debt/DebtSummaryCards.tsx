
import { DebtItem } from '@/types/debt';

interface DebtSummaryCardsProps {
  debts: DebtItem[];
}

const DebtSummaryCards = ({ debts }: DebtSummaryCardsProps) => {
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayments = debts.reduce((sum, debt) => sum + debt.minPayment, 0);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-black/30 p-3 rounded border border-slate-600">
        <div className="text-xs text-slate-400 mb-1">TOTAL DEBT</div>
        <div className="text-lg font-bold text-red-400">${totalDebt.toLocaleString()}</div>
      </div>
      <div className="bg-black/30 p-3 rounded border border-slate-600">
        <div className="text-xs text-slate-400 mb-1">MIN PAYMENTS</div>
        <div className="text-lg font-bold text-orange-400">${totalMinPayments.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default DebtSummaryCards;
