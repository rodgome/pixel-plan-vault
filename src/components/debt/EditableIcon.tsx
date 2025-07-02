
interface EditableIconProps {
  type: string;
  editingField: string | null;
  localEditValue: string;
  onDoubleClick: (fieldName: string, currentValue: string) => void;
  onTypeChange: (newType: string) => void;
  onEditingFieldChange: (field: string | null) => void;
  canEdit?: boolean;
}

const EditableIcon = ({
  type,
  editingField,
  localEditValue,
  onDoubleClick,
  onTypeChange,
  onEditingFieldChange,
  canEdit = true
}: EditableIconProps) => {
  const getDebtIcon = (debtType: string) => {
    switch (debtType) {
      case 'credit_card': return '💳';
      case 'loan': return '🏦';
      case 'mortgage': return '🏠';
      default: return '💸';
    }
  };

  const isEditing = editingField === 'icon';
  
  return (
    <div 
      className="cursor-pointer" 
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (canEdit) onDoubleClick('icon', type);
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="text-lg">{getDebtIcon(type)}</span>
      
      {isEditing && canEdit && (
        <div className="mt-2">
          <select
            value={localEditValue}
            onChange={(e) => {
              onTypeChange(e.target.value);
              onEditingFieldChange(null);
            }}
            className="text-sm bg-slate-700 border-slate-600 text-white h-8 rounded px-2"
            onClick={(e) => e.stopPropagation()}
          >
            <option value="credit_card">💳 Credit Card</option>
            <option value="loan">🏦 Loan</option>
            <option value="mortgage">🏠 Mortgage</option>
            <option value="other">💸 Other</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default EditableIcon;
