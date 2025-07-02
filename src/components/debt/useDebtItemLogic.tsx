
import { DebtItem } from '@/types/debt';
import { useEditableField } from '@/hooks/useEditableField';

interface UseDebtItemLogicProps {
  debt: DebtItem | any;
  index: number;
  onUpdate?: (index: number, updatedDebt: DebtItem) => void;
}

export const useDebtItemLogic = ({ debt, index, onUpdate }: UseDebtItemLogicProps) => {
  const {
    editingField,
    setEditingField,
    localEditValue,
    increment,
    handleDoubleClick,
    handleLocalValueChange,
    handleFieldBlur,
    handleIncrement,
    handleDecrement,
    handleTypeChange,
    handleClickOutside
  } = useEditableField({
    item: debt,
    index,
    onUpdate,
    increment: 100,
    onTypeChange: (newType: string) => {
      if (!onUpdate) return;
      const updatedDebt = { ...debt };
      updatedDebt.type = newType as 'credit_card' | 'loan' | 'mortgage' | 'other';
      onUpdate(index, updatedDebt);
    }
  });

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
