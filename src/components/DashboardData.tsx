import { useState, useEffect } from "react";
import { DebtItem } from "@/types/debt";
import { calculateDebtStrategy } from "@/utils/debtStrategies";
import { GoalItem } from "@/types/goals";
import { Category } from "@/types/categories";
import { BaseData } from "@/types/dashboard";
import { usePersistedState } from "@/hooks/usePersistedState";
import { toast } from "@/components/ui/sonner";
import { defaultBaseData } from "@/data/defaultBaseData";

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
          plannedContribution:
            goal.plannedContribution || goal.monthlyContribution,
        }));
      }
    }

    return {
      ...defaultData,
      ...oldData,
    };
  };

  const {
    state: baseData,
    setState: setBaseData,
    isLoading,
    error,
    exportData,
    importData,
    clearPersistedData,
  } = usePersistedState<BaseData>({
    key: "vault-dashboard-data",
    defaultValue: defaultData,
    version: 2,
    migrate: migrateData,
  });

  const [debtStrategy, setDebtStrategy] = useState<"snowball" | "avalanche">(
    "snowball",
  );

  const handleDataUpdate = (newData: {
    income: number;
    categories: Category[];
  }) => {
    setBaseData((prev) => {
      const updatedCategories = prev.categories.map((cat) => {
        if (cat.name === "NEEDS") {
          const found = newData.categories.find((c) => c.name === "NEEDS");
          return found ? { ...cat, budget: found.budget } : cat;
        }
        if (cat.name === "WANTS") {
          const found = newData.categories.find((c) => c.name === "WANTS");
          return found ? { ...cat, budget: found.budget } : cat;
        }
        return cat;
      });
      return {
        ...prev,
        income: newData.income,
        categories: updatedCategories,
      };
    });
    toast.success("Budget plan updated successfully!");
  };

  const handleSpentUpdate = (newData: { categories: Category[] }) => {
    console.log('DashboardData - handleSpentUpdate called with:', {
      newCategories: newData.categories.map(cat => ({ name: cat.name, amount: cat.amount, budget: cat.budget }))
    });
    
    setBaseData((prev) => {
      console.log('DashboardData - Previous categories:', prev.categories.map(cat => ({ name: cat.name, amount: cat.amount, budget: cat.budget })));
      const updated = {
        ...prev,
        categories: newData.categories,
      };
      console.log('DashboardData - Updated categories:', updated.categories.map(cat => ({ name: cat.name, amount: cat.amount, budget: cat.budget })));
      return updated;
    });
    toast.success("Spending updated successfully!");
  };

  const handleDebtUpdate = (index: number, updatedDebt: DebtItem) => {
    setBaseData((prev) => ({
      ...prev,
      debts: prev.debts.map((debt, i) => (i === index ? updatedDebt : debt)),
    }));
    toast.success("Debt information updated!");
  };

  const handleDebtBudgetUpdate = (newBudget: number) => {
    setBaseData(prev => {
      const strategicDebts = calculateDebtStrategy(prev.debts, debtStrategy, newBudget);
      const updatedDebts = prev.debts.map(debt => {
        const match = strategicDebts.find(d =>
          d.name === debt.name &&
          d.balance === debt.balance &&
          d.interestRate === debt.interestRate
        );
        return match ? { ...debt, plannedPayment: match.recommendedPayment } : debt;
      });
      return { ...prev, debts: updatedDebts };
    });
    toast.success("Debt budget updated!");
  };

  const handleDebtStrategyChange = (strategy: "snowball" | "avalanche") => {
    setDebtStrategy(strategy);
    toast.success(`Debt strategy changed to ${strategy}`);
  };

  const handleDebtSpentUpdate = (newSpent: number) => {
    setBaseData(prev => {
      if (prev.debts.length === 0) return prev;
      const currentTotal = prev.debts.reduce((sum, d) => sum + (d.totalPaid || 0), 0);
      const diff = newSpent - currentTotal;
      const updatedDebts = [...prev.debts];
      updatedDebts[0] = { ...updatedDebts[0], totalPaid: Math.max(0, updatedDebts[0].totalPaid + diff) };
      return { ...prev, debts: updatedDebts };
    });
    toast.success("Debt payments updated!");
  };

  // Automatically calculate budgets for debt and goals categories, but preserve manual spending amounts
  useEffect(() => {
    setBaseData((prev) => {
      const debtBudget = prev.debts.reduce(
        (sum, debt) => sum + (debt.plannedPayment || debt.minPayment),
        0
      );
      const goalsBudget = prev.goals.reduce(
        (sum, goal) =>
          sum + (goal.plannedContribution || goal.monthlyContribution),
        0
      );

      const updatedCategories = prev.categories.map((cat) => {
        if (cat.name === "DEBT")
          return { ...cat, budget: debtBudget };
        if (cat.name === "GOALS")
          return { ...cat, budget: goalsBudget };
        return cat;
      });

      // Only update if budgets actually changed to avoid infinite loops
      const budgetsChanged = prev.categories.some((cat, index) => 
        cat.budget !== updatedCategories[index].budget
      );

      if (!budgetsChanged) {
        return prev;
      }
      
      console.log('DashboardData - useEffect updating budgets only:', {
        debtBudget,
        goalsBudget,
        updatedCategories: updatedCategories.map(cat => ({ name: cat.name, budget: cat.budget, amount: cat.amount }))
      });

      return { ...prev, categories: updatedCategories };
    });
  }, [baseData.debts, baseData.goals, setBaseData]);

  return {
    baseData,
    setBaseData,
    debtStrategy,
    isLoading,
    error,
    handleDataUpdate,
    handleSpentUpdate,
    handleDebtUpdate,
    handleDebtSpentUpdate,
    handleDebtBudgetUpdate,
    handleDebtStrategyChange,
    exportData,
    importData,
    clearPersistedData,
  };
};
