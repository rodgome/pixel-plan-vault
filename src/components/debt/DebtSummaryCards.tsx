
import { useState } from 'react';
import { DebtItem } from '@/types/debt';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface DebtSummaryCardsProps {
  debts: DebtItem[];
  debtBudget?: number;
  debtSpent?: number;
  onBudgetUpdate?: (newBudget: number) => void;
  onSpentUpdate?: (newSpent: number) => void;
}

const DebtSummaryCards = ({ debts, debtBudget, debtSpent, onBudgetUpdate, onSpentUpdate }: DebtSummaryCardsProps) => {
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayments = debts.reduce((sum, debt) => sum + debt.minPayment, 0);
  const budgetAmount = debtBudget ?? debts.reduce((sum, debt) => sum + (debt.plannedPayment || debt.minPayment), 0);
  const spentAmount = debtSpent ?? debts.reduce((sum, debt) => sum + (debt.totalPaid || 0), 0);

  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetValue, setBudgetValue] = useState('');
  const [editingSpent, setEditingSpent] = useState(false);
  const [spentValue, setSpentValue] = useState('');
  const [increment] = useState(100);

  const handleBudgetDoubleClick = () => {
    setEditingBudget(true);
    setBudgetValue(budgetAmount.toString());
  };

  const handleSpentDoubleClick = () => {
    setEditingSpent(true);
    setSpentValue(spentAmount.toString());
  };

  const handleIncrement = () => {
    if (onBudgetUpdate) onBudgetUpdate(budgetAmount + increment);
  };

  const handleDecrement = () => {
    if (onBudgetUpdate) onBudgetUpdate(Math.max(0, budgetAmount - increment));
  };

  const handleSpentIncrement = () => {
    if (onSpentUpdate) onSpentUpdate(spentAmount + increment);
  };

  const handleSpentDecrement = () => {
    if (onSpentUpdate) onSpentUpdate(Math.max(0, spentAmount - increment));
  };

  const handleDirectChange = (value: string) => {
    setBudgetValue(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0 && onBudgetUpdate) {
      onBudgetUpdate(num);
    }
  };

  const handleSpentDirectChange = (value: string) => {
    setSpentValue(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0 && onSpentUpdate) {
      onSpentUpdate(num);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4" onClick={() => { setEditingBudget(false); setEditingSpent(false); }}>
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
        onDoubleClick={handleBudgetDoubleClick}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xs text-slate-400 mb-1">TOTAL BUDGETED</div>
        <div className="text-lg font-bold text-blue-400">${budgetAmount.toLocaleString()}</div>
        {editingBudget && onBudgetUpdate && (
          <div className="mt-3 space-y-2">
            <Input
              type="number"
              value={budgetValue}
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
      <div
        className="bg-black/30 p-3 rounded border border-slate-600"
        onDoubleClick={handleSpentDoubleClick}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xs text-slate-400 mb-1">TOTAL PAID</div>
        <div className="text-lg font-bold text-green-400">${spentAmount.toLocaleString()}</div>
        {editingSpent && onSpentUpdate && (
          <div className="mt-3 space-y-2">
            <Input
              type="number"
              value={spentValue}
              onChange={(e) => handleSpentDirectChange(e.target.value)}
              className="text-sm bg-slate-700 border-slate-600 text-white"
              placeholder="Enter amount"
            />
            <div className="flex items-center justify-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleSpentDecrement}
                className="bg-red-600 hover:bg-red-700 text-white border-red-600"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="text-white text-xs">±{increment}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={handleSpentIncrement}
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
