
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react';

interface EditableFieldProps {
  fieldName: string;
  value: number;
  label: string;
  colorClass: string;
  editingField: string | null;
  localEditValue: string;
  increment: number;
  onDoubleClick: (fieldName: string, currentValue: number) => void;
  onLocalValueChange: (value: string) => void;
  onFieldBlur: (fieldName: string) => void;
  onIncrement: (fieldName: string) => void;
  onDecrement: (fieldName: string) => void;
  canEdit?: boolean;
}

const EditableField = ({
  fieldName,
  value,
  label,
  colorClass,
  editingField,
  localEditValue,
  increment,
  onDoubleClick,
  onLocalValueChange,
  onFieldBlur,
  onIncrement,
  onDecrement,
  canEdit = true
}: EditableFieldProps) => {
  const isEditing = editingField === fieldName;
  
  const handleIncrement = (e: React.MouseEvent) => {
    console.log('Increment clicked for field:', fieldName);
    e.preventDefault();
    e.stopPropagation();
    onIncrement(fieldName);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    console.log('Decrement clicked for field:', fieldName);
    e.preventDefault();
    e.stopPropagation();
    onDecrement(fieldName);
  };
  
  return (
    <div 
      className="cursor-pointer" 
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (canEdit) onDoubleClick(fieldName, value);
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-xs text-slate-400">{label}</div>
      <div className={`font-bold ${colorClass}`}>${value.toLocaleString()}</div>
      
      {isEditing && canEdit && (
        <div className="mt-2 space-y-2" onClick={(e) => e.stopPropagation()}>
          <Input
            type="number"
            value={localEditValue}
            onChange={(e) => onLocalValueChange(e.target.value)}
            onBlur={() => onFieldBlur(fieldName)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onFieldBlur(fieldName);
              }
            }}
            className="text-sm bg-slate-700 border-slate-600 text-white h-8"
            placeholder="Enter amount"
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
          <div className="flex items-center justify-center gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleDecrement}
              className="bg-red-600 hover:bg-red-700 text-white border-red-600 h-7 px-2"
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="text-white text-xs">±{increment}</span>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleIncrement}
              className="bg-green-600 hover:bg-green-700 text-white border-green-600 h-7 px-2"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableField;
