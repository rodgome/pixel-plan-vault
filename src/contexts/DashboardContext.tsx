
import React, { createContext, useContext, ReactNode } from 'react';
import { DebtItem } from '@/types/debt';
import { GoalItem } from '@/types/goals';
import { Category } from '@/types/categories';
import { BaseData } from '@/types/dashboard';
import { useDashboardData } from '@/components/DashboardData';

interface DashboardContextType {
  baseData: BaseData;
  setBaseData: React.Dispatch<React.SetStateAction<BaseData>>;
  debtStrategy: 'snowball' | 'avalanche';
  isLoading: boolean;
  error: string | null;
  handleDataUpdate: (newData: {
    income: number;
    categories: Category[];
  }) => void;
  handleSpentUpdate: (newData: {
    categories: Category[];
  }) => void;
  handleDebtUpdate: (index: number, updatedDebt: DebtItem) => void;
  handleDebtBudgetUpdate: (newBudget: number) => void;
  handleDebtStrategyChange: (strategy: 'snowball' | 'avalanche') => void;
  handleGoalUpdate: (index: number, updatedGoal: GoalItem) => void;
  handleDeleteGoal: (index: number) => void;
  handleAddGoal: (newGoal: GoalItem) => void;
  handleDeleteDebt: (index: number) => void;
  handleAddDebt: (newDebt: DebtItem) => void;
  exportData: () => void;
  importData: (file: File) => Promise<boolean>;
  clearPersistedData: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const dashboardData = useDashboardData();

  // Additional handlers for goals and debts
  const handleGoalUpdate = (index: number, updatedGoal: GoalItem) => {
    dashboardData.setBaseData(prev => ({
      ...prev,
      goals: prev.goals.map((goal, i) => i === index ? updatedGoal : goal)
    }));
  };

  const handleDeleteGoal = (index: number) => {
    dashboardData.setBaseData(prev => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index)
    }));
  };

  const handleAddGoal = (newGoal: GoalItem) => {
    dashboardData.setBaseData(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
  };

  const handleDeleteDebt = (index: number) => {
    dashboardData.setBaseData(prev => ({
      ...prev,
      debts: prev.debts.filter((_, i) => i !== index)
    }));
  };

  const handleAddDebt = (newDebt: DebtItem) => {
    dashboardData.setBaseData(prev => ({
      ...prev,
      debts: [...prev.debts, newDebt]
    }));
  };

  const handleDebtBudgetUpdate = (newBudget: number) => {
    dashboardData.handleDebtBudgetUpdate(newBudget);
  };

  const contextValue: DashboardContextType = {
    baseData: dashboardData.baseData,
    setBaseData: dashboardData.setBaseData,
    debtStrategy: dashboardData.debtStrategy,
    isLoading: dashboardData.isLoading,
    error: dashboardData.error,
    handleDataUpdate: dashboardData.handleDataUpdate,
    handleSpentUpdate: dashboardData.handleSpentUpdate,
    handleDebtUpdate: dashboardData.handleDebtUpdate,
    handleDebtBudgetUpdate,
    handleDebtStrategyChange: dashboardData.handleDebtStrategyChange,
    handleGoalUpdate,
    handleDeleteGoal,
    handleAddGoal,
    handleDeleteDebt,
    handleAddDebt,
    exportData: dashboardData.exportData,
    importData: dashboardData.importData,
    clearPersistedData: dashboardData.clearPersistedData,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
