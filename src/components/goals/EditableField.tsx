
import EditableField from '@/components/ui/EditableField';

interface EditableFieldProps {
  fieldName: string;
  value: number | string;
  label: string;
  colorClass: string;
  isEditing: boolean;
  localEditValue: string;
  increment: number;
  onFieldClick: (fieldName: string, value: number | string) => void;
  onLocalValueChange: (value: string) => void;
  onFieldBlur: (fieldName: string) => void;
  onIncrement: (fieldName: string) => void;
  onDecrement: (fieldName: string) => void;
  isNumber?: boolean;
}

const GoalsEditableField = ({ 
  fieldName, 
  value, 
  label, 
  colorClass, 
  isEditing, 
  localEditValue, 
  increment, 
  onFieldClick, 
  onLocalValueChange, 
  onFieldBlur,
  onIncrement, 
  onDecrement,
  isNumber = true
}: EditableFieldProps) => {
  const getFieldType = () => {
    if (!isNumber) return 'text';
    return 'currency';
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
      onFieldClick={onFieldClick}
      onLocalValueChange={onLocalValueChange}
      onFieldBlur={onFieldBlur}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      canEdit={true}
      showButtons={isNumber}
    />
  );
};

export default GoalsEditableField;
