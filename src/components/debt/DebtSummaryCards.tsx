
import { useState } from 'react';
import { DebtItem } from '@/types/debt';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface DebtSummaryCardsProps {
  debts: DebtItem[];
  debtBudget?: number;
  onBudgetUpdate?: (newBudget: number) => void;
}

const DebtSummaryCards = ({ debts, debtBudget, onBudgetUpdate }: DebtSummaryCardsProps) => {
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayments = debts.reduce((sum, debt) => sum + debt.minPayment, 0);
  const budgetAmount = debtBudget ?? debts.reduce((sum, debt) => sum + (debt.plannedPayment || debt.minPayment), 0);

  const [editing, setEditing] = useState(false);
  const [directValue, setDirectValue] = useState('');
  const [increment] = useState(100);

  const handleDoubleClick = () => {
    setEditing(true);
    setDirectValue(budgetAmount.toString());
  };

  const handleIncrement = () => {
    if (onBudgetUpdate) onBudgetUpdate(budgetAmount + increment);
  };

  const handleDecrement = () => {
    if (onBudgetUpdate) onBudgetUpdate(Math.max(0, budgetAmount - increment));
  };

  const handleDirectChange = (value: string) => {
    setDirectValue(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0 && onBudgetUpdate) {
      onBudgetUpdate(num);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4" onClick={() => setEditing(false)}>
      <div className="bg-black/30 p-3 rounded border border-slate-600">
        <div className="text-xs text-slate-400 mb-1">TOTAL DEBT</div>
        <div className="text-lg font-bold text-red-400">${totalDebt.toLocaleString()}</div>
      </div>
      <div className="bg-black/30 p-3 rounded border border-slate-600">
        <div className="text-xs text-slate-400 mb-1">MIN PAYMENTS</div>
        <div className="text-lg font-bold text-orange-400">${totalMinPayments.toLocaleString()}</div>
      </div>
      <div
        className="bg-black/30 p-3 rounded border border-slate-600"
        onDoubleClick={handleDoubleClick}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xs text-slate-400 mb-1">TOTAL BUDGETED</div>
        <div className="text-lg font-bold text-blue-400">${budgetAmount.toLocaleString()}</div>
        {editing && onBudgetUpdate && (
          <div className="mt-3 space-y-2">
            <Input
              type="number"
              value={directValue}
              onChange={(e) => handleDirectChange(e.target.value)}
              className="text-sm bg-slate-700 border-slate-600 text-white"
              placeholder="Enter amount"
            />
            <div className="flex items-center justify-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleDecrement}
                className="bg-red-600 hover:bg-red-700 text-white border-red-600"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="text-white text-xs">±{increment}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={handleIncrement}
                className="bg-green-600 hover:bg-green-700 text-white border-green-600"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebtSummaryCards;
