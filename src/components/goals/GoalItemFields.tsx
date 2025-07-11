
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

interface GoalItemFieldsProps {
  goal: GoalItem;
  editingField: string | null;
  localEditValue: string;
  increment: number;
  onDoubleClick: (fieldName: string, currentValue: number | string) => void;
  onLocalValueChange: (value: string) => void;
  onFieldBlur: (fieldName: string) => void;
  onIncrement: (fieldName: string) => void;
  onDecrement: (fieldName: string) => void;
}

const GoalItemFields = ({
  goal,
  editingField,
  localEditValue,
  increment,
  onDoubleClick,
  onLocalValueChange,
  onFieldBlur,
  onIncrement,
  onDecrement
}: GoalItemFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        <EditableField
          fieldName="current"
          value={goal.current}
          label="CURRENT"
          colorClass="text-green-400"
          isEditing={editingField === 'current'}
          localEditValue={localEditValue}
          increment={increment}
          onFieldClick={onDoubleClick}
          onLocalValueChange={onLocalValueChange}
          onFieldBlur={onFieldBlur}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          canEdit={false}
          showButtons={false}
        />
        <EditableField
          fieldName="target"
          value={goal.target}
          label="TARGET"
          colorClass="text-blue-400"
          isEditing={editingField === 'target'}
          localEditValue={localEditValue}
          increment={increment}
          onFieldClick={onDoubleClick}
          onLocalValueChange={onLocalValueChange}
          onFieldBlur={onFieldBlur}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
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
          localEditValue={localEditValue}
          increment={increment}
          onFieldClick={onDoubleClick}
          onLocalValueChange={onLocalValueChange}
          onFieldBlur={onFieldBlur}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
        <EditableField
          fieldName="plannedContribution"
          value={goal.plannedContribution || goal.monthlyContribution}
          label="PLANNED CONTRIBUTION"
          colorClass="text-purple-400"
          isEditing={editingField === 'plannedContribution'}
          localEditValue={localEditValue}
          increment={increment}
          onFieldClick={onDoubleClick}
          onLocalValueChange={onLocalValueChange}
          onFieldBlur={onFieldBlur}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      </div>
    </>
  );
};

export default GoalItemFields;
