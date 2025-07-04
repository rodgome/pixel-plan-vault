import { Card } from '@/components/ui/card';
import DebtBreakdown from './DebtBreakdown';
import GoalsBreakdown from './GoalsBreakdown';
import { useDashboard } from '@/contexts/DashboardContext';

const BalanceSheetCard = () => {
  const {
    baseData,
    handleDebtUpdate,
    handleDeleteDebt,
    handleAddDebt,
    handleDebtStrategyChange,
    debtStrategy,
    handleGoalUpdate,
    handleDeleteGoal,
    handleAddGoal,
    handleSpentUpdate,
    setBaseData
  } = useDashboard();

  const debtBudget = baseData.categories.find(cat => cat.name === 'DEBT')?.budget || 0;
  const debtSpent = baseData.categories.find(cat => cat.name === 'DEBT')?.amount || 0;
  const goalsSpent = baseData.categories.find(cat => cat.name === 'GOALS')?.amount || 0;

  const assets = baseData.goals.reduce((sum, g) => sum + g.current, 0);
  const liabilities = baseData.debts.reduce((sum, d) => sum + d.balance, 0);
  const netWorth = assets - liabilities;

  const handleBudgetUpdate = (newBudgetAmount: number) => {
    const updatedCategories = baseData.categories.map(cat =>
      cat.name === 'DEBT' ? { ...cat, budget: newBudgetAmount } : cat
    );
    setBaseData({ ...baseData, categories: updatedCategories });
  };

  const handleSpentUpdateLocal = (newSpentAmount: number) => {
    const updatedCategories = baseData.categories.map(cat =>
      cat.name === 'DEBT' ? { ...cat, amount: newSpentAmount } : cat
    );
    handleSpentUpdate({ categories: updatedCategories });
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">📈</span>
          <h2 className="text-base font-bold text-amber-400">BALANCE SHEET</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="bg-black/30 p-3 rounded border border-slate-600">
            <div className="text-xs text-slate-400 mb-1">ASSETS</div>
            <div className="text-lg font-bold text-green-400">${assets.toLocaleString()}</div>
          </div>
          <div className="bg-black/30 p-3 rounded border border-slate-600">
            <div className="text-xs text-slate-400 mb-1">LIABILITIES</div>
            <div className="text-lg font-bold text-red-400">${liabilities.toLocaleString()}</div>
          </div>
          <div className="bg-black/30 p-3 rounded border border-slate-600">
            <div className="text-xs text-slate-400 mb-1">NET WORTH</div>
            <div className={`text-lg font-bold ${netWorth >= 0 ? 'text-green-400' : 'text-red-400'}`}>${netWorth.toLocaleString()}</div>
          </div>
        </div>

        <DebtBreakdown
          debts={baseData.debts}
          onUpdateDebt={handleDebtUpdate}
          onDeleteDebt={handleDeleteDebt}
          onAddDebt={handleAddDebt}
          onBudgetUpdate={handleBudgetUpdate}
          onSpentUpdate={handleSpentUpdateLocal}
          debtBudget={debtBudget}
          debtSpent={debtSpent}
          strategy={debtStrategy}
          onStrategyChange={handleDebtStrategyChange}
        />

        <GoalsBreakdown
          goals={baseData.goals}
          onUpdateGoal={handleGoalUpdate}
          onDeleteGoal={handleDeleteGoal}
          onAddGoal={handleAddGoal}
          goalsSpent={goalsSpent}
        />
      </div>
    </Card>
  );
};

export default BalanceSheetCard;
