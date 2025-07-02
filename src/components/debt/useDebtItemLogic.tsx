
import { DebtItem, DebtType } from '@/types/debt';
import { useEditableField } from '@/hooks/useEditableField';

interface UseDebtItemLogicProps {
  debt: DebtItem;
  index: number;
  onUpdate?: (index: number, updatedDebt: DebtItem) => void;
}

interface UseDebtItemLogicReturn {
  editingField: string | null;
  localEditValue: string;
  increment: number;
  setEditingField: (field: string | null) => void;
  handleDoubleClick: (fieldName: string, currentValue: string) => void;
  handleLocalValueChange: (value: string) => void;
  handleFieldBlur: (fieldName: string) => void;
  handleIncrement: (fieldName: string) => void;
  handleDecrement: (fieldName: string) => void;
  handleTypeChange: (newType: string) => void;
  handleClickOutside: (e: React.MouseEvent) => void;
}

/**
 * Custom hook for managing debt item editing logic
 * @param debt - The debt item to manage
 * @param index - Index of the debt item in the list
 * @param onUpdate - Callback function to update the debt item
 * @returns Object containing state and handlers for debt item editing
 */
export const useDebtItemLogic = ({ debt, index, onUpdate }: UseDebtItemLogicProps): UseDebtItemLogicReturn => {
  const {
    editingField,
    setEditingField,
    localEditValue,
    increment,
    handleDoubleClick: originalHandleDoubleClick,
    handleLocalValueChange,
    handleFieldBlur,
    handleIncrement,
    handleDecrement,
    handleTypeChange: originalHandleTypeChange,
    handleClickOutside
  } = useEditableField({
    item: debt,
    index,
    onUpdate,
    increment: 100,
    onTypeChange: (newType: string) => {
      if (!onUpdate) return;
      const updatedDebt: DebtItem = { ...debt };
      updatedDebt.type = newType as DebtType;
      onUpdate(index, updatedDebt);
    }
  });

  // Wrap the double click handler to match expected signature
  const handleDoubleClick = (fieldName: string, currentValue: string): void => {
    originalHandleDoubleClick(fieldName, currentValue);
  };

  // Wrap the type change handler
  const handleTypeChange = (newType: string): void => {
    originalHandleTypeChange(newType);
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
