
import { useState } from 'react';
import { useEditableField } from '@/hooks/useEditableField';

interface GoalItem {
  name: string;
  target: number;
  current: number;
  monthlyContribution: number;
  plannedContribution?: number;
  type: 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other';
  deadline?: string;
}

interface UseGoalItemLogicProps {
  goal: GoalItem;
  index: number;
  onUpdate?: (index: number, updatedGoal: GoalItem) => void;
}

export const useGoalItemLogic = ({ goal, index, onUpdate }: UseGoalItemLogicProps) => {
  const {
    editingField,
    setEditingField,
    localEditValue,
    increment,
    handleDoubleClick: baseHandleDoubleClick,
    handleLocalValueChange,
    handleFieldBlur: baseHandleFieldBlur,
    handleIncrement: baseHandleIncrement,
    handleDecrement: baseHandleDecrement,
    handleClickOutside
  } = useEditableField({
    item: goal,
    index,
    onUpdate,
    increment: 100
  });

  const getGoalColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 50) return 'text-blue-400';
    if (percentage >= 25) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const percentage = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;

  // Custom field click handler that blocks editing of current field
  const handleFieldClick = (fieldName: string, currentValue: number | string) => {
    // Block editing of current - it should only be changed through allocation
    if (fieldName === 'current') {
      return;
    }
    baseHandleDoubleClick(fieldName, currentValue);
  };

  // Custom increment handler for goals-specific fields
  const handleIncrement = (fieldName: string) => {
    // Block editing of current - it should only be changed through allocation
    if (fieldName === 'current') {
      return;
    }
    
    if (!onUpdate) return;
    
    const updatedGoal = { ...goal };
    switch (fieldName) {
      case 'target':
        updatedGoal.target += increment;
        break;
      case 'monthlyContribution':
        updatedGoal.monthlyContribution += increment;
        break;
      case 'plannedContribution':
        updatedGoal.plannedContribution = (updatedGoal.plannedContribution || 0) + increment;
        break;
      default:
        baseHandleIncrement(fieldName);
        return;
    }
    onUpdate(index, updatedGoal);
  };

  // Custom decrement handler for goals-specific fields
  const handleDecrement = (fieldName: string) => {
    // Block editing of current - it should only be changed through allocation
    if (fieldName === 'current') {
      return;
    }
    
    if (!onUpdate) return;
    
    const updatedGoal = { ...goal };
    switch (fieldName) {
      case 'target':
        updatedGoal.target = Math.max(0, updatedGoal.target - increment);
        break;
      case 'monthlyContribution':
        updatedGoal.monthlyContribution = Math.max(0, updatedGoal.monthlyContribution - increment);
        break;
      case 'plannedContribution':
        updatedGoal.plannedContribution = Math.max(0, (updatedGoal.plannedContribution || 0) - increment);
        break;
      default:
        baseHandleDecrement(fieldName);
        return;
    }
    onUpdate(index, updatedGoal);
  };

  // Custom field blur handler for goals-specific validation
  const handleFieldBlur = (fieldName: string) => {
    // Block editing of current - it should only be changed through allocation
    if (fieldName === 'current') {
      setEditingField(null);
      return;
    }
    
    if (!onUpdate) return;
    
    const updatedGoal = { ...goal };
    
    if (fieldName === 'name') {
      updatedGoal.name = localEditValue;
      onUpdate(index, updatedGoal);
      setEditingField(null);
      return;
    }
    
    const numValue = parseFloat(localEditValue);
    if (!isNaN(numValue) && numValue >= 0) {
      switch (fieldName) {
        case 'target':
          updatedGoal.target = numValue;
          break;
        case 'monthlyContribution':
          updatedGoal.monthlyContribution = numValue;
          break;
        case 'plannedContribution':
          updatedGoal.plannedContribution = numValue;
          break;
        default:
          baseHandleFieldBlur(fieldName);
          return;
      }
      onUpdate(index, updatedGoal);
    }
    setEditingField(null);
  };

  const handleTypeChange = (type: 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other') => {
    if (!onUpdate) return;
    const updatedGoal = { ...goal, type };
    onUpdate(index, updatedGoal);
  };

  return {
    editingField,
    setEditingField,
    localEditValue,
    increment,
    getGoalColor,
    percentage,
    handleFieldClick,
    handleIncrement,
    handleDecrement,
    handleLocalValueChange,
    handleFieldBlur,
    handleTypeChange,
    handleClickOutside,
  };
};
