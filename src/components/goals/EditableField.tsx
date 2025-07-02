
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react';

interface EditableFieldProps {
  fieldName: string;
  value: number | string;
  label: string;
  colorClass: string;
  isEditing: boolean;
  localEditValue: string;
  increment: number;
  onFieldClick: (fieldName: string, value: number | string) => void;
  onLocalValueChange: (value: string) => void;
  onFieldBlur: (fieldName: string) => void;
  onIncrement: (fieldName: string) => void;
  onDecrement: (fieldName: string) => void;
  isNumber?: boolean;
}

const EditableField = ({ 
  fieldName, 
  value, 
  label, 
  colorClass, 
  isEditing, 
  localEditValue, 
  increment, 
  onFieldClick, 
  onLocalValueChange, 
  onFieldBlur,
  onIncrement, 
  onDecrement,
  isNumber = true
}: EditableFieldProps) => {
  const displayValue = isNumber && typeof value === 'number' ? 
    `$${value.toLocaleString()}` : 
    value.toString();

  const handleIncrement = (e: React.MouseEvent) => {
    console.log('Goals increment clicked for field:', fieldName);
    e.preventDefault();
    e.stopPropagation();
    onIncrement(fieldName);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    console.log('Goals decrement clicked for field:', fieldName);
    e.preventDefault();
    e.stopPropagation();
    onDecrement(fieldName);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onFieldBlur(fieldName);
    }
    // Prevent other key events from bubbling up
    e.stopPropagation();
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    // Only blur if we're not clicking on one of our buttons
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget && relatedTarget.closest('.increment-decrement-buttons')) {
      return; // Don't blur if clicking on our buttons
    }
    onFieldBlur(fieldName);
  };

  return (
    <div 
      className="cursor-pointer" 
      onClick={(e) => {
        e.stopPropagation();
        if (!isEditing) {
          onFieldClick(fieldName, value);
        }
      }}
    >
      <div className="text-xs text-slate-400">{label}</div>
      <div className={`font-bold ${colorClass}`}>
        {isNumber ? displayValue : value}
      </div>
      
      {isEditing && (
        <div className="mt-2 space-y-2" onClick={(e) => e.stopPropagation()}>
          <Input
            type={isNumber ? "number" : "text"}
            value={localEditValue}
            onChange={(e) => onLocalValueChange(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            className="text-sm bg-slate-700 border-slate-600 text-white h-8"
            placeholder={isNumber ? "Enter amount" : "Enter value"}
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
          {isNumber && (
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
      )}
    </div>
  );
};

export default EditableField;
