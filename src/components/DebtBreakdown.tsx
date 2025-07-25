import { useState, useMemo } from 'react';
import { DebtItem } from '@/types/debt';
import { DebtStrategy, calculateDebtStrategy } from '@/utils/debtStrategies';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DebtSummaryCards from './debt/DebtSummaryCards';
import MonthlyDebtProgress from './debt/MonthlyDebtProgress';
import DebtAllocationCard from './debt/DebtAllocationCard';
import VirtualizedDebtList from './debt/VirtualizedDebtList';

interface DebtBreakdownProps {
  debts: DebtItem[];
  onUpdateDebt?: (index: number, updatedDebt: DebtItem) => void;
  onDeleteDebt?: (index: number) => void;
  onAddDebt?: (newDebt: DebtItem) => void;
  onBudgetUpdate?: (newBudgetAmount: number) => void;
  onSpentUpdate?: (newSpentAmount: number) => void;
  debtBudget?: number;
  debtSpent?: number;
  strategy?: DebtStrategy;
  onStrategyChange?: (strategy: DebtStrategy) => void;
}

const DebtBreakdown = ({ 
  debts, 
  onUpdateDebt,
  onDeleteDebt,
  onAddDebt,
  onBudgetUpdate,
  onSpentUpdate,
  debtBudget = 0, 
  debtSpent = 0,
  strategy = 'snowball',
  onStrategyChange
}: DebtBreakdownProps) => {
  // Use useMemo to recalculate strategy when debts, strategy, or debtBudget changes
  const strategicDebts = useMemo(() => {
    return calculateDebtStrategy(debts, strategy, debtBudget);
  }, [debts, strategy, debtBudget]);

  const [sortOption, setSortOption] = useState<'priority' | 'balance' | 'interest' | 'name'>('priority');

  const sortedDebts = useMemo(() => {
    const sorted = [...strategicDebts];
    switch (sortOption) {
      case 'balance':
        sorted.sort((a, b) => b.balance - a.balance);
        break;
      case 'interest':
        sorted.sort((a, b) => b.interestRate - a.interestRate);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort((a, b) => (a as any).priority - (b as any).priority);
    }
    return sorted;
  }, [strategicDebts, sortOption]);

  const handleAddDebt = () => {
    if (onAddDebt) {
      const newDebt: DebtItem = {
        name: 'New Debt',
        balance: 0,
        minPayment: 0,
        plannedPayment: 0,
        totalPaid: 0,
        interestRate: 0,
        type: 'other'
      };
      onAddDebt(newDebt);
    }
  };

  const handleDeleteDebt = (debt: DebtItem) => {
    if (onDeleteDebt) {
      // Find the original index of this debt in the base debts array
      const originalIndex = debts.findIndex(d => 
        d.name === debt.name && 
        d.balance === debt.balance && 
        d.interestRate === debt.interestRate
      );
      if (originalIndex !== -1) {
        onDeleteDebt(originalIndex);
      }
    }
  };

  const handleUpdateDebt = (index: number, updatedDebt: DebtItem) => {
    if (onUpdateDebt) {
      // Find the original index of this debt in the base debts array
      const debt = strategicDebts[index];
      const originalIndex = debts.findIndex(d => 
        d.name === debt.name && 
        d.balance === debt.balance && 
        d.interestRate === debt.interestRate
      );
      if (originalIndex !== -1) {
        onUpdateDebt(originalIndex, updatedDebt);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Strategy Selector and Add Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {onStrategyChange ? (
            <>
              <h3 className="text-sm font-bold text-amber-400">DEBT STRATEGY</h3>
              <Select value={strategy} onValueChange={onStrategyChange}>
                <SelectTrigger className="w-32 h-8 bg-slate-700 border-slate-600 text-slate-200 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="snowball" className="text-slate-200 hover:bg-slate-600">Snowball</SelectItem>
                  <SelectItem value="avalanche" className="text-slate-200 hover:bg-slate-600">Avalanche</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 ml-4">
                <h3 className="text-sm font-bold text-amber-400">SORT BY</h3>
                <Select value={sortOption} onValueChange={(v) => setSortOption(v as any)}>
                  <SelectTrigger className="w-36 h-8 bg-slate-700 border-slate-600 text-slate-200 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="priority" className="text-slate-200 hover:bg-slate-600">Priority</SelectItem>
                    <SelectItem value="balance" className="text-slate-200 hover:bg-slate-600">Balance</SelectItem>
                    <SelectItem value="interest" className="text-slate-200 hover:bg-slate-600">Interest Rate</SelectItem>
                    <SelectItem value="name" className="text-slate-200 hover:bg-slate-600">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <h3 className="text-sm font-bold text-amber-400">DEBT BREAKDOWN</h3>
          )}
        </div>
        {onAddDebt && (
          <Button
            onClick={handleAddDebt}
            variant="ghost"
            size="sm"
            className="text-green-400 hover:text-green-300 hover:bg-slate-700/50 h-8 px-3"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Debt
          </Button>
        )}
      </div>

      {/* Summary */}
      <DebtSummaryCards
        debts={debts}
        debtBudget={debtBudget}
        debtSpent={debtSpent}
        onBudgetUpdate={onBudgetUpdate}
        onSpentUpdate={onSpentUpdate}
      />

      {/* Monthly Debt Payment Progress - Against Budget */}
      <MonthlyDebtProgress 
        debts={debts} 
        budgetedAmount={debtBudget}
        spentAmount={debtSpent}
      />

      {/* NEW: Debt Payment Allocation Card */}
      {onUpdateDebt && (
        <DebtAllocationCard
          debts={debts}
          totalPaidAmount={debtSpent}
          strategy={strategy}
          onUpdateDebt={onUpdateDebt}
        />
      )}

      {/* Virtualized Debt Items - Remove individual editing capabilities for totalPaid */}
      <VirtualizedDebtList
        debts={sortedDebts}
        onUpdate={handleUpdateDebt}
        onDelete={handleDeleteDebt}
        onBudgetUpdate={onBudgetUpdate}
        showStrategy={true}
        height={600}
        itemHeight={180}
      />
    </div>
  );
};

export default DebtBreakdown;
