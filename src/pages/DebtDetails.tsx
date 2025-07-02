
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DebtItem } from '@/types/debt';
import DebtBreakdown from '../components/DebtBreakdown';

interface DebtDetailsProps {
  dashboardData: any;
}

const DebtDetails = ({ dashboardData }: DebtDetailsProps) => {
  const { baseData, debtStrategy, handleDebtUpdate, handleDebtStrategyChange, setBaseData } = dashboardData;

  const handleBack = () => {
    window.history.back();
  };

  const handleUpdateDebt = (index: number, updatedDebt: DebtItem) => {
    if (handleDebtUpdate) {
      handleDebtUpdate(index, updatedDebt);
    }
  };

  const handleDeleteDebt = (index: number) => {
    const updatedDebts = baseData.debts.filter((_, i) => i !== index);
    if (setBaseData) {
      setBaseData({
        ...baseData,
        debts: updatedDebts
      });
    }
  };

  const handleAddDebt = (newDebt: DebtItem) => {
    // Add the new debt to the existing debts array
    const updatedDebts = [...baseData.debts, newDebt];
    if (setBaseData) {
      setBaseData({
        ...baseData,
        debts: updatedDebts
      });
    }
  };

  const handleBudgetUpdate = (newBudgetAmount: number) => {
    if (setBaseData) {
      const updatedCategories = baseData.categories.map(cat => 
        cat.name === 'DEBT' 
          ? { ...cat, budget: newBudgetAmount }
          : cat
      );
      setBaseData({
        ...baseData,
        categories: updatedCategories
      });
    }
  };

  const debtBudget = baseData.categories.find(cat => cat.name === 'DEBT')?.budget || 0;
  const debtSpent = baseData.categories.find(cat => cat.name === 'DEBT')?.amount || 0;

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
              onUpdateDebt={handleUpdateDebt}
              onDeleteDebt={handleDeleteDebt}
              onAddDebt={handleAddDebt}
              onBudgetUpdate={handleBudgetUpdate}
              debtBudget={debtBudget}
              debtSpent={debtSpent}
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
