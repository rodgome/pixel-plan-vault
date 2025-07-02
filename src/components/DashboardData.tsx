import { useState } from 'react';
import { DebtItem } from '@/types/debt';
import { GoalItem } from '@/types/goals';
import { Category } from '@/types/categories';
import { BaseData } from '@/types/dashboard';
import { usePersistedState } from '@/hooks/usePersistedState';
import { toast } from '@/components/ui/sonner';
import { defaultBaseData } from '@/data/defaultBaseData';

export type { Category, GoalItem, BaseData };

export const useDashboardData = () => {
  const defaultData = defaultBaseData;

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
