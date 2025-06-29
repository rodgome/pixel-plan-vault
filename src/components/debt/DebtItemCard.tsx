
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Edit, Plus, Minus } from 'lucide-react';
import { DebtItem } from '@/types/debt';
import { DebtWithStrategy } from '@/utils/debtStrategies';

interface DebtItemCardProps {
  debt: DebtItem | DebtWithStrategy;
  index: number;
  onEdit?: (debt: DebtItem, index: number) => void;
  onUpdate?: (index: number, updatedDebt: DebtItem) => void;
  showStrategy?: boolean;
}

const DebtItemCard = ({ debt, index, onEdit, onUpdate, showStrategy = false }: DebtItemCardProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [directEditValue, setDirectEditValue] = useState<string>('');
  const [increment, setIncrement] = useState(100);

  const getDebtIcon = (type: string) => {
    switch (type) {
      case 'credit_card': return '💳';
      case 'loan': return '🏦';
      case 'mortgage': return '🏠';
      default: return '💸';
    }
  };

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
  
  // Calculate individual monthly payment progress for this debt
  const individualMonthlyProgress = plannedPayment > 0 ? Math.min((totalPaid / plannedPayment) * 100, 100) : 0;

  const handleDoubleClick = (fieldName: string, currentValue: number) => {
    setEditingField(fieldName);
    setDirectEditValue(currentValue.toString());
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

  const handleDirectValueChange = (fieldName: string, value: string) => {
    if (!onUpdate) return;
    
    setDirectEditValue(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      const updatedDebt = { ...debt };
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
      onUpdate(index, updatedDebt);
    }
  };

  const handleClickOutside = () => {
    setEditingField(null);
  };

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(debt, index);
    }
  };

  const renderEditableField = (fieldName: string, value: number, label: string, colorClass: string) => {
    const isEditing = editingField === fieldName;
    
    return (
      <div 
        className="cursor-pointer" 
        onDoubleClick={(e) => {
          e.stopPropagation();
          if (onUpdate) handleDoubleClick(fieldName, value);
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xs text-slate-400">{label}</div>
        <div className={`font-bold ${colorClass}`}>${value.toLocaleString()}</div>
        
        {isEditing && onUpdate && (
          <div className="mt-2 space-y-2">
            <Input
              type="number"
              value={directEditValue}
              onChange={(e) => handleDirectValueChange(fieldName, e.target.value)}
              className="text-sm bg-slate-700 border-slate-600 text-white h-8"
              placeholder="Enter amount"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex items-center justify-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDecrement(fieldName);
                }} 
                className="bg-red-600 hover:bg-red-700 text-white border-red-600 h-7 px-2"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="text-white text-xs">±{increment}</span>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncrement(fieldName);
                }} 
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

  return (
    <div className="bg-black/20 p-4 rounded border border-slate-600" onClick={handleClickOutside}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{getDebtIcon(debt.type)}</span>
          <span className="font-bold text-slate-200">{debt.name}</span>
          {showStrategy && isStrategicDebt && (
            <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(debt.priority)}`}>
              Priority #{debt.priority}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className={`text-sm font-bold ${getDebtColor(debt.interestRate)}`}>
            {debt.interestRate}% APR
          </div>
          {onEdit && (
            <Button
              onClick={handleEditClick}
              variant="ghost"
              size="sm"
              className="text-amber-400 hover:text-amber-300 hover:bg-slate-700/50 h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        {renderEditableField('balance', debt.balance, 'BALANCE', 'text-red-400')}
        {renderEditableField('minPayment', debt.minPayment, 'MIN PAYMENT', 'text-orange-400')}
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
        {renderEditableField('plannedPayment', debt.plannedPayment, 'PLANNED PAYMENT', 'text-blue-400')}
        {renderEditableField('totalPaid', debt.totalPaid, 'TOTAL PAID', 'text-green-400')}
      </div>

      {/* Individual Monthly Payment Progress */}
      <div className="space-y-2 mb-3">
        <div className="text-xs text-slate-400">THIS MONTH'S PAYMENT PROGRESS</div>
        <Progress 
          value={individualMonthlyProgress} 
          className="h-2 bg-slate-700 [&>div]:bg-blue-500" 
        />
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Paid: ${totalPaid.toLocaleString()}</span>
          <span className="text-blue-400">Target: ${plannedPayment.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Progress Bar */}
      <div className="space-y-2">
        <div className="text-xs text-slate-400 mb-1">OVERALL PAYMENT PROGRESS</div>
        <div className="relative">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-orange-400">Min: ${debt.minPayment}</span>
            <span className="text-blue-400">
              {showStrategy && isStrategicDebt ? 'Recommended' : 'Planned'}: ${plannedPayment}
            </span>
            <span className="text-green-400">Paid: ${totalPaid}</span>
          </div>
          
          <div className="relative h-4 bg-slate-700 rounded overflow-hidden">
            {/* Min Payment Bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-orange-500/60"
              style={{ width: `${(debt.minPayment / maxPayment) * 100}%` }}
            />
            {/* Planned Payment Bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-blue-500/60"
              style={{ width: `${(plannedPayment / maxPayment) * 100}%` }}
            />
            {/* Total Paid Bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-green-500"
              style={{ width: `${(totalPaid / maxPayment) * 100}%` }}
            />
            
            {/* Dotted line for minimum payment */}
            <div 
              className="absolute top-0 h-full w-1 border-l-4 border-dashed border-red-500"
              style={{ left: `${(debt.minPayment / maxPayment) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebtItemCard;
