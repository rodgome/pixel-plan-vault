
import { useState } from 'react';
import { DebtItem } from '@/types/debt';

interface UseDebtItemLogicProps {
  debt: DebtItem | any;
  index: number;
  onUpdate?: (index: number, updatedDebt: DebtItem) => void;
}

export const useDebtItemLogic = ({ debt, index, onUpdate }: UseDebtItemLogicProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [localEditValue, setLocalEditValue] = useState<string>('');
  const [increment] = useState(100);

  const handleDoubleClick = (fieldName: string, currentValue: number | string) => {
    console.log('Debt field double click:', fieldName, currentValue);
    setEditingField(fieldName);
    setLocalEditValue(currentValue.toString());
  };

  const handleLocalValueChange = (value: string) => {
    console.log('Debt local value change:', value);
    setLocalEditValue(value);
  };

  const handleFieldBlur = (fieldName: string) => {
    console.log('Debt field blur:', fieldName, localEditValue);
    if (!onUpdate) {
      setEditingField(null);
      return;
    }
    
    const updatedDebt = { ...debt };
    
    if (fieldName === 'name') {
      updatedDebt.name = localEditValue;
    } else {
      const numValue = parseFloat(localEditValue);
      if (!isNaN(numValue) && numValue >= 0) {
        switch (fieldName) {
          case 'balance':
            updatedDebt.balance = numValue;
            console.log('Updating balance to:', numValue);
            break;
          case 'minPayment':
            updatedDebt.minPayment = numValue;
            break;
          case 'plannedPayment':
            updatedDebt.plannedPayment = numValue;
            break;
          case 'totalPaid':
            updatedDebt.totalPaid = numValue;
            break;
          case 'interestRate':
            updatedDebt.interestRate = numValue;
            break;
        }
        console.log('Updating debt with:', updatedDebt);
        onUpdate(index, updatedDebt);
      }
    }
    
    setEditingField(null);
    setLocalEditValue('');
  };

  const handleIncrement = (fieldName: string) => {
    console.log('Debt increment:', fieldName);
    if (!onUpdate) return;
    
    const updatedDebt = { ...debt };
    switch (fieldName) {
      case 'balance':
        updatedDebt.balance = (updatedDebt.balance || 0) + increment;
        console.log('Incrementing balance from', debt.balance, 'to', updatedDebt.balance);
        break;
      case 'minPayment':
        updatedDebt.minPayment = (updatedDebt.minPayment || 0) + increment;
        break;
      case 'plannedPayment':
        updatedDebt.plannedPayment = (updatedDebt.plannedPayment || 0) + increment;
        break;
      case 'totalPaid':
        updatedDebt.totalPaid = (updatedDebt.totalPaid || 0) + increment;
        break;
      case 'interestRate':
        updatedDebt.interestRate = (updatedDebt.interestRate || 0) + 0.5;
        break;
    }
    console.log('Debt after increment:', updatedDebt);
    onUpdate(index, updatedDebt);
    
    // Update local edit value to reflect the new value
    const newValue = updatedDebt[fieldName as keyof DebtItem];
    setLocalEditValue(newValue?.toString() || '');
  };

  const handleDecrement = (fieldName: string) => {
    console.log('Debt decrement:', fieldName);
    if (!onUpdate) return;
    
    const updatedDebt = { ...debt };
    switch (fieldName) {
      case 'balance':
        updatedDebt.balance = Math.max(0, (updatedDebt.balance || 0) - increment);
        console.log('Decrementing balance from', debt.balance, 'to', updatedDebt.balance);
        break;
      case 'minPayment':
        updatedDebt.minPayment = Math.max(0, (updatedDebt.minPayment || 0) - increment);
        break;
      case 'plannedPayment':
        updatedDebt.plannedPayment = Math.max(0, (updatedDebt.plannedPayment || 0) - increment);
        break;
      case 'totalPaid':
        updatedDebt.totalPaid = Math.max(0, (updatedDebt.totalPaid || 0) - increment);
        break;
      case 'interestRate':
        updatedDebt.interestRate = Math.max(0, (updatedDebt.interestRate || 0) - 0.5);
        break;
    }
    console.log('Debt after decrement:', updatedDebt);
    onUpdate(index, updatedDebt);
    
    // Update local edit value to reflect the new value
    const newValue = updatedDebt[fieldName as keyof DebtItem];
    setLocalEditValue(newValue?.toString() || '');
  };

  const handleTypeChange = (newType: string) => {
    if (!onUpdate) return;
    const updatedDebt = { ...debt };
    updatedDebt.type = newType as 'credit_card' | 'loan' | 'mortgage' | 'other';
    onUpdate(index, updatedDebt);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && editingField) {
      if (editingField !== 'icon') {
        handleFieldBlur(editingField);
      } else {
        setEditingField(null);
      }
    }
  };

  return {
    editingField,
    localEditValue,
    increment,
    setEditingField,
    handleDoubleClick,
    handleLocalValueChange,
    handleFieldBlur,
    handleIncrement,
    handleDecrement,
    handleTypeChange,
    handleClickOutside
  };
};
