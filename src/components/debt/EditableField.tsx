
import EditableField from '@/components/ui/EditableField';

interface EditableFieldProps {
  fieldName: string;
  value: number;
  label: string;
  colorClass: string;
  editingField: string | null;
  localEditValue: string;
  increment: number;
  onDoubleClick: (fieldName: string, currentValue: number) => void;
  onLocalValueChange: (value: string) => void;
  onFieldBlur: (fieldName: string) => void;
  onIncrement: (fieldName: string) => void;
  onDecrement: (fieldName: string) => void;
  canEdit?: boolean;
  showButtons?: boolean;
}

const DebtEditableField = ({
  fieldName,
  value,
  label,
  colorClass,
  editingField,
  localEditValue,
  increment,
  onDoubleClick,
  onLocalValueChange,
  onFieldBlur,
  onIncrement,
  onDecrement,
  canEdit = true,
  showButtons = true
}: EditableFieldProps) => {
  const isEditing = editingField === fieldName;
  
  const getFieldType = () => {
    if (fieldName === 'interestRate') return 'percentage';
    return 'currency';
  };

  const handleFieldClick = (fieldName: string, value: string | number) => {
    onDoubleClick(fieldName, typeof value === 'string' ? parseFloat(value) : value);
  };

  return (
    <EditableField
      fieldName={fieldName}
      value={value}
      label={label}
      type={getFieldType()}
      colorClass={colorClass}
      isEditing={isEditing}
      localEditValue={localEditValue}
      increment={increment}
      onFieldClick={handleFieldClick}
      onLocalValueChange={onLocalValueChange}
      onFieldBlur={onFieldBlur}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      canEdit={canEdit}
      showButtons={showButtons}
    />
  );
};

export default DebtEditableField;
