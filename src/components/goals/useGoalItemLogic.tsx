
import { useState } from 'react';

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
  const [editingField, setEditingField] = useState<string | null>(null);
  const [directEditValue, setDirectEditValue] = useState<string>('');
  const [increment, setIncrement] = useState(100);

  const getGoalColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 50) return 'text-blue-400';
    if (percentage >= 25) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const percentage = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;

  const handleDoubleClick = (fieldName: string, currentValue: number | string) => {
    setEditingField(fieldName);
    setDirectEditValue(currentValue.toString());
  };

  const handleIncrement = (fieldName: string) => {
    if (!onUpdate) return;
    
    const updatedGoal = { ...goal };
    switch (fieldName) {
      case 'target':
        updatedGoal.target += increment;
        break;
      case 'current':
        updatedGoal.current += increment;
        break;
      case 'monthlyContribution':
        updatedGoal.monthlyContribution += increment;
        break;
      case 'plannedContribution':
        updatedGoal.plannedContribution = (updatedGoal.plannedContribution || 0) + increment;
        break;
    }
    onUpdate(index, updatedGoal);
  };

  const handleDecrement = (fieldName: string) => {
    if (!onUpdate) return;
    
    const updatedGoal = { ...goal };
    switch (fieldName) {
      case 'target':
        updatedGoal.target = Math.max(0, updatedGoal.target - increment);
        break;
      case 'current':
        updatedGoal.current = Math.max(0, updatedGoal.current - increment);
        break;
      case 'monthlyContribution':
        updatedGoal.monthlyContribution = Math.max(0, updatedGoal.monthlyContribution - increment);
        break;
      case 'plannedContribution':
        updatedGoal.plannedContribution = Math.max(0, (updatedGoal.plannedContribution || 0) - increment);
        break;
    }
    onUpdate(index, updatedGoal);
  };

  const handleDirectValueChange = (fieldName: string, value: string) => {
    // Only update the local state, don't trigger onUpdate yet
    setDirectEditValue(value);
  };

  const handleFieldBlur = (fieldName: string) => {
    if (!onUpdate) return;
    
    const updatedGoal = { ...goal };
    
    if (fieldName === 'name') {
      updatedGoal.name = directEditValue;
      onUpdate(index, updatedGoal);
      setEditingField(null);
      return;
    }
    
    const numValue = parseFloat(directEditValue);
    if (!isNaN(numValue) && numValue >= 0) {
      switch (fieldName) {
        case 'target':
          updatedGoal.target = numValue;
          break;
        case 'current':
          updatedGoal.current = numValue;
          break;
        case 'monthlyContribution':
          updatedGoal.monthlyContribution = numValue;
          break;
        case 'plannedContribution':
          updatedGoal.plannedContribution = numValue;
          break;
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

  const handleClickOutside = (e: React.MouseEvent) => {
    if (editingField && e.target === e.currentTarget) {
      if (editingField !== 'icon') {
        handleFieldBlur(editingField);
      } else {
        setEditingField(null);
      }
    }
  };

  return {
    editingField,
    setEditingField,
    directEditValue,
    increment,
    getGoalColor,
    percentage,
    handleDoubleClick,
    handleIncrement,
    handleDecrement,
    handleDirectValueChange,
    handleFieldBlur,
    handleTypeChange,
    handleClickOutside,
  };
};
