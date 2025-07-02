
import { useDashboardCalculations } from './DashboardCalculations';
import DashboardLayout from './DashboardLayout';
import DashboardSkeleton from './DashboardSkeleton';
import ErrorBoundary from './ErrorBoundary';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { baseData, isLoading, error, handleDataUpdate, handleSpentUpdate } = useDashboard();
  
  const {
    monthlyData,
    totalBudget,
    totalSpent,
    remaining,
    totalMinPayments,
    totalPlannedPayments,
    totalPaid,
    maxTotalPayment,
    isDebtPaymentConsistent,
    isBudgetBalanced,
    spendingCategories
  } = useDashboardCalculations(baseData);

  // Show loading skeleton while data is loading
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Show error state if there's an error loading data
  if (error) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-6 m-4">
        <div className="flex items-center space-x-3 text-red-400">
          <AlertCircle className="h-6 w-6" />
          <div>
            <h2 className="text-lg font-semibold">Failed to Load Dashboard</h2>
            <p className="text-sm text-slate-300 mt-1">{error}</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <ErrorBoundary>
      <DashboardLayout
        baseData={baseData}
        monthlyData={monthlyData}
        totalBudget={totalBudget}
        totalSpent={totalSpent}
        remaining={remaining}
        totalMinPayments={totalMinPayments}
        totalPlannedPayments={totalPlannedPayments}
        totalPaid={totalPaid}
        maxTotalPayment={maxTotalPayment}
        isDebtPaymentConsistent={isDebtPaymentConsistent}
        isBudgetBalanced={isBudgetBalanced}
        spendingCategories={spendingCategories}
        onDataUpdate={handleDataUpdate}
        onSpentUpdate={handleSpentUpdate}
      />
    </ErrorBoundary>
  );
};

export default Dashboard;
