
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { DebtItem } from '@/types/debt';
import { DebtWithStrategy } from '@/utils/debtStrategies';
import EditableIcon from './EditableIcon';
import EditableName from './EditableName';

interface DebtItemHeaderProps {
  debt: DebtItem | DebtWithStrategy;
  editingField: string | null;
  localEditValue: string;
  showStrategy: boolean;
  canEdit: boolean;
  onDoubleClick: (fieldName: string, currentValue: string) => void;
  onLocalValueChange: (value: string) => void;
  onFieldBlur: (fieldName: string) => void;
  onTypeChange: (newType: string) => void;
  onEditingFieldChange: (field: string | null) => void;
  onDelete?: () => void;
}

/**
 * Header component for debt items with editable name, icon, and delete functionality
 * @param props - The component props
 * @returns DebtItemHeader component
 */
const DebtItemHeader = ({
  debt,
  editingField,
  localEditValue,
  showStrategy,
  canEdit,
  onDoubleClick,
  onLocalValueChange,
  onFieldBlur,
  onTypeChange,
  onEditingFieldChange,
  onDelete
}: DebtItemHeaderProps) => {
  /**
   * Gets the appropriate CSS class for priority display
   * @param priority - The priority number
   * @returns CSS class string for priority styling
   */
  const getPriorityColor = (priority: number): string => {
    if (priority === 1) return 'text-red-400 font-bold';
    if (priority === 2) return 'text-orange-400';
    return 'text-slate-400';
  };

  const isStrategicDebt = 'recommendedPayment' in debt;

  return (
    <>
      {/* Delete Button */}
      {onDelete && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
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
            onDoubleClick={onDoubleClick}
            onTypeChange={onTypeChange}
            onEditingFieldChange={onEditingFieldChange}
            canEdit={canEdit}
          />
          <EditableName
            name={debt.name}
            editingField={editingField}
            localEditValue={localEditValue}
            onDoubleClick={onDoubleClick}
            onLocalValueChange={onLocalValueChange}
            onFieldBlur={onFieldBlur}
            canEdit={canEdit}
          />
          {showStrategy && isStrategicDebt && (
            <span className={`text-xs px-2 py-1 rounded ${getPriorityColor((debt as DebtWithStrategy).priority)}`}>
              Priority #{(debt as DebtWithStrategy).priority}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default DebtItemHeader;
