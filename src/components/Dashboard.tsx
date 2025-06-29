
import { useDashboardData } from './DashboardData';
import { useDashboardCalculations } from './DashboardCalculations';
import DashboardLayout from './DashboardLayout';

const Dashboard = () => {
  const { baseData, handleDataUpdate, handleSpentUpdate } = useDashboardData();
  
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

  return (
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
  );
};

export default Dashboard;
