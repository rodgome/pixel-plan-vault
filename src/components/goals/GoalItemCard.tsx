
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import GoalTypeSelector from './GoalTypeSelector';
import EditableField from './EditableField';
import GoalProgressBars from './GoalProgressBars';

interface GoalItem {
  name: string;
  target: number;
  current: number;
  monthlyContribution: number;
  plannedContribution?: number;
  type: 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other';
  deadline?: string;
}

interface GoalItemCardProps {
  goal: GoalItem;
  index: number;
  onUpdate?: (index: number, updatedGoal: GoalItem) => void;
  onDelete?: () => void;
}

const GoalItemCard = ({ goal, index, onUpdate, onDelete }: GoalItemCardProps) => {
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
    if (!onUpdate) return;
    
    setDirectEditValue(value);
    const updatedGoal = { ...goal };
    
    if (fieldName === 'name') {
      updatedGoal.name = value;
      onUpdate(index, updatedGoal);
      return;
    }
    
    const numValue = parseFloat(value);
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
  };

  const handleTypeChange = (type: 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other') => {
    if (!onUpdate) return;
    const updatedGoal = { ...goal, type };
    onUpdate(index, updatedGoal);
  };

  const handleClickOutside = () => {
    setEditingField(null);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
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
          <GoalTypeSelector
            type={goal.type}
            isEditing={editingField === 'icon'}
            onTypeChange={handleTypeChange}
            onEditStart={() => setEditingField('icon')}
            onEditEnd={() => setEditingField(null)}
          />
          <EditableField
            fieldName="name"
            value={goal.name}
            label=""
            colorClass="font-bold text-slate-200"
            isEditing={editingField === 'name'}
            directEditValue={directEditValue}
            increment={increment}
            onDoubleClick={handleDoubleClick}
            onDirectValueChange={handleDirectValueChange}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            isNumber={false}
          />
        </div>
        <div className="flex items-center gap-2 mr-8">
          <div className={`text-sm font-bold ${getGoalColor(percentage)}`}>
            {percentage.toFixed(1)}%
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        <EditableField
          fieldName="current"
          value={goal.current}
          label="CURRENT"
          colorClass="text-green-400"
          isEditing={editingField === 'current'}
          directEditValue={directEditValue}
          increment={increment}
          onDoubleClick={handleDoubleClick}
          onDirectValueChange={handleDirectValueChange}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
        <EditableField
          fieldName="target"
          value={goal.target}
          label="TARGET"
          colorClass="text-blue-400"
          isEditing={editingField === 'target'}
          directEditValue={directEditValue}
          increment={increment}
          onDoubleClick={handleDoubleClick}
          onDirectValueChange={handleDirectValueChange}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </div>

      {/* Monthly Contribution Fields */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        <EditableField
          fieldName="monthlyContribution"
          value={goal.monthlyContribution}
          label="MONTHLY CONTRIBUTED"
          colorClass="text-orange-400"
          isEditing={editingField === 'monthlyContribution'}
          directEditValue={directEditValue}
          increment={increment}
          onDoubleClick={handleDoubleClick}
          onDirectValueChange={handleDirectValueChange}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
        <EditableField
          fieldName="plannedContribution"
          value={goal.plannedContribution || goal.monthlyContribution}
          label="PLANNED CONTRIBUTION"
          colorClass="text-purple-400"
          isEditing={editingField === 'plannedContribution'}
          directEditValue={directEditValue}
          increment={increment}
          onDoubleClick={handleDoubleClick}
          onDirectValueChange={handleDirectValueChange}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </div>

      <GoalProgressBars goal={goal} />
    </div>
  );
};

export default GoalItemCard;
