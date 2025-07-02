import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { DebtItem } from '@/types/debt';
import { DebtWithStrategy } from '@/utils/debtStrategies';
import EditableField from './EditableField';
import EditableName from './EditableName';
import EditableIcon from './EditableIcon';
import DebtProgressBars from './DebtProgressBars';

interface DebtItemCardProps {
  debt: DebtItem | DebtWithStrategy;
  index: number;
  onEdit?: (debt: DebtItem, index: number) => void;
  onUpdate?: (index: number, updatedDebt: DebtItem) => void;
  onDelete?: () => void;
  showStrategy?: boolean;
}

const DebtItemCard = ({ debt, index, onEdit, onUpdate, onDelete, showStrategy = false }: DebtItemCardProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [localEditValue, setLocalEditValue] = useState<string>('');
  const [increment, setIncrement] = useState(100);

  const getDebtColor = (interestRate: number) => {
    if (interestRate > 20) return 'text-red-400';
    if (interestRate > 10) return 'text-orange-400';
    return 'text-yellow-400';
  };

  const getPriorityColor = (priority: number) => {
    if (priority === 1) return 'text-red-400 font-bold';
    if (priority === 2) return 'text-orange-400';
    return 'text-slate-400';
  };

  const isStrategicDebt = 'recommendedPayment' in debt;
  const plannedPayment = isStrategicDebt ? debt.recommendedPayment : debt.plannedPayment;
  const totalPaid = debt.totalPaid;
  const maxPayment = Math.max(debt.minPayment, plannedPayment, totalPaid);

  const handleDoubleClick = (fieldName: string, currentValue: number | string) => {
    setEditingField(fieldName);
    setLocalEditValue(currentValue.toString());
  };

  const handleLocalValueChange = (value: string) => {
    setLocalEditValue(value);
  };

  const commitEdit = (fieldName: string) => {
    if (!onUpdate) return;
    
    const updatedDebt = { ...debt };
    
    if (fieldName === 'name') {
      updatedDebt.name = localEditValue;
    } else {
      const numValue = parseFloat(localEditValue);
      if (!isNaN(numValue) && numValue >= 0) {
        switch (fieldName) {
          case 'balance':
            updatedDebt.balance = numValue;
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
        }
      }
    }
    
    onUpdate(index, updatedDebt);
    setEditingField(null);
    setLocalEditValue('');
  };

  const handleFieldBlur = (fieldName: string) => {
    commitEdit(fieldName);
  };

  const handleIncrement = (fieldName: string) => {
    if (!onUpdate) return;
    
    const updatedDebt = { ...debt };
    switch (fieldName) {
      case 'balance':
        updatedDebt.balance += increment;
        break;
      case 'minPayment':
        updatedDebt.minPayment += increment;
        break;
      case 'plannedPayment':
        updatedDebt.plannedPayment += increment;
        break;
      case 'totalPaid':
        updatedDebt.totalPaid += increment;
        break;
    }
    onUpdate(index, updatedDebt);
  };

  const handleDecrement = (fieldName: string) => {
    if (!onUpdate) return;
    
    const updatedDebt = { ...debt };
    switch (fieldName) {
      case 'balance':
        updatedDebt.balance = Math.max(0, updatedDebt.balance - increment);
        break;
      case 'minPayment':
        updatedDebt.minPayment = Math.max(0, updatedDebt.minPayment - increment);
        break;
      case 'plannedPayment':
        updatedDebt.plannedPayment = Math.max(0, updatedDebt.plannedPayment - increment);
        break;
      case 'totalPaid':
        updatedDebt.totalPaid = Math.max(0, updatedDebt.totalPaid - increment);
        break;
    }
    onUpdate(index, updatedDebt);
  };

  const handleClickOutside = () => {
    if (editingField) {
      commitEdit(editingField);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const handleTypeChange = (newType: string) => {
    if (!onUpdate) return;
    const updatedDebt = { ...debt };
    updatedDebt.type = newType as 'credit_card' | 'loan' | 'mortgage' | 'other';
    onUpdate(index, updatedDebt);
  };

  return (
    <div className="bg-black/20 p-4 rounded border border-slate-600 relative" onClick={handleClickOutside}>
      {/* Delete Button */}
      {onDelete && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 h-6 w-6 p-0"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      )}

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <EditableIcon
            type={debt.type}
            editingField={editingField}
            localEditValue={localEditValue}
            onDoubleClick={handleDoubleClick}
            onTypeChange={handleTypeChange}
            onEditingFieldChange={setEditingField}
            canEdit={!!onUpdate}
          />
          <EditableName
            name={debt.name}
            editingField={editingField}
            localEditValue={localEditValue}
            onDoubleClick={handleDoubleClick}
            onLocalValueChange={handleLocalValueChange}
            onFieldBlur={handleFieldBlur}
            canEdit={!!onUpdate}
          />
          {showStrategy && isStrategicDebt && (
            <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(debt.priority)}`}>
              Priority #{debt.priority}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mr-8">
          <div className={`text-sm font-bold ${getDebtColor(debt.interestRate)}`}>
            {debt.interestRate}% APR
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        <EditableField
          fieldName="balance"
          value={debt.balance}
          label="BALANCE"
          colorClass="text-red-400"
          editingField={editingField}
          localEditValue={localEditValue}
          increment={increment}
          onDoubleClick={handleDoubleClick}
          onLocalValueChange={handleLocalValueChange}
          onFieldBlur={handleFieldBlur}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          canEdit={!!onUpdate}
        />
        <EditableField
          fieldName="minPayment"
          value={debt.minPayment}
          label="MIN PAYMENT"
          colorClass="text-orange-400"
          editingField={editingField}
          localEditValue={localEditValue}
          increment={increment}
          onDoubleClick={handleDoubleClick}
          onLocalValueChange={handleLocalValueChange}
          onFieldBlur={handleFieldBlur}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          canEdit={!!onUpdate}
        />
      </div>

      {/* Strategy Recommendation */}
      {showStrategy && isStrategicDebt && (
        <div className="bg-black/30 p-3 rounded border border-slate-500 mb-3">
          <div className="text-xs text-amber-400 mb-1">RECOMMENDED PAYMENT</div>
          <div className="font-bold text-amber-400">${debt.recommendedPayment.toLocaleString()}</div>
        </div>
      )}

      {/* Planned Payment and Total Paid Fields */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        <EditableField
          fieldName="plannedPayment"
          value={debt.plannedPayment}
          label="PLANNED PAYMENT"
          colorClass="text-blue-400"
          editingField={editingField}
          localEditValue={localEditValue}
          increment={increment}
          onDoubleClick={handleDoubleClick}
          onLocalValueChange={handleLocalValueChange}
          onFieldBlur={handleFieldBlur}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          canEdit={!!onUpdate}
        />
        <EditableField
          fieldName="totalPaid"
          value={debt.totalPaid}
          label="TOTAL PAID"
          colorClass="text-green-400"
          editingField={editingField}
          localEditValue={localEditValue}
          increment={increment}
          onDoubleClick={handleDoubleClick}
          onLocalValueChange={handleLocalValueChange}
          onFieldBlur={handleFieldBlur}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          canEdit={!!onUpdate}
        />
      </div>

      <DebtProgressBars
        plannedPayment={plannedPayment}
        totalPaid={totalPaid}
        minPayment={debt.minPayment}
        maxPayment={maxPayment}
        showStrategy={showStrategy}
      />
    </div>
  );
};

export default DebtItemCard;
