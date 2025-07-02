
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react';

export type EditableFieldType = 'text' | 'number' | 'currency' | 'percentage' | 'icon';

interface EditableFieldProps {
  fieldName: string;
  value: string | number;
  label?: string;
  type?: EditableFieldType;
  colorClass?: string;
  isEditing: boolean;
  localEditValue: string;
  increment?: number;
  onFieldClick: (fieldName: string, value: string | number) => void;
  onLocalValueChange: (value: string) => void;
  onFieldBlur: (fieldName: string) => void;
  onIncrement?: (fieldName: string) => void;
  onDecrement?: (fieldName: string) => void;
  onTypeChange?: (newType: string) => void;
  onEditingFieldChange?: (field: string | null) => void;
  canEdit?: boolean;
  showButtons?: boolean;
  iconOptions?: Array<{ value: string; label: string; icon: string }>;
  className?: string;
}

const EditableField = ({
  fieldName,
  value,
  label,
  type = 'text',
  colorClass = 'text-slate-200',
  isEditing,
  localEditValue,
  increment = 100,
  onFieldClick,
  onLocalValueChange,
  onFieldBlur,
  onIncrement,
  onDecrement,
  onTypeChange,
  onEditingFieldChange,
  canEdit = true,
  showButtons = true,
  iconOptions = [
    { value: 'credit_card', label: 'Credit Card', icon: '💳' },
    { value: 'loan', label: 'Loan', icon: '🏦' },
    { value: 'mortgage', label: 'Mortgage', icon: '🏠' },
    { value: 'other', label: 'Other', icon: '💸' }
  ],
  className = ''
}: EditableFieldProps) => {
  
  const getDisplayValue = () => {
    if (type === 'currency') {
      return typeof value === 'number' ? `$${value.toLocaleString()}` : `$${value}`;
    }
    if (type === 'percentage') {
      return `${value}%`;
    }
    if (type === 'icon') {
      const option = iconOptions.find(opt => opt.value === value);
      return option?.icon || '💸';
    }
    return value.toString();
  };

  const getInputType = () => {
    if (type === 'number' || type === 'currency' || type === 'percentage') {
      return 'number';
    }
    return 'text';
  };

  const getInputStep = () => {
    if (type === 'percentage') return '0.01';
    return '1';
  };

  const handleIncrement = (e: React.MouseEvent) => {
    console.log(`${type === 'currency' ? 'Currency' : 'Number'} increment clicked for field:`, fieldName);
    e.preventDefault();
    e.stopPropagation();
    if (onIncrement) {
      onIncrement(fieldName);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    console.log(`${type === 'currency' ? 'Currency' : 'Number'} decrement clicked for field:`, fieldName);
    e.preventDefault();
    e.stopPropagation();
    if (onDecrement) {
      onDecrement(fieldName);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onFieldBlur(fieldName);
    }
    e.stopPropagation();
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget && relatedTarget.closest('.increment-decrement-buttons')) {
      return;
    }
    onFieldBlur(fieldName);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEditing && canEdit) {
      onFieldClick(fieldName, value);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canEdit) {
      onFieldClick(fieldName, value);
    }
  };

  const renderEditingContent = () => {
    if (type === 'icon' && onTypeChange && onEditingFieldChange) {
      return (
        <select
          value={localEditValue}
          onChange={(e) => {
            onTypeChange(e.target.value);
            onEditingFieldChange(null);
          }}
          className="text-sm bg-slate-700 border-slate-600 text-white h-8 rounded px-2"
          onClick={(e) => e.stopPropagation()}
        >
          {iconOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.icon} {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <div className="space-y-2">
        <Input
          type={getInputType()}
          value={localEditValue}
          onChange={(e) => onLocalValueChange(e.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className="text-sm bg-slate-700 border-slate-600 text-white h-8"
          placeholder={
            type === 'currency' ? 'Enter amount' :
            type === 'percentage' ? 'Enter percentage' :
            type === 'number' ? 'Enter number' :
            'Enter value'
          }
          onClick={(e) => e.stopPropagation()}
          autoFocus
          step={getInputStep()}
        />
        {(type === 'number' || type === 'currency') && showButtons && onIncrement && onDecrement && (
          <div className="flex items-center justify-center gap-2 increment-decrement-buttons">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleDecrement}
              className="bg-red-600 hover:bg-red-700 text-white border-red-600 h-7 px-2"
              type="button"
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="text-white text-xs">±{increment}</span>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleIncrement}
              className="bg-green-600 hover:bg-green-700 text-white border-green-600 h-7 px-2"
              type="button"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`cursor-pointer ${className}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {label && <div className="text-xs text-slate-400">{label}</div>}
      
      {type === 'text' && !label ? (
        <span className={`font-bold ${colorClass}`}>{value}</span>
      ) : (
        <div className={`font-bold ${colorClass}`}>
          {getDisplayValue()}
        </div>
      )}
      
      {isEditing && canEdit && (
        <div className="mt-2" onClick={(e) => e.stopPropagation()}>
          {renderEditingContent()}
        </div>
      )}
    </div>
  );
};

export default EditableField;
