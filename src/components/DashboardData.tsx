import { useState } from 'react';
import { DebtItem } from '@/types/debt';

export interface Category {
  name: string;
  amount: number;
  budget: number;
  color: string;
}

export interface GoalItem {
  name: string;
  target: number;
  current: number;
  monthlyContribution: number;
  plannedContribution: number;
  type: 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other';
  deadline?: string;
}

export interface BaseData {
  income: number;
  categories: Category[];
  debts: DebtItem[];
  goals: GoalItem[];
}

export const useDashboardData = () => {
  const [baseData, setBaseData] = useState<BaseData>({
    income: 5000,
    categories: [{
      name: 'NEEDS',
      amount: 0,
      budget: 2500,
      color: 'bg-red-500'
    }, {
      name: 'WANTS',
      amount: 0,
      budget: 1000,
      color: 'bg-orange-500'
    }, {
      name: 'DEBT',
      amount: 0,
      budget: 400,
      color: 'bg-yellow-500'
    }, {
      name: 'GOALS',
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
  };

  const handleSpentUpdate = (newData: {
    categories: Category[];
  }) => {
    setBaseData(prev => ({
      ...prev,
      categories: newData.categories
    }));
  };

  const handleDebtUpdate = (index: number, updatedDebt: DebtItem) => {
    setBaseData(prev => ({
      ...prev,
      debts: prev.debts.map((debt, i) => i === index ? updatedDebt : debt)
    }));
  };

  const handleDebtStrategyChange = (strategy: 'snowball' | 'avalanche') => {
    setDebtStrategy(strategy);
  };

  return {
    baseData,
    debtStrategy,
    handleDataUpdate,
    handleSpentUpdate,
    handleDebtUpdate,
    handleDebtStrategyChange
  };
};
