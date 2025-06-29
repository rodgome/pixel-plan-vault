import { useState } from 'react';

interface Category {
  name: string;
  amount: number;
  budget: number;
  color: string;
}

interface DebtItem {
  name: string;
  balance: number;
  minPayment: number;
  plannedPayment?: number;
  totalPaid?: number;
  interestRate: number;
  type: 'credit_card' | 'loan' | 'mortgage' | 'other';
}

interface GoalItem {
  name: string;
  target: number;
  current: number;
  monthlyContribution: number;
  plannedContribution?: number;
  type: 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other';
  deadline?: string;
}

interface CategoryBreakdownProps {
  categories: Category[];
  debts?: DebtItem[];
  goals?: GoalItem[];
  onDebtClick?: () => void;
  onGoalsClick?: () => void;
  onNeedsClick?: () => void;
  onWantsClick?: () => void;
}

const CategoryBreakdown = ({ 
  categories, 
  debts, 
  goals, 
  onDebtClick, 
  onGoalsClick, 
  onNeedsClick, 
  onWantsClick 
}: CategoryBreakdownProps) => {
  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'NEEDS': return '🏠';
      case 'WANTS': return '🎮';
      case 'DEBT': return '💳';
      case 'GOALS': return '🎯';
      default: return '💰';
    }
  };

  const getCategoryStatus = (category: Category) => {
    const percentage = category.budget > 0 ? (category.amount / category.budget) * 100 : 0;
    if (percentage >= 100) return 'OVER BUDGET';
    if (percentage >= 80) return 'NEAR LIMIT';
    return 'ON TRACK';
  };

  const getCategoryStatusColor = (category: Category) => {
    const percentage = category.budget > 0 ? (category.amount / category.budget) * 100 : 0;
    if (percentage >= 100) return 'text-red-400';
    if (percentage >= 80) return 'text-orange-400';
    return 'text-green-400';
  };

  const isClickable = (categoryName: string) => {
    return (categoryName === 'DEBT' && onDebtClick) || 
           (categoryName === 'GOALS' && onGoalsClick) ||
           (categoryName === 'NEEDS' && onNeedsClick) ||
           (categoryName === 'WANTS' && onWantsClick);
  };

  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === 'DEBT' && onDebtClick) {
      onDebtClick();
    } else if (categoryName === 'GOALS' && onGoalsClick) {
      onGoalsClick();
    } else if (categoryName === 'NEEDS' && onNeedsClick) {
      onNeedsClick();
    } else if (categoryName === 'WANTS' && onWantsClick) {
      onWantsClick();
    }
  };

  return (
    <div className="space-y-3">
      {categories.map((category, index) => {
        const percentage = category.budget > 0 ? (category.amount / category.budget) * 100 : 0;
        const clickable = isClickable(category.name);
        
        return (
          <div 
            key={index} 
            className={`group p-3 rounded transition-all duration-200 ${
              clickable ? 'hover:bg-slate-700/30 cursor-pointer' : ''
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getCategoryIcon(category.name)}</span>
                <span className="text-sm font-bold text-slate-300">{category.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-amber-400">
                  ${category.amount.toLocaleString()} / ${category.budget.toLocaleString()}
                </div>
                <div className={`text-xs ${getCategoryStatusColor(category)}`}>
                  {getCategoryStatus(category)}
                </div>
              </div>
            </div>
            <div className="bg-slate-700 h-2 rounded overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  percentage >= 100 ? 'bg-red-500' : 
                  percentage >= 80 ? 'bg-orange-500' : 
                  'bg-green-500'
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {percentage.toFixed(0)}% of budget spent
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryBreakdown;
