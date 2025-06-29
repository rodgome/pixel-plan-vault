import { useState } from 'react';
import { DebtItem } from '@/types/debt';
import { DebtStrategy, calculateDebtStrategy } from '@/utils/debtStrategies';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DebtSummaryCards from './debt/DebtSummaryCards';
import MonthlyDebtProgress from './debt/MonthlyDebtProgress';
import DebtItemCard from './debt/DebtItemCard';
import EditDebtForm from './EditDebtForm';

interface DebtBreakdownProps {
  debts: DebtItem[];
  onUpdateDebt?: (index: number, updatedDebt: DebtItem) => void;
  debtBudget?: number;
  debtSpent?: number;
  strategy?: DebtStrategy;
  onStrategyChange?: (strategy: DebtStrategy) => void;
}

const DebtBreakdown = ({ 
  debts, 
  onUpdateDebt, 
  debtBudget = 0, 
  debtSpent = 0,
  strategy = 'snowball',
  onStrategyChange
}: DebtBreakdownProps) => {
  const [editingDebt, setEditingDebt] = useState<{ debt: DebtItem; index: number } | null>(null);

  // Calculate strategy-based debt recommendations
  const strategicDebts = calculateDebtStrategy(debts, strategy, debtBudget);

  const handleEditDebt = (debt: DebtItem, index: number) => {
    setEditingDebt({ debt, index });
  };

  const handleSaveDebt = (updatedDebt: DebtItem) => {
    if (editingDebt && onUpdateDebt) {
      onUpdateDebt(editingDebt.index, updatedDebt);
    }
    setEditingDebt(null);
  };

  return (
    <div className="space-y-4">
      {/* Strategy Selector - Only show if onStrategyChange is provided */}
      {onStrategyChange && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-amber-400">DEBT STRATEGY</h3>
          </div>
          <Select value={strategy} onValueChange={onStrategyChange}>
            <SelectTrigger className="w-32 h-8 bg-slate-700 border-slate-600 text-slate-200 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="snowball" className="text-slate-200 hover:bg-slate-600">Snowball</SelectItem>
              <SelectItem value="avalanche" className="text-slate-200 hover:bg-slate-600">Avalanche</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Summary */}
      <DebtSummaryCards debts={debts} />

      {/* Monthly Debt Payment Progress - Against Budget */}
      <MonthlyDebtProgress 
        debts={debts} 
        budgetedAmount={debtBudget}
        spentAmount={debtSpent}
      />

      {/* Debt Items */}
      <div className="space-y-3">
        {strategicDebts.map((debt, index) => (
          <DebtItemCard
            key={index}
            debt={debt}
            index={index}
            onEdit={onUpdateDebt ? handleEditDebt : undefined}
            onUpdate={onUpdateDebt}
            showStrategy={true}
          />
        ))}
      </div>

      {/* Edit Debt Dialog */}
      {editingDebt && (
        <EditDebtForm
          debt={editingDebt.debt}
          isOpen={!!editingDebt}
          onClose={() => setEditingDebt(null)}
          onSave={handleSaveDebt}
        />
      )}
    </div>
  );
};

export default DebtBreakdown;
