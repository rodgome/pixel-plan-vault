
import { Card } from '@/components/ui/card';
import FinancialSummaryCards from './FinancialSummaryCards';
import ValidationAlerts from './ValidationAlerts';
import BudgetOverview from './BudgetOverview';
import FinancialSummary from './FinancialSummary';
import EditableFinancialData from './EditableFinancialData';
import DashboardGrid from './DashboardGrid';
import SpentTracker from './SpentTracker';
import { BaseData } from './DashboardData';

interface DashboardLayoutProps {
  baseData: BaseData;
  monthlyData: {
    income: number;
    expenses: number;
    debt: number;
    savings: number;
    investing: number;
    categories: Array<{
      name: string;
      amount: number;
      budget: number;
      color: string;
    }>;
    debts: Array<any>;
    goals: Array<any>;
  };
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  totalMinPayments: number;
  totalPlannedPayments: number;
  totalPaid: number;
  maxTotalPayment: number;
  isDebtPaymentConsistent: boolean;
  isBudgetBalanced: boolean;
  spendingCategories: Array<{
    name: string;
    amount: number;
    budget: number;
    color: string;
  }>;
  onDataUpdate: (newData: {
    income: number;
    categories: Array<{
      name: string;
      amount: number;
      budget: number;
      color: string;
    }>;
  }) => void;
  onSpentUpdate: (newData: {
    categories: Array<{
      name: string;
      amount: number;
      budget: number;
      color: string;
    }>;
  }) => void;
}

const DashboardLayout = ({
  baseData,
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
  spendingCategories,
  onDataUpdate,
  onSpentUpdate
}: DashboardLayoutProps) => {
  return (
    <div className="space-y-6">
      {/* Editable Financial Data */}
      <EditableFinancialData 
        income={baseData.income} 
        categories={baseData.categories} 
        onUpdate={onDataUpdate} 
      />

      {/* Spent Tracker - This will trigger updates to all other cards */}
      <SpentTracker 
        categories={baseData.categories} 
        onUpdate={onSpentUpdate} 
      />

      {/* Status Cards - All reactive to base data and will update when spending changes */}
      <FinancialSummaryCards 
        income={monthlyData.income} 
        expenses={monthlyData.expenses} 
        debt={monthlyData.debt} 
        savings={monthlyData.savings} 
        investing={monthlyData.investing} 
      />

      {/* Monthly Overview - Will update when spending changes */}
      <BudgetOverview 
        totalBudget={totalBudget} 
        totalSpent={totalSpent} 
        remaining={remaining} 
      />

      {/* Validation Alerts - Will show/hide based on spending changes */}
      <ValidationAlerts 
        isDebtPaymentConsistent={isDebtPaymentConsistent} 
        isBudgetBalanced={isBudgetBalanced} 
        debtAmount={monthlyData.debt} 
        totalMinPayments={totalMinPayments} 
        totalSpent={totalSpent} 
        income={monthlyData.income} 
      />

      {/* Main Content Grid - Will update based on spending changes */}
      <DashboardGrid 
        spendingCategories={spendingCategories}
        debts={monthlyData.debts}
        goals={monthlyData.goals}
        totalMinPayments={totalMinPayments}
        totalPlannedPayments={totalPlannedPayments}
        totalPaid={totalPaid}
        maxTotalPayment={maxTotalPayment}
      />

      {/* Savings Progress - Now full width with reactive calculations */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        
      </Card>

      {/* Financial Summary */}
      <FinancialSummary 
        debts={monthlyData.debts} 
        goals={monthlyData.goals} 
        income={monthlyData.income} 
        totalSpent={totalSpent} 
        remaining={remaining} 
      />
    </div>
  );
};

export default DashboardLayout;
