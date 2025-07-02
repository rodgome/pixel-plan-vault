
import GoalItemHeader from './GoalItemHeader';
import GoalItemFields from './GoalItemFields';
import GoalProgressBars from './GoalProgressBars';
import { useGoalItemLogic } from './useGoalItemLogic';

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
  const {
    editingField,
    setEditingField,
    localEditValue,
    increment,
    getGoalColor,
    percentage,
    handleFieldClick,
    handleIncrement,
    handleDecrement,
    handleLocalValueChange,
    handleFieldBlur,
    handleTypeChange,
    handleClickOutside,
  } = useGoalItemLogic({ goal, index, onUpdate });

  return (
    <div className="bg-black/20 p-4 rounded border border-slate-600 relative" onClick={handleClickOutside}>
      <GoalItemHeader
        goal={goal}
        percentage={percentage}
        getGoalColor={getGoalColor}
        editingField={editingField}
        setEditingField={setEditingField}
        localEditValue={localEditValue}
        increment={increment}
        onDoubleClick={handleFieldClick}
        onLocalValueChange={handleLocalValueChange}
        onFieldBlur={handleFieldBlur}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onTypeChange={handleTypeChange}
        onDelete={onDelete}
      />
      
      <GoalItemFields
        goal={goal}
        editingField={editingField}
        localEditValue={localEditValue}
        increment={increment}
        onDoubleClick={handleFieldClick}
        onLocalValueChange={handleLocalValueChange}
        onFieldBlur={handleFieldBlur}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />

      <GoalProgressBars goal={goal} />
    </div>
  );
};

export default GoalItemCard;
