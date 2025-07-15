
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import DebtBreakdown from '../components/DebtBreakdown';
import { useDashboard } from '../contexts/DashboardContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const DebtDetails = () => {
  const {
    baseData,
    debtStrategy,
    handleDebtUpdate,
    handleDebtStrategyChange,
    handleDeleteDebt,
    handleAddDebt,
    handleDebtBudgetUpdate,
    handleDebtSpentUpdate
  } = useDashboard();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleTotalPaidChange = (amount: number) => {
    setDebtSpent(amount);
    handleDebtSpentUpdate(amount);
  };

  const debtBudget = baseData.debts.reduce(
    (sum, debt) => sum + (debt.plannedPayment || debt.minPayment),
    0
  );
  const initialSpent = baseData.debts.reduce(
    (sum, debt) => sum + (debt.totalPaid || 0),
    0
  );
  const [debtSpent, setDebtSpent] = useState(initialSpent);

  useEffect(() => {
    setDebtSpent(initialSpent);
  }, [initialSpent]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-green-400 font-mono">
      {/* Header */}
      <div className="border-b-2 border-amber-400 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleBack}
                variant="ghost" 
                size="sm"
                className="text-amber-400 hover:text-amber-300 hover:bg-slate-700/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-4">
                <div className="text-3xl">💳</div>
                <div>
                  <h1 className="text-2xl font-bold text-amber-400 tracking-wider">DEBT TRACKER</h1>
                  <p className="text-xs text-green-300">DEBT MANAGEMENT BREAKDOWN</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <div className="p-6">
            <DebtBreakdown
              debts={baseData.debts}
              onUpdateDebt={handleDebtUpdate}
              onDeleteDebt={handleDeleteDebt}
              onAddDebt={handleAddDebt}
              onBudgetUpdate={handleDebtBudgetUpdate}
              debtBudget={debtBudget}
              debtSpent={debtSpent}
              onSpentUpdate={handleTotalPaidChange}
              strategy={debtStrategy}
              onStrategyChange={handleDebtStrategyChange}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DebtDetails;
