import { Card } from '@/components/ui/card';
import BudgetOverview from './BudgetOverview';
import EditableFinancialData from './EditableFinancialData';
import SpentTracker from './SpentTracker';
import CategoryBreakdown from './CategoryBreakdown';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '@/contexts/DashboardContext';
import { useDashboardCalculations } from './DashboardCalculations';

const CashflowCard = () => {
  const { baseData, handleDataUpdate, handleSpentUpdate } = useDashboard();
  const {
    spendingCategories,
    totalBudget,
    totalSpent,
    remaining
  } = useDashboardCalculations(baseData);

  const navigate = useNavigate();

  const handleNeedsClick = () => navigate('/needs');
  const handleWantsClick = () => navigate('/wants');
  const handleDebtClick = () => navigate('/debt');
  const handleGoalsClick = () => navigate('/goals');

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">📊</span>
          <h2 className="text-base font-bold text-amber-400">CASH FLOW</h2>
        </div>

        <BudgetOverview
          totalBudget={totalBudget}
          totalSpent={totalSpent}
          remaining={remaining}
        />

        <EditableFinancialData
          income={baseData.income}
          categories={baseData.categories}
          onUpdate={handleDataUpdate}
        />

        <SpentTracker
          categories={baseData.categories}
          onUpdate={handleSpentUpdate}
        />

        <CategoryBreakdown
          categories={spendingCategories}
          debts={baseData.debts}
          goals={baseData.goals}
          onDebtClick={handleDebtClick}
          onGoalsClick={handleGoalsClick}
          onNeedsClick={handleNeedsClick}
          onWantsClick={handleWantsClick}
        />
      </div>
    </Card>
  );
};

export default CashflowCard;
