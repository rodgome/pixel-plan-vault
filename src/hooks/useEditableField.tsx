
import { useState, useCallback } from 'react';

export interface UseEditableFieldOptions<T> {
  item: T;
  index: number;
  onUpdate?: (index: number, updatedItem: T) => void;
  increment?: number;
  onTypeChange?: (newType: string) => void;
}

export const useEditableField = <T extends Record<string, any>>({
  item,
  index,
  onUpdate,
  increment = 100,
  onTypeChange
}: UseEditableFieldOptions<T>) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [localEditValue, setLocalEditValue] = useState<string>('');

  const handleDoubleClick = useCallback((fieldName: string, currentValue: number | string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Field double click:', fieldName, currentValue);
    }
    setEditingField(fieldName);
    setLocalEditValue(currentValue.toString());
  }, []);

  const handleLocalValueChange = useCallback((value: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Local value change:', value);
    }
    setLocalEditValue(value);
  }, []);

  const handleFieldBlur = useCallback((fieldName: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Field blur:', fieldName, localEditValue);
    }
    if (!onUpdate) {
      setEditingField(null);
      setLocalEditValue('');
      return;
    }
    
    const updatedItem = { ...item } as T;
    
    // Handle text fields (like name)
    if (typeof item[fieldName] === 'string' && fieldName === 'name') {
      (updatedItem as any)[fieldName] = localEditValue;
      onUpdate(index, updatedItem);
      setEditingField(null);
      setLocalEditValue('');
      return;
    }
    
    // Handle numeric fields
    const numValue = parseFloat(localEditValue);
    if (!isNaN(numValue) && numValue >= 0) {
      (updatedItem as any)[fieldName] = numValue;
      if (process.env.NODE_ENV === 'development') {
        console.log(`${fieldName} field blur - updating to:`, numValue);
        console.log('Updated item object:', updatedItem);
      }
      onUpdate(index, updatedItem);
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log('Invalid number value for field:', fieldName, localEditValue);
      }
    }
    
    setEditingField(null);
    setLocalEditValue('');
  }, [item, index, onUpdate, localEditValue]);

  const handleIncrement = useCallback((fieldName: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Increment:', fieldName);
    }
    if (!onUpdate) return;
    
    const updatedItem = { ...item } as T;
    let newValue: number;
    
    // Special handling for percentage fields
    if (fieldName === 'interestRate') {
      newValue = ((updatedItem as any)[fieldName] || 0) + 0.5;
    } else {
      newValue = ((updatedItem as any)[fieldName] || 0) + increment;
    }
    
    (updatedItem as any)[fieldName] = newValue;
    if (process.env.NODE_ENV === 'development') {
      console.log(`Incrementing ${fieldName} from`, item[fieldName], 'to', (updatedItem as any)[fieldName]);
    }
    onUpdate(index, updatedItem);
    
    // Update local edit value if currently editing
    if (editingField === fieldName) {
      setLocalEditValue(newValue.toString());
    }
  }, [item, index, onUpdate, increment, editingField]);

  const handleDecrement = useCallback((fieldName: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Decrement:', fieldName);
    }
    if (!onUpdate) return;
    
    const updatedItem = { ...item } as T;
    let newValue: number;
    
    // Special handling for percentage fields
    if (fieldName === 'interestRate') {
      newValue = Math.max(0, ((updatedItem as any)[fieldName] || 0) - 0.5);
    } else {
      newValue = Math.max(0, ((updatedItem as any)[fieldName] || 0) - increment);
    }
    
    (updatedItem as any)[fieldName] = newValue;
    if (process.env.NODE_ENV === 'development') {
      console.log(`Decrementing ${fieldName} from`, item[fieldName], 'to', (updatedItem as any)[fieldName]);
    }
    onUpdate(index, updatedItem);
    
    // Update local edit value if currently editing
    if (editingField === fieldName) {
      setLocalEditValue(newValue.toString());
    }
  }, [item, index, onUpdate, increment, editingField]);

  const handleKeyDown = useCallback((e: KeyboardEvent, fieldName: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleFieldBlur(fieldName);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setEditingField(null);
      setLocalEditValue('');
    }
  }, [handleFieldBlur]);

  const handleTypeChange = useCallback((newType: string) => {
    if (!onUpdate || !onTypeChange) return;
    
    const updatedItem = { ...item } as T;
    (updatedItem as any).type = newType;
    onUpdate(index, updatedItem);
    onTypeChange(newType);
  }, [item, index, onUpdate, onTypeChange]);

  const handleClickOutside = useCallback((e: React.MouseEvent) => {
    // Only close editing if clicking on the card background itself
    if (e.target === e.currentTarget && editingField) {
      if (editingField !== 'icon') {
        handleFieldBlur(editingField);
      } else {
        setEditingField(null);
        setLocalEditValue('');
      }
    }
  }, [editingField, handleFieldBlur]);

  return {
    editingField,
    setEditingField,
    localEditValue,
    increment,
    handleDoubleClick,
    handleLocalValueChange,
    handleFieldBlur,
    handleIncrement,
    handleDecrement,
    handleKeyDown,
    handleTypeChange,
    handleClickOutside
  };
};
