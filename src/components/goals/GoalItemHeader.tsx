
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import GoalTypeSelector from './GoalTypeSelector';
import EditableField from './EditableField';

interface GoalItem {
  name: string;
  target: number;
  current: number;
  monthlyContribution: number;
  plannedContribution?: number;
  type: 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other';
  deadline?: string;
}

interface GoalItemHeaderProps {
  goal: GoalItem;
  percentage: number;
  getGoalColor: (percentage: number) => string;
  editingField: string | null;
  setEditingField: (field: string | null) => void;
  localEditValue: string;
  increment: number;
  onDoubleClick: (fieldName: string, currentValue: number | string) => void;
  onLocalValueChange: (value: string) => void;
  onFieldBlur: (fieldName: string) => void;
  onIncrement: (fieldName: string) => void;
  onDecrement: (fieldName: string) => void;
  onTypeChange: (type: 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other') => void;
  onDelete?: () => void;
}

const GoalItemHeader = ({
  goal,
  percentage,
  getGoalColor,
  editingField,
  setEditingField,
  localEditValue,
  increment,
  onDoubleClick,
  onLocalValueChange,
  onFieldBlur,
  onIncrement,
  onDecrement,
  onTypeChange,
  onDelete
}: GoalItemHeaderProps) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <>
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
            onTypeChange={onTypeChange}
            onEditStart={() => setEditingField('icon')}
            onEditEnd={() => setEditingField(null)}
          />
          <EditableField
            fieldName="name"
            value={goal.name}
            label=""
            colorClass="font-bold text-slate-200"
            isEditing={editingField === 'name'}
            localEditValue={localEditValue}
            increment={increment}
            onDoubleClick={onDoubleClick}
            onLocalValueChange={onLocalValueChange}
            onFieldBlur={onFieldBlur}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            isNumber={false}
          />
        </div>
        <div className="flex items-center gap-2 mr-8">
          <div className={`text-sm font-bold ${getGoalColor(percentage)}`}>
            {percentage.toFixed(1)}%
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalItemHeader;
