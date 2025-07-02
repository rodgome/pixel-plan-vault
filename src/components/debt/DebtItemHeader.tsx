
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import EditableIcon from './EditableIcon';
import EditableName from './EditableName';

interface DebtItemHeaderProps {
  debt: any;
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
  const getPriorityColor = (priority: number) => {
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
            <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(debt.priority)}`}>
              Priority #{debt.priority}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default DebtItemHeader;
