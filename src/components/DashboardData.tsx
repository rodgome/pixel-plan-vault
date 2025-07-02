
import { useState } from 'react';
import { DebtItem } from '@/types/debt';
import { GoalItem } from '@/types/goals';
import { Category } from '@/types/categories';
import { BaseData } from '@/types/dashboard';
import { usePersistedState } from '@/hooks/usePersistedState';
import { toast } from '@/components/ui/sonner';

export { Category, GoalItem, BaseData };

export const useDashboardData = () => {
  const defaultData: BaseData = {
    income: 5000,
    categories: [{
      name: 'NEEDS' as const,
      amount: 0,
      budget: 2500,
      color: 'bg-red-500'
    }, {
      name: 'WANTS' as const,
      amount: 0,
      budget: 1000,
      color: 'bg-orange-500'
    }, {
      name: 'DEBT' as const,
      amount: 0,
      budget: 400,
      color: 'bg-yellow-500'
    }, {
      name: 'GOALS' as const,
      amount: 0,
      budget: 1800,
      color: 'bg-green-500'
    }],
    debts: [{
      name: 'Credit Card - Chase',
      balance: 3500,
      minPayment: 105,
      plannedPayment: 200,
      totalPaid: 150,
      interestRate: 24.99,
      type: 'credit_card' as const
    }, {
      name: 'Student Loan',
      balance: 15000,
      minPayment: 180,
      plannedPayment: 250,
      totalPaid: 180,
      interestRate: 6.5,
      type: 'loan' as const
    }, {
      name: 'Car Loan',
      balance: 12000,
      minPayment: 285,
      plannedPayment: 350,
      totalPaid: 285,
      interestRate: 4.2,
      type: 'loan' as const
    }],
    goals: [{
      name: 'Emergency Fund',
      target: 15000,
      current: 8500,
      monthlyContribution: 500,
      plannedContribution: 750,
      type: 'emergency_fund' as const,
      deadline: 'Dec 2025'
    }, {
      name: 'Retirement 401k',
      target: 100000,
      current: 35000,
      monthlyContribution: 800,
      plannedContribution: 1000,
      type: 'retirement' as const
    }, {
      name: 'Vacation Fund',
      target: 5000,
      current: 1200,
      monthlyContribution: 200,
      plannedContribution: 300,
      type: 'vacation' as const,
      deadline: 'Jun 2025'
    }, {
      name: 'Stock Portfolio',
      target: 25000,
      current: 12500,
      monthlyContribution: 400,
      plannedContribution: 600,
      type: 'investment' as const
    }]
  };

  // Migration function for handling data structure changes
  const migrateData = (oldData: any, oldVersion: number): BaseData => {
    console.log(`Migrating data from version ${oldVersion} to current version`);
    
    // Add migration logic here as data structure evolves
    if (oldVersion < 2) {
      // Example: Add new fields that didn't exist in version 1
      if (oldData.goals) {
        oldData.goals = oldData.goals.map((goal: any) => ({
          ...goal,
          plannedContribution: goal.plannedContribution || goal.monthlyContribution
        }));
      }
    }
    
    return {
      ...defaultData,
      ...oldData
    };
  };

  const {
    state: baseData,
    setState: setBaseData,
    isLoading,
    error,
    exportData,
    importData,
    clearPersistedData
  } = usePersistedState<BaseData>({
    key: 'vault-dashboard-data',
    defaultValue: defaultData,
    version: 2,
    migrate: migrateData
  });

  const [debtStrategy, setDebtStrategy] = useState<'snowball' | 'avalanche'>('snowball');

  const handleDataUpdate = (newData: {
    income: number;
    categories: Category[];
  }) => {
    setBaseData(prev => ({
      ...prev,
      income: newData.income,
      categories: newData.categories
    }));
    toast.success('Budget plan updated successfully!');
  };

  const handleSpentUpdate = (newData: {
    categories: Category[];
  }) => {
    setBaseData(prev => ({
      ...prev,
      categories: newData.categories
    }));
    toast.success('Spending updated successfully!');
  };

  const handleDebtUpdate = (index: number, updatedDebt: DebtItem) => {
    setBaseData(prev => ({
      ...prev,
      debts: prev.debts.map((debt, i) => i === index ? updatedDebt : debt)
    }));
    toast.success('Debt information updated!');
  };

  const handleDebtStrategyChange = (strategy: 'snowball' | 'avalanche') => {
    setDebtStrategy(strategy);
    toast.success(`Debt strategy changed to ${strategy}`);
  };

  return {
    baseData,
    setBaseData,
    debtStrategy,
    isLoading,
    error,
    handleDataUpdate,
    handleSpentUpdate,
    handleDebtUpdate,
    handleDebtStrategyChange,
    exportData,
    importData,
    clearPersistedData
  };
};
